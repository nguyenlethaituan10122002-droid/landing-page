/**
 * Video quy trinh ve sinh may lanh, dat tren YouTube.
 *
 * KHONG tu host file mp4: clip goc nang 96 MB, ma goi Vercel Hobby chi co
 * 100 GB bang thong/thang — khoang 1.000 luot xem la het han muc va ca trang
 * ngung phuc vu. YouTube ganh bang thong mien phi, dong thoi cho phep khai
 * VideoObject de Google hien video ngay trong ket qua tim kiem.
 */
export const video = {
  id: 'dSbEh-6EOEY',
  /** Quay bang dien thoai nen la khung doc — khung nhung phai theo 9:16 */
  huong: 'doc' as const,
  title: 'Quy trình vệ sinh máy lạnh tại nhà của Điện Lạnh Thái Tuấn',
  desc:
    'Toàn bộ quy trình vệ sinh máy lạnh tận nơi: che chắn đồ đạc, tháo lưới lọc, ' +
    'xịt rửa dàn lạnh bằng máy bơm áp lực, vệ sinh cánh quạt lồng sóc và lắp lại hoàn chỉnh.',
  /** ISO 8601 — 5 phut 57 giay */
  duration: 'PT5M57S',
  uploadDate: '2026-08-19',
} as const

export const videoWatchUrl = `https://www.youtube.com/watch?v=${video.id}`
/** nocookie: khong dat cookie theo doi cho toi khi khach bam play */
export const videoEmbedUrl = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`
