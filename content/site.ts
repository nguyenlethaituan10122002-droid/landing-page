/**
 * NGUON SU THAT DUY NHAT ve thong tin doanh nghiep.
 * Doi hotline / dia chi / gio lam viec chi can sua o day.
 */
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

  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dienlanhthaituan.vn',
  copyright: '© 2026 Điện Lạnh Thái Tuấn',
} as const

export const fullAddress =
  `${site.address.street}, ${site.address.ward}, ${site.address.district}, ${site.address.city}`
