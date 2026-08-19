/**
 * NGUON SU THAT DUY NHAT ve thong tin doanh nghiep.
 * Doi hotline / dia chi / gio lam viec chi can sua o day.
 */
/**
 * Phai la dia chi CUOI CUNG sau redirect.
 * Vercel dat www lam Production, con apex thi 308 redirect sang www — khai
 * canonical la apex se thanh "canonical tro toi mot URL bi chuyen huong",
 * bat Google tu doan. Neu sau nay doi apex lam chinh thi sua lai dong nay.
 */
const DIA_CHI_MAC_DINH = 'https://www.dienlanhthaituan.com'

/**
 * Vercel tao bien moi truong ngay ca khi o Value bo trong — luc do gia tri la
 * CHUOI RONG chu khong phai undefined, nen toan tu ?? khong nhay sang mac dinh.
 * Hau qua: site.url = '' -> new URL('') o app/layout.tsx nem ERR_INVALID_URL
 * -> build chet ngay tren Vercel trong khi may cuc bo van chay binh thuong
 * (vi .env.local luon co gia tri).
 *
 * Nhan them ca truong hop dien thieu giao thuc ("dienlanhthaituan.com") va
 * dau / thua o cuoi, vi ca hai deu lam hong canonical va sitemap.
 */
function locDiaChiTrang(thoR?: string): string {
  const tho = thoR?.trim()
  if (!tho) return DIA_CHI_MAC_DINH

  const coGiaoThuc = /^https?:\/\//i.test(tho) ? tho : `https://${tho}`
  try {
    return new URL(coGiaoThuc).origin
  } catch {
    return DIA_CHI_MAC_DINH
  }
}

export const site = {
  name: 'Điện Lạnh Thái Tuấn',
  shortName: 'Điện Lạnh Thái Tuấn',
  tagline: 'Sửa máy lạnh · tủ lạnh · máy giặt',
  description:
    'Dịch vụ sửa chữa & bảo dưỡng điện lạnh tại nhà khu vực TP.HCM. Uy tín — minh bạch — bảo hành dài hạn.',

  // Hotline luu dang chuan, khong dau cach — format.ts lo phan hien thi
  phone: '0978072221',
  phoneAlt: '0898675073',
  zalo: '0978072221',
  email: 'nguyenlethaituan10122002@gmail.com',

  address: {
    street: '186 Nguyễn Sơn',
    ward: 'Phường Phú Thọ Hoà',
    district: 'Quận Tân Phú',
    city: 'TP. Hồ Chí Minh',
    country: 'VN',
  },

  hours: {
    display: '8:00 – 21:00 (T2 – CN)',
    /** Dang dung giua cau van — tranh phai goi .toLowerCase() lam hong chu viet tat */
    sentence: '8:00 – 21:00 tất cả các ngày',
    opens: '08:00',
    closes: '21:00',
  },

  url: locDiaChiTrang(process.env.NEXT_PUBLIC_SITE_URL),
  copyright: '© 2026 Điện Lạnh Thái Tuấn',
} as const

export const fullAddress =
  `${site.address.street}, ${site.address.ward}, ${site.address.district}, ${site.address.city}`
