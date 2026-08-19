// Content-Security-Policy — lop phong thu chieu sau.
// Trang nay khong hien thi bat ky noi dung nao do nguoi dung nhap, nen rui ro XSS
// von da rat thap. CSP o day chan them: script tu domain la, nhung, iframe nhung trang,
// va chan gui du lieu ra server ngoai neu co thu vien nao bi tiem nhiem.
//
// Phai co 'unsafe-inline' cho script vi Next.js chen script noi tuyen de hydrate,
// va JSON-LD cung la the <script> noi tuyen. Dung nonce se buoc trang chuyen sang
// render dong, mat toan bo loi the SSG — khong danh doi.
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 828, 1080, 1200, 1920],
    imageSizes: [96, 160, 256, 384],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: CSP },
          // Buoc trinh duyet chi dung HTTPS trong 2 nam, ke ca khi go http:// vao
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}
export default nextConfig
