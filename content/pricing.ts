/** Bang gia — khach da xac nhan "Gia nhu tren ok khong can chinh sua" + 2 hang muc bo sung. */
export const pricing = [
  { item: 'Vệ sinh máy lạnh',      scope: 'Treo tường 9.000 – 12.000 BTU', price: '150.000 – 250.000đ',     warranty: '1 tháng' },
  { item: 'Vệ sinh máy lạnh',      scope: 'Áp trần / tủ đứng',             price: '350.000 – 600.000đ',     warranty: '1 tháng' },
  { item: 'Nạp gas R32 / R410A',   scope: 'Máy lạnh dân dụng',             price: '400.000 – 700.000đ',     warranty: '6 tháng' },
  { item: 'Thay board mạch',       scope: 'Máy lạnh Inverter',             price: '900.000 – 1.800.000đ',   warranty: '12 tháng' },
  { item: 'Thay block',            scope: 'Tủ lạnh 150 – 300L',            price: '1.200.000 – 2.200.000đ', warranty: '12 tháng' },
  { item: 'Xử lý tủ không lạnh',   scope: 'Tủ lạnh mọi loại',              price: '250.000 – 800.000đ',     warranty: '6 tháng' },
  { item: 'Thay bo mạch máy giặt', scope: 'Cửa trên / cửa ngang',          price: '700.000 – 1.500.000đ',   warranty: '12 tháng' },
  { item: 'Tháo lắp máy lạnh',     scope: 'Trọn gói tháo + lắp lại',       price: '350.000 – 700.000đ',     warranty: '3 tháng' },
  { item: 'Vệ sinh máy giặt',      scope: 'Cửa trên / cửa ngang',          price: '350.000 – 650.000đ',     warranty: '3 tháng' },
  { item: 'Thay ron tủ lạnh',      scope: 'Mọi loại tủ',                   price: '1.200.000 – 2.200.000đ', warranty: '3 tháng' },
] as const

export const pricingNote =
  'Giá tham khảo, đã gồm công. Giá cuối cùng được báo tại nhà sau khi kiểm tra và chỉ thực hiện khi khách đồng ý.'
