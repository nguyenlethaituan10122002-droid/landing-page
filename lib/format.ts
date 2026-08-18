/** Dinh dang so dien thoai: 0978072221 -> "0978 072 221" */
export function displayPhone(raw: string): string {
  const d = raw.replace(/\D/g, '')
  return d.length === 10 ? `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}` : raw
}

/** Chuyen sang dang quoc te cho thẻ tel: — 0978072221 -> "+84978072221" */
export function telHref(raw: string): string {
  const d = raw.replace(/\D/g, '')
  return d.startsWith('0') ? `tel:+84${d.slice(1)}` : `tel:+${d}`
}

export function zaloHref(raw: string): string {
  return `https://zalo.me/${raw.replace(/\D/g, '')}`
}
