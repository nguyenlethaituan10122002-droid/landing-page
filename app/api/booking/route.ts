import { NextResponse } from 'next/server'
import { bookingSchema } from '@/lib/validation'
import { isRateLimited } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Apps Script "nguoi" sau vai tieng khong ai goi. Do thuc te:
 *   - lan goi dau tien sau khi nam im: 32.5s
 *   - cac lan sau do:                    2.0s
 *
 * Tiem sua dien lanh thi khach thua, nen cold start la chuyen thuong ngay:
 * khach dau tien trong ngay se dinh. De timeout 10s thi khach do bi bao loi
 * trong khi Google VAN ghi dong vao Sheet o giay thu 32 — mat khach oan.
 */
const WEBHOOK_TIMEOUT_MS = 28_000

/**
 * Apps Script thinh thoang tra 404 khi client di theo redirect cua no
 * (do duoc: 1 that bai / 3 lan goi voi cung mot payload). Loi nay ngau nhien
 * chu khong do du lieu, nen thu lai la qua.
 *
 * DANH DOI: neu lan dau thuc su DA ghi duoc dong roi moi hong o buoc redirect,
 * lan thu lai se tao dong trung. Chu tiem thay 2 dong giong het nhau thi xoa bot —
 * phien mot chut, nhung con hon mat han mot khach ma khong ai biet.
 */
const WEBHOOK_MAX_RETRIES = 2
const WEBHOOK_RETRY_DELAY_MS = 800

// Cho phep route chay lau hon mac dinh (Vercel Pro/Enterprise doc gia tri nay)
export const maxDuration = 30

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  return fwd?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
}

/**
 * Chan CSRF: chi nhan request tu chinh domain nay.
 *
 * KHONG dung origin.endsWith(host) — "https://evil-dienlanhthaituan.vn"
 * ket thuc bang "dienlanhthaituan.vn" nen ke tan cong chi can dang ky mot
 * domain trong giong la lach duoc. Phai so khop host chinh xac.
 */
function cungNguonGoc(req: Request): boolean {
  const origin = req.headers.get('origin')
  // Client khong phai trinh duyet (curl, app native) khong gui Origin.
  // Van cho qua vi endpoint nay cong khai, da co rate limit + honeypot chan spam.
  if (!origin) return true

  const host = req.headers.get('host')
  if (!host) return false

  try {
    // .host bao gom ca cong -> khop duoc ca localhost:3987 lan domain that
    return new URL(origin).host === host
  } catch {
    return false
  }
}

export async function POST(req: Request) {
  if (!cungNguonGoc(req)) {
    return NextResponse.json({ ok: false, message: 'Yêu cầu không hợp lệ.' }, { status: 403 })
  }

  if (isRateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng gọi hotline để được hỗ trợ ngay.' },
      { status: 429 },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Dữ liệu không hợp lệ.' }, { status: 400 })
  }

  const parsed = bookingSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, message: 'Thông tin chưa hợp lệ, vui lòng kiểm tra lại.' },
      { status: 400 },
    )
  }

  const data = parsed.data

  // Bay bot: co gia tri o o an -> bo qua am tham, van tra ve thanh cong
  if (data.company) return NextResponse.json({ ok: true })

  const webhook = process.env.GOOGLE_SHEET_WEBHOOK_URL
  const secret = process.env.GOOGLE_SHEET_SECRET

  if (!webhook || !secret) {
    // Chua cau hinh Google Sheet — ghi log server de khong mat lead trong luc thiet lap
    console.warn('[booking] Chưa cấu hình GOOGLE_SHEET_WEBHOOK_URL — yêu cầu:', {
      name: data.name, service: data.service,
    })
    return NextResponse.json({
      ok: true,
      pending: true,
      message: 'Đã nhận yêu cầu. Vui lòng gọi hotline nếu cần hỗ trợ gấp.',
    })
  }

  const payload = JSON.stringify({
    secret,
    name: data.name,
    phone: data.phone,
    service: data.service,
    address: data.address,
    note: data.note ?? '',
    source: data.source ?? 'truc-tiep',
    device: req.headers.get('user-agent')?.includes('Mobile') ? 'Mobile' : 'Desktop',
  })

  let loiCuoi: unknown = null

  for (let lan = 1; lan <= WEBHOOK_MAX_RETRIES; lan++) {
    try {
      const res = await fetch(webhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        signal: AbortSignal.timeout(WEBHOOK_TIMEOUT_MS),
      })
      if (!res.ok) throw new Error(`Sheet trả về ${res.status}`)
      return NextResponse.json({ ok: true })
    } catch (err) {
      loiCuoi = err
      console.error(`[booking] Lan ${lan}/${WEBHOOK_MAX_RETRIES} that bai:`, err)
      if (lan < WEBHOOK_MAX_RETRIES) {
        await new Promise((tiep) => setTimeout(tiep, WEBHOOK_RETRY_DELAY_MS))
      }
    }
  }

  // Het luot thu — ghi day du thong tin khach ra log de con cuu duoc lead
  console.error('[booking] MAT LEAD, khong ghi duoc vao Sheet:', {
    loi: String(loiCuoi),
    khach: { name: data.name, phone: data.phone, service: data.service, address: data.address },
  })
  return NextResponse.json(
    { ok: false, message: 'Hệ thống đang bận. Vui lòng gọi trực tiếp hotline để được hỗ trợ ngay.' },
    { status: 502 },
  )
}
