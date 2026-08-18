import { z } from 'zod'
import { PHONE_REGEX, normalizePhone } from '@/lib/booking-rules'
import { serviceOptions } from '@/content/services'

/**
 * Schema phia SERVER. Dung lai dung bo quy tac trong booking-rules.ts
 * de client va server khong bao gio lech nhau.
 * Zod chi ton tai o server -> khong lam nang bundle trinh duyet.
 */
export const bookingSchema = z.object({
  name: z.string().trim().min(2).max(60),
  phone: z
    .string()
    .trim()
    .transform(normalizePhone)
    .pipe(z.string().regex(PHONE_REGEX)),
  service: z.enum(serviceOptions as unknown as [string, ...string[]]),
  address: z.string().trim().min(5).max(160),
  note: z.string().trim().max(500).optional().or(z.literal('')),
  /**
   * Bay bot. KHONG chan o day — de route handler tu quyet dinh, tra ve 200 im lang
   * de bot khong biet minh da bi phat hien.
   */
  company: z.string().max(200).optional(),
  source: z.string().max(120).optional(),
})

export type BookingData = z.output<typeof bookingSchema>
