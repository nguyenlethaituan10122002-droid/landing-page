/**
 * 8 khoi dich vu.
 * `faults` = danh sach loi thuong gap khach cung cap — dat trong <details>
 * de giu nguyen van trong HTML (tot cho SEO tu khoa dai) ma khong lam roi giao dien.
 */
export type Service = {
  slug: string
  name: string
  desc: string
  bullets: readonly string[]
  price: string | null
  priceNote: string
  icon: string
  faults?: readonly string[]
}

export const services: readonly Service[] = [
  {
    slug: 'sua-may-lanh',
    name: 'Sửa máy lạnh',
    desc: 'Máy không mát, chảy nước, kêu to, xì gas, chớp đèn báo lỗi, tự tắt nguồn.',
    bullets: ['Nạp gas R32 / R410A', 'Thay board, tụ, quạt', 'Xử lý rò rỉ gas, nghẹt ống'],
    price: 'Từ 200.000đ',
    priceNote: 'Đã gồm công kiểm tra',
    icon: 'aircon',
    faults: [
      'Máy lạnh đang sử dụng đột nhiên kêu to bất thường',
      'Dàn nóng phát ra tiếng ồn lớn',
      'Máy lạnh chạy nhưng không lạnh',
      'Máy lạnh không hoạt động dù nguồn điện vẫn bình thường',
      'Quạt dàn nóng hoặc dàn lạnh không hoạt động',
      'Thiết bị chảy nước khi hoạt động',
      'Máy lạnh tắt đột ngột sau khi vừa bật lên',
      'Máy lạnh bị xì ga',
      'Máy lạnh không nhận tín hiệu hoặc báo lỗi',
    ],
  },
  {
    slug: 'sua-tu-lanh',
    name: 'Sửa tủ lạnh',
    desc: 'Tủ không lạnh, đóng tuyết, chảy nước, block kêu, chạy liên tục không nghỉ.',
    bullets: ['Mọi dung tích, side-by-side', 'Thay block, thay gas', 'Cho mượn tủ nếu sửa lâu'],
    price: 'Từ 250.000đ',
    priceNote: 'Báo giá theo dung tích tủ',
    icon: 'fridge',
    faults: [
      'Tủ lạnh ít lạnh hoặc không lạnh dù đã điều chỉnh hạ nhiệt độ',
      'Tủ lạnh toả nhiệt ra bề mặt bên ngoài nóng quá mức',
      'Tủ lạnh không vào điện dù nguồn điện cấp ổn định',
      'Tủ lạnh bị đóng tuyết hoặc bị đọng nước',
      'Thiết bị phát tiếng kêu ồn bất thường',
      'Tủ lạnh chạy liên tục không có thời gian nghỉ giữa chừng',
      'Tủ lạnh ngắt liên tục khiến bên trong không đủ độ lạnh',
    ],
  },
  {
    slug: 'sua-may-giat',
    name: 'Sửa máy giặt',
    desc: 'Không lên nguồn, không cấp/xả nước, không vắt, rò điện, báo lỗi E1/E2/E3.',
    bullets: ['Cửa trên & cửa ngang', 'Thay bo mạch, dây curoa', 'Vệ sinh lồng giặt'],
    price: 'Từ 180.000đ',
    priceNote: 'Miễn phí kiểm tra',
    icon: 'washer',
    faults: [
      'Máy giặt không lên nguồn hoặc lên nguồn nhưng không hoạt động',
      'Máy giặt không vắt hoặc không xả nước',
      'Máy giặt không cấp nước',
      'Máy giặt không tự ngắt nguồn khi kết thúc chương trình giặt',
      'Máy giặt bị rò rỉ điện',
      'Máy giặt hư board mạch',
      'Máy giặt báo lỗi E1, E2, E3…',
    ],
  },
  {
    slug: 've-sinh-may-lanh',
    name: 'Vệ sinh máy lạnh',
    desc: 'Bảo dưỡng định kỳ giúp máy lạnh nhanh, tiết kiệm 20–30% tiền điện.',
    bullets: ['Xịt rửa bằng máy áp lực', 'Diệt khuẩn, khử mùi hôi', 'Kiểm tra gas miễn phí'],
    price: 'Từ 150.000đ',
    priceNote: 'Giảm 15% từ 2 máy',
    icon: 'sparkle',
  },
  {
    slug: 've-sinh-may-giat',
    name: 'Vệ sinh máy giặt',
    desc: 'Loại bỏ cặn bột giặt, xơ vải, nấm mốc trong lồng giặt — quần áo sạch thơm, máy bền hơn.',
    bullets: ['Cửa trên & cửa ngang', 'Tháo lồng vệ sinh sâu', 'Diệt khuẩn, khử mùi'],
    price: 'Từ 350.000đ',
    priceNote: 'Bảo hành 3 tháng',
    icon: 'drum',
    faults: [
      'Quần áo giặt xong vẫn bám mùi khó chịu hoặc không sạch',
      'Cặn bẩn bám ở van xả, bộ lọc vải gây tắc nghẽn nước',
      'Máy giặt lâu, cấp nước yếu, không xả nước hoặc không vắt',
      'Nấm mốc, vi khuẩn tích tụ gây dị ứng da và hô hấp',
      'Máy rỉ sét, hao mòn nhanh do không bảo dưỡng định kỳ',
    ],
  },
  {
    slug: 'sua-tivi',
    name: 'Sửa tivi',
    desc: 'Mất hình, mất tiếng, sọc màn hình, không lên nguồn, lỗi phần mềm.',
    bullets: ['LED, OLED, Smart TV', 'Thay panel, main, nguồn', 'Sửa tại nhà, không cần mang đi'],
    price: 'Từ 250.000đ',
    priceNote: 'Linh kiện chính hãng',
    icon: 'tv',
  },
  {
    slug: 'thiet-bi-gia-dung',
    name: 'Bếp từ · Lò vi sóng · Máy rửa chén · Máy lọc nước',
    desc: 'Nhận kiểm tra và sửa chữa tại nhà các thiết bị gia dụng, thay linh kiện chính hãng.',
    bullets: ['Kiểm tra tại nhà', 'Thay linh kiện chính hãng', 'Báo giá trước khi sửa'],
    price: null, // Khach chua cung cap gia — khong bia (NT-01)
    priceNote: 'Gọi để được báo giá',
    icon: 'appliance',
  },
  {
    slug: 'thao-lap-di-doi',
    name: 'Tháo lắp – di dời máy lạnh',
    desc: 'Tháo lắp khi chuyển nhà, thu hồi gas đúng kỹ thuật, thi công đường ống mới trọn gói.',
    bullets: ['Thu hồi gas đúng kỹ thuật', 'Khảo sát vị trí miễn phí', 'Có xuất hoá đơn VAT'],
    price: 'Từ 350.000đ',
    priceNote: 'Trọn gói tháo + lắp',
    icon: 'move',
    faults: [
      'Khi tháo: tắt nguồn điện, đánh dấu dây điện tránh nhầm lẫn, đảm bảo không rò rỉ gas',
      'Bọc thùng carton và túi nilon quanh thiết bị khi di dời',
      'Khi lắp: kiểm tra nguy cơ rò điện, kiểm tra khoá gas có bị hở',
      'Cân nhắc kỹ vị trí lắp đặt để máy chạy hiệu quả và bền',
    ],
  },
]

/** Danh sach dich vu trong o chon cua form dat lich — dung theo phieu khach dien. */
export const serviceOptions = [
  'Sửa máy lạnh', 'Vệ sinh máy lạnh', 'Sửa tủ lạnh', 'Sửa máy giặt',
  'Vệ sinh máy giặt', 'Sửa tivi', 'Tháo lắp – di dời máy lạnh',
  'Máy rửa chén', 'Máy lọc nước', 'Bếp từ', 'Khác',
] as const
