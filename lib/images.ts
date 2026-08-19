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

/**
 * Gallery chia nhom de khach loc nhanh. Nhom dat truoc thi hien truoc.
 * "May lanh" dung dau vi day la dich vu chinh va cung la bo anh nhieu nhat.
 */
export const galleryGroups = [
  {
    id: 'may-lanh',
    label: 'Máy lạnh',
    /**
     * Thu tu co chu dich: xen ke anh can canh ban / dan nong / toan canh tai
     * nha, de hang dau tien khong bi 4 tam giong het nhau.
     */
    keys: [
      'ml-01', 'ml-07', 'ml-10', 'ml-04',
      'ml-02', 'ml-08', 'ml-11', 'ml-05',
      'ml-03', 'ml-09', 'ml-12', 'ml-06',
      'g-08', 'g-06',
    ],
  },
  {
    id: 'may-giat-tu-lanh',
    label: 'Máy giặt & tủ lạnh',
    keys: ['g-01', 'g-02', 'g-03', 'g-04', 'g-05', 'g-07'],
  },
] as const satisfies readonly { id: string; label: string; keys: readonly ImageKey[] }[]

export const galleryKeys = galleryGroups.flatMap((g) => g.keys) as ImageKey[]

export const beforeAfterPairs = [
  { before: 'ba-1-before', after: 'ba-1-after', label: 'Lồng giặt máy cửa trên' },
  { before: 'ba-2-before', after: 'ba-2-after', label: 'Thùng giặt ngoài' },
] as const
