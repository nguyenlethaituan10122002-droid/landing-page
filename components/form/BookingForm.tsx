'use client'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  emptyBooking, validateAll, validateField,
  type BookingErrors, type BookingFields,
} from '@/lib/booking-rules'
import { serviceOptions } from '@/content/services'
import { site } from '@/content/site'
import { displayPhone, telHref } from '@/lib/format'
import { IconCheck, IconPhone } from '@/components/icons/Icons'

type Status = 'idle' | 'sending' | 'done' | 'error'

const field =
  'w-full rounded-xl border-2 bg-white px-4 text-[15px] text-ink ' +
  'placeholder:text-muted/70 transition-colors focus:outline-none'

export function BookingForm() {
  const [values, setValues] = useState<BookingFields>(emptyBooking)
  const [errors, setErrors] = useState<BookingErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof BookingFields, boolean>>>({})
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const key = e.target.name as keyof BookingFields
    const val = e.target.value
    setValues((v) => ({ ...v, [key]: val }))
    // Chi bao loi lai khi o do da tung duoc cham vao -> khong la mang nguoi dung
    if (touched[key]) setErrors((prev) => ({ ...prev, [key]: validateField(key, val) }))
  }

  const onBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const key = e.target.name as keyof BookingFields
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors((prev) => ({ ...prev, [key]: validateField(key, e.target.value) }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const found = validateAll(values)
    setErrors(found)
    setTouched({ name: true, phone: true, service: true, address: true, note: true })
    if (Object.keys(found).length > 0) {
      document.querySelector<HTMLElement>('[data-invalid="true"]')?.focus()
      return
    }

    setStatus('sending')
    setErrorMsg('')
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, source: document.referrer || 'truc-tiep' }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) throw new Error(json.message ?? 'Gửi không thành công')
      setStatus('done')
      setValues(emptyBooking)
      setTouched({})
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Gửi không thành công')
    }
  }

  if (status === 'done') {
    return (
      <div className="rounded-[var(--radius-card)] border border-line bg-white p-8 text-center shadow-[var(--shadow-lift)]">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
          <IconCheck className="h-8 w-8" />
        </span>
        <h2 className="mt-5 text-xl font-extrabold text-brand-900">Đã nhận yêu cầu!</h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
          Tổng đài sẽ gọi lại xác nhận trong khoảng 5 phút. Nếu cần gấp, bạn gọi trực tiếp hotline nhé.
        </p>
        <a
          href={telHref(site.phone)}
          className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-accent-500 px-6 font-bold text-brand-950"
        >
          <IconPhone className="h-4 w-4" />
          Gọi {displayPhone(site.phone)}
        </a>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-4 block w-full text-[14px] font-semibold text-brand-700 underline-offset-4 hover:underline"
        >
          Gửi thêm một yêu cầu khác
        </button>
      </div>
    )
  }

  const shared = { onChange, onBlur }

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-white p-6 shadow-[var(--shadow-lift)] sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[20px] font-extrabold text-brand-900">Đặt lịch thợ đến nhà</h2>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted">
            Điền thông tin, tổng đài gọi lại xác nhận trong 5 phút.
          </p>
        </div>
        <span className="mt-1 flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          Đang nhận lịch
        </span>
      </div>

      <form onSubmit={onSubmit} className="mt-5 space-y-3.5" noValidate>
        {/* Bay bot — an voi nguoi that, bot tu dong se dien vao */}
        <input
          name="company" value={values.company} onChange={onChange}
          type="text" tabIndex={-1} autoComplete="off" aria-hidden="true"
          className="absolute h-0 w-0 overflow-hidden opacity-0"
        />

        <Field label="Họ và tên" error={errors.name} required>
          <input
            name="name" value={values.name} {...shared}
            type="text" autoComplete="name" placeholder="Nguyễn Văn A"
            data-invalid={!!errors.name}
            className={`${field} h-12 ${errors.name ? 'border-red-400' : 'border-line focus:border-brand-500'}`}
          />
        </Field>

        <Field label="Số điện thoại" error={errors.phone} required>
          <input
            name="phone" value={values.phone} {...shared}
            type="tel" inputMode="tel" autoComplete="tel" placeholder="0978 072 221"
            data-invalid={!!errors.phone}
            className={`${field} h-12 ${errors.phone ? 'border-red-400' : 'border-line focus:border-brand-500'}`}
          />
        </Field>

        <Field label="Dịch vụ cần sửa" error={errors.service} required>
          <select
            name="service" value={values.service} {...shared}
            data-invalid={!!errors.service}
            className={`${field} h-12 appearance-none bg-[length:18px] bg-[right_1rem_center] bg-no-repeat pr-11 ${errors.service ? 'border-red-400' : 'border-line focus:border-brand-500'}`}
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round'%3E%3Cpath d='m7 10 5 5 5-5'/%3E%3C/svg%3E\")" }}
          >
            <option value="">— Chọn dịch vụ —</option>
            {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>

        <Field label="Địa chỉ" error={errors.address} required>
          <input
            name="address" value={values.address} {...shared}
            type="text" autoComplete="street-address" placeholder="Số nhà, đường, phường, quận"
            data-invalid={!!errors.address}
            className={`${field} h-12 ${errors.address ? 'border-red-400' : 'border-line focus:border-brand-500'}`}
          />
        </Field>

        <Field label="Mô tả tình trạng" error={errors.note}>
          <textarea
            name="note" value={values.note} {...shared}
            rows={3} placeholder="Máy lạnh chạy nhưng không mát, có tiếng kêu…"
            className={`${field} resize-none py-3 ${errors.note ? 'border-red-400' : 'border-line focus:border-brand-500'}`}
          />
        </Field>

        {status === 'error' && (
          <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-[13.5px] leading-relaxed font-medium text-red-700">
            {errorMsg} — bạn vui lòng gọi{' '}
            <a href={telHref(site.phone)} className="font-bold underline">{displayPhone(site.phone)}</a>{' '}
            để được hỗ trợ ngay.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'sending'}
          className="mt-1 flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-accent-500 text-[15px] font-bold text-brand-950 shadow-[var(--shadow-glow)] transition-all hover:bg-accent-300 active:scale-[.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending' ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-950/30 border-t-brand-950" />
              Đang gửi…
            </>
          ) : (
            'Gửi yêu cầu — Gọi lại sau 5 phút'
          )}
        </button>

        <p className="text-center text-[12px] leading-relaxed text-muted">
          Thông tin của bạn chỉ dùng để liên hệ báo giá và đặt lịch.{' '}
          <a href="/chinh-sach-bao-mat" className="underline underline-offset-2 hover:text-brand-700">
            Chính sách bảo mật
          </a>
        </p>
      </form>
    </div>
  )
}

function Field({
  label, error, required, children,
}: { label: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-bold text-ink-2">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
      {error && <span role="alert" className="mt-1.5 block text-[12.5px] font-medium text-red-600">{error}</span>}
    </label>
  )
}
