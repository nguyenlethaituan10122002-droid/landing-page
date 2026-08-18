/**
 * Quy tac kiem tra dat lich — VIET BANG JS THUAN, KHONG PHU THUOC THU VIEN.
 * Dung chung cho ca client (nhe, khong keo zod vao bundle trinh duyet)
 * va server (duoc boc lai bang zod trong lib/validation.ts).
 */
import { serviceOptions } from '@/content/services'

export type BookingFields = {
  name: string
  phone: string
  service: string
  address: string
  note: string
  company: string // bay bot
}

export type BookingErrors = Partial<Record<keyof BookingFields, string>>

/** So dien thoai VN: bat dau 0 hoac +84, dau so 3/5/7/8/9, du 10 chu so. */
export const PHONE_REGEX = /^(?:0|\+84)(?:3|5|7|8|9)\d{8}$/

export const normalizePhone = (v: string) => v.replace(/[\s.\-()]/g, '')

export const emptyBooking: BookingFields = {
  name: '', phone: '', service: '', address: '', note: '', company: '',
}

/** Kiem tra 1 truong. Tra ve chuoi loi, hoac undefined neu hop le. */
export function validateField(field: keyof BookingFields, raw: string): string | undefined {
  const v = raw.trim()
  switch (field) {
    case 'name':
      if (v.length < 2) return 'Vui lòng nhập họ tên'
      if (v.length > 60) return 'Họ tên quá dài'
      return
    case 'phone':
      if (!v) return 'Vui lòng nhập số điện thoại'
      if (!PHONE_REGEX.test(normalizePhone(v))) return 'Số điện thoại không hợp lệ'
      return
    case 'service':
      if (!v) return 'Vui lòng chọn dịch vụ'
      if (!(serviceOptions as readonly string[]).includes(v)) return 'Dịch vụ không hợp lệ'
      return
    case 'address':
      if (v.length < 5) return 'Vui lòng nhập địa chỉ'
      if (v.length > 160) return 'Địa chỉ quá dài'
      return
    case 'note':
      if (v.length > 500) return 'Tối đa 500 ký tự'
      return
    default:
      return
  }
}

export function validateAll(values: BookingFields): BookingErrors {
  const errors: BookingErrors = {}
  for (const f of ['name', 'phone', 'service', 'address', 'note'] as const) {
    const e = validateField(f, values[f])
    if (e) errors[f] = e
  }
  return errors
}
