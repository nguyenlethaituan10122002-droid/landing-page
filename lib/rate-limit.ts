/** Gioi han tan suat theo IP — 5 luot / 10 phut. Du cho quy mo landing page. */
const WINDOW_MS = 10 * 60 * 1000
const MAX_HITS = 5
const MAX_KEYS = 5000

const hits = new Map<string, number[]>()

export function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)

  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent)
    return true
  }

  recent.push(now)
  hits.set(ip, recent)

  // Don bo nho khi map phinh to
  if (hits.size > MAX_KEYS) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
    }
  }
  return false
}
