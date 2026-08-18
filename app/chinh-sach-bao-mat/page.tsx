import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/ui/Container'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { site, fullAddress } from '@/content/site'
import { displayPhone } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Chính sách bảo mật',
  description: `Chính sách bảo mật thông tin khách hàng của ${site.name}.`,
  alternates: { canonical: '/chinh-sach-bao-mat' },
}

const sections = [
  {
    h: '1. Thông tin chúng tôi thu thập',
    p: 'Khi bạn gửi yêu cầu đặt lịch qua website, chúng tôi thu thập: họ tên, số điện thoại, dịch vụ cần sửa, địa chỉ và mô tả tình trạng thiết bị. Đây là những thông tin tối thiểu cần thiết để điều phối kỹ thuật viên đến đúng nơi và đúng việc.',
  },
  {
    h: '2. Mục đích sử dụng',
    p: 'Thông tin chỉ được dùng để liên hệ xác nhận lịch hẹn, tư vấn báo giá và thực hiện dịch vụ sửa chữa. Chúng tôi không dùng thông tin của bạn cho mục đích nào khác.',
  },
  {
    h: '3. Chia sẻ thông tin',
    p: 'Chúng tôi không bán, không trao đổi và không chia sẻ thông tin của bạn cho bên thứ ba vì mục đích thương mại. Thông tin chỉ được cung cấp cho kỹ thuật viên phụ trách đơn hàng của bạn.',
  },
  {
    h: '4. Lưu trữ và bảo mật',
    p: 'Yêu cầu đặt lịch được lưu trong hệ thống bảng tính nội bộ có kiểm soát quyền truy cập. Chỉ người phụ trách điều phối mới xem được. Dữ liệu truyền đi được mã hoá qua kết nối HTTPS.',
  },
  {
    h: '5. Quyền của khách hàng',
    p: 'Bạn có quyền yêu cầu xem, chỉnh sửa hoặc xoá thông tin cá nhân đã cung cấp. Vui lòng liên hệ hotline hoặc email bên dưới, chúng tôi sẽ xử lý trong vòng 7 ngày làm việc.',
  },
  {
    h: '6. Cookie và công cụ đo lường',
    p: 'Website hiện không sử dụng cookie theo dõi hành vi và không cài đặt công cụ phân tích của bên thứ ba. Nếu sau này có bổ sung, chúng tôi sẽ cập nhật chính sách này và thông báo trên trang.',
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-brand-50 pt-28 pb-20 lg:pt-36">
        <Container>
          <article className="mx-auto max-w-3xl rounded-[var(--radius-card)] border border-line bg-white p-7 shadow-[var(--shadow-card)] sm:p-10">
            <nav aria-label="Đường dẫn" className="text-[13px] text-muted">
              <Link href="/" className="font-semibold text-brand-700 hover:underline">Trang chủ</Link>
              <span className="mx-2">/</span>
              <span>Chính sách bảo mật</span>
            </nav>

            <h1 className="mt-4 text-[28px] leading-tight font-extrabold text-brand-900 sm:text-[34px]">
              Chính sách bảo mật
            </h1>
            <p className="mt-3 text-[14.5px] leading-relaxed text-ink-2">
              {site.name} tôn trọng và cam kết bảo vệ thông tin cá nhân của khách hàng theo
              Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân.
            </p>

            <div className="mt-8 space-y-7">
              {sections.map((s) => (
                <section key={s.h}>
                  <h2 className="text-[17px] font-extrabold text-brand-900">{s.h}</h2>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-2">{s.p}</p>
                </section>
              ))}
            </div>

            <div className="mt-9 rounded-2xl bg-brand-50 p-6">
              <h2 className="text-[16px] font-extrabold text-brand-900">Liên hệ về vấn đề bảo mật</h2>
              <ul className="mt-3 space-y-1.5 text-[14.5px] text-ink-2">
                <li><strong>Hotline:</strong> {displayPhone(site.phone)}</li>
                <li><strong>Email:</strong> {site.email}</li>
                <li><strong>Địa chỉ:</strong> {fullAddress}</li>
              </ul>
            </div>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  )
}
