import type { Metadata, Viewport } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import { site } from '@/content/site'
import { jsonLdScript } from '@/lib/schema'

// Tu host font -> khong goi ra fonts.googleapis.com, tot cho LCP
const beVietnam = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-be-vietnam',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Sửa Máy Lạnh, Tủ Lạnh, Máy Giặt Tại Nhà TP.HCM | Điện Lạnh Thái Tuấn',
    template: `%s | ${site.name}`,
  },
  description:
    'Sửa chữa & vệ sinh máy lạnh, tủ lạnh, máy giặt tại nhà TP.HCM. Thợ có mặt sau 30 phút, ' +
    'miễn phí kiểm tra, báo giá trước khi sửa, bảo hành đến 12 tháng. Gọi 0978 072 221.',
  keywords: [
    'sửa máy lạnh tại nhà', 'sửa tủ lạnh', 'sửa máy giặt', 'vệ sinh máy lạnh',
    'vệ sinh máy giặt', 'nạp gas máy lạnh', 'tháo lắp máy lạnh', 'điện lạnh TP.HCM',
    'sửa điện lạnh Tân Phú', 'điện lạnh Thái Tuấn',
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: '/',
    siteName: site.name,
    title: 'Sửa Máy Lạnh, Tủ Lạnh, Máy Giặt Tại Nhà TP.HCM — Thợ đến sau 30 phút',
    description:
      'Miễn phí kiểm tra · Báo giá trước khi sửa · Bảo hành đến 12 tháng · Hoạt động 8:00–21:00 mỗi ngày.',
    images: [{
      url: '/images/og-cover.jpg',
      width: 1200,
      height: 630,
      alt: 'Điện Lạnh Thái Tuấn — sửa chữa điện lạnh tại nhà TP.HCM',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sửa Máy Lạnh, Tủ Lạnh, Máy Giặt Tại Nhà TP.HCM',
    description: 'Thợ có mặt sau 30 phút · Miễn phí kiểm tra · Bảo hành đến 12 tháng.',
    images: ['/images/og-cover.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/images/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/images/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: '/images/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
  category: 'Dịch vụ sửa chữa điện lạnh',
}

export const viewport: Viewport = {
  themeColor: '#0E2352',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body>
        <a
          href="#dich-vu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-brand-900 focus:px-5 focus:py-3 focus:font-bold focus:text-white"
        >
          Bỏ qua tới nội dung chính
        </a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript()} />
      </body>
    </html>
  )
}
