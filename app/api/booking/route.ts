import { NextResponse } from 'next/server'
import { bookingSchema } from '@/lib/validation'
import { isRateLimited } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function clientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  return fwd?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
}

export async function POST(req: Request) {
  // Chi nhan request cung origin — chong CSRF
  const origin = req.headers.get('origin')
  const host = req.headers.get('host')
  if (origin && host && !origin.endsWith(host)) {
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

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret,
        name: data.name,
        phone: data.phone,
        service: data.service,
        address: data.address,
        note: data.note ?? '',
        source: data.source ?? 'truc-tiep',
        device: req.headers.get('user-agent')?.includes('Mobile') ? 'Mobile' : 'Desktop',
      }),
      signal: AbortSignal.timeout(10_000),
    })
    if (!res.ok) throw new Error(`Sheet trả về ${res.status}`)
  } catch (err) {
    console.error('[booking] Không ghi được vào Google Sheet:', err)
    return NextResponse.json(
      { ok: false, message: 'Hệ thống đang bận. Vui lòng gọi trực tiếp hotline để được hỗ trợ ngay.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
