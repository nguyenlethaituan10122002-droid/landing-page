/**
 * Cac diem hoat dong cua Dien Lanh Thai Tuan tren dia ban TP.HCM.
 * Khach hang xac nhan co hoat dong tai tung dia chi duoi day (19/8/2026).
 *
 * Moi diem duoc khai thanh mot node LocalBusiness rieng co branchOf tro ve
 * tru so — day la cach Google hieu "mot doanh nghiep, nhieu diem hoat dong".
 * Nho vay tung dia chi co the khop voi truy van dia phuong theo quan
 * ("sua may lanh quan 7") thay vi chi co mot diem duy nhat o Tan Phu.
 */
export type Branch = {
  /** So nha + ten duong */
  street: string
  /** Quan/huyen — dung lam addressLocality trong schema */
  district: string
}

export const branches: readonly Branch[] = [
  { street: '273 Trần Hưng Đạo', district: 'Quận 1' },
  { street: '311 Trần Não', district: 'Quận 2' },
  { street: '77 Bis Trường Sa', district: 'Quận 3' },
  { street: '294 Nguyễn Tất Thành', district: 'Quận 4' },
  { street: '62 An Dương Vương', district: 'Quận 5' },
  { street: '427 Kinh Dương Vương', district: 'Quận 6' },
  { street: '45 Huỳnh Tấn Phát', district: 'Quận 7' },
  { street: '267 Phạm Hùng', district: 'Quận 8' },
  { street: '225 Cách Mạng Tháng 8', district: 'Quận 10' },
  { street: '137 Lê Đại Hành', district: 'Quận 11' },
  { street: '294 Trường Chinh', district: 'Quận 12' },
  { street: '612 Phạm Văn Đồng', district: 'TP. Thủ Đức' },
  { street: '733 Nguyễn Văn Linh', district: 'Bình Chánh' },
] as const

export const branchCount = branches.length
