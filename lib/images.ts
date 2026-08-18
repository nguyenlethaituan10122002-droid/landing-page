import manifest from '@/public/images/manifest.json'

export type ImageKey = keyof typeof manifest

export type ManagedImage = {
  src: string
  width: number
  height: number
  alt: string
  blurDataURL: string
}

/**
 * Lay anh da qua xu ly (crop + duotone + blur placeholder).
 * Manifest do scripts/process-images.py sinh ra tu anh goc trong /img.
 */
export function img(key: ImageKey): ManagedImage {
  return manifest[key] as ManagedImage
}

export const galleryKeys = [
  'g-01', 'g-02', 'g-03', 'g-04', 'g-05', 'g-06', 'g-07', 'g-08',
] as const satisfies readonly ImageKey[]

export const beforeAfterPairs = [
  { before: 'ba-1-before', after: 'ba-1-after', label: 'Lồng giặt máy cửa trên' },
  { before: 'ba-2-before', after: 'ba-2-after', label: 'Thùng giặt ngoài' },
] as const
