import { NextResponse, after } from 'next/server'
import { bookingSchema } from '@/lib/validation'
import { isRateLimited } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Do thuc te do tre cua Apps Script (15 luot, nhieu thoi diem trong ngay):
 *   median ~2s · nhung duoi keo toi 33.85s · that thuong, KHONG lien quan idle
 *
 * Vercel cat ham o maxDuration. Nen neu cho Sheet ghi xong roi moi tra loi thi
 * bat ky luot nao roi vao duoi deu thanh 504 FUNCTION_INVOCATION_TIMEOUT, va
 * khach nhan duoc trang loi text cua Vercel thay vi JSON.
 *
 * Cach lam: KHONG bat khach cho het duoi.
 *   - Promise.race tra ve NGAY khi ghi xong, nen CHO_NHANH_MS chi la TRAN chu
 *     khong phai thoi gian cho thuong le. Luot nhanh van xong trong ~2s.
 *   - Qua tran ma chua xong: tra loi ngay, viec ghi Sheet giao cho after()
 *     chay tiep o nen. Khach khong phai ngoi nhin vong quay 30 giay.
 *
 * Vi sao tran chi 3s: khach nhin thay CUNG MOT man hinh thanh cong o ca hai
 * nhanh, nen cho lau hon khong doi lai duoc gi cho ho — chi de may chu xac
 * nhan duoc that/gia. Doi lay 3 giay cua moi khach de biet dieu do thi khong
 * dang, nhat la khi that bai that su hau het la timeout o giay thu 25 chu
 * khong phai loi som.
 */
const CHO_NHANH_MS = 3_000

/** Moi luot goi Apps Script cho toi da bao lau */
const WEBHOOK_TIMEOUT_MS = 25_000

/**
 * Tong ngan sach cho ca viec ghi nen. Phai nho hon maxDuration, neu khong
 * Vercel cat giua chung. Het ngan sach thi thoi khong thu lai nua.
 */
const TONG_NGAN_SACH_MS = 50_000

/**
 * Apps Script thinh thoang tra 404 khi client di theo redirect cua no
 * (do duoc: 1 that bai / 3 lan goi voi cung mot payload). Loi ngau nhien
 * chu khong do du lieu, nen thu lai la qua.
 *
 * DANH DOI: neu lan dau thuc su DA ghi duoc dong roi moi hong o buoc redirect,
 * lan thu lai se tao dong trung. Chu tiem thay 2 dong giong het nhau thi xoa bot —
 * phien mot chut, nhung con hon mat han mot khach ma khong ai biet.
 */
const WEBHOOK_MAX_RETRIES = 2
const WEBHOOK_RETRY_DELAY_MS = 800

// Cho phep route chay lau hon mac dinh (Vercel Pro/Enterprise doc gia tri nay)
export const maxDuration = 60

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  return fwd?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
}

/**
 * Chan CSRF: chi nhan request tu chinh domain nay.
 *
 * KHONG dung origin.endsWith(host) — "https://evil-dienlanhthaituan.com"
 * ket thuc bang "dienlanhthaituan.com" nen ke tan cong chi can dang ky mot
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

  const khach = {
    name: data.name, phone: data.phone, service: data.service, address: data.address,
  }

  /**
   * Ghi vao Sheet, tu thu lai trong pham vi ngan sach. KHONG BAO GIO nem loi —
   * vi ham nay con duoc chay o nen qua after(), ma promise bi reject o do se
   * thanh unhandled rejection.
   */
  const ghiVaoSheet = async (): Promise<boolean> => {
    const hanChot = Date.now() + TONG_NGAN_SACH_MS
    let loiCuoi: unknown = null

    for (let lan = 1; lan <= WEBHOOK_MAX_RETRIES; lan++) {
      const conLai = hanChot - Date.now()
      if (conLai <= 0) break

      try {
        const res = await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
          signal: AbortSignal.timeout(Math.min(WEBHOOK_TIMEOUT_MS, conLai)),
        })
        if (!res.ok) throw new Error(`Sheet trả về ${res.status}`)
        return true
      } catch (err) {
        loiCuoi = err
        console.error(`[booking] Lan ${lan}/${WEBHOOK_MAX_RETRIES} that bai:`, err)
        if (lan < WEBHOOK_MAX_RETRIES && hanChot - Date.now() > WEBHOOK_RETRY_DELAY_MS) {
          await new Promise((tiep) => setTimeout(tiep, WEBHOOK_RETRY_DELAY_MS))
        }
      }
    }

    // Het cach — in day du thong tin khach ra log de con cuu duoc lead
    console.error('[booking] MAT LEAD, khong ghi duoc vao Sheet:', { loi: String(loiCuoi), khach })
    return false
  }

  const viec = ghiVaoSheet()

  // Cho nhanh: neu Sheet kip ghi xong thi bao thanh cong that
  const kipGhi = await Promise.race([
    viec,
    new Promise<null>((tiep) => setTimeout(() => tiep(null), CHO_NHANH_MS)),
  ])

  if (kipGhi === true) return NextResponse.json({ ok: true })

  if (kipGhi === false) {
    return NextResponse.json(
      { ok: false, message: 'Hệ thống đang bận. Vui lòng gọi trực tiếp hotline để được hỗ trợ ngay.' },
      { status: 502 },
    )
  }

  // Qua CHO_NHANH_MS ma chua xong: tra loi ngay, ghi tiep o nen.
  // after() giu ham song sau khi response da gui di.
  after(viec)
  console.warn('[booking] Sheet cham, chuyen sang ghi nen:', khach)
  return NextResponse.json({ ok: true, pending: true })
}
