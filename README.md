# Landing Page — Điện Lạnh Thái Tuấn

Landing page dịch vụ sửa chữa điện lạnh tại nhà TP.HCM. Next.js 15 (App Router) · TypeScript · Tailwind CSS v4.
Tông màu xanh lạnh lấy trực tiếp từ logo thật của khách. Chuẩn SEO, xuất tĩnh hoàn toàn.

---

## Chạy dự án

```bash
npm install
cp .env.example .env.local     # điền biến môi trường
npm run dev                    # http://localhost:3000
npm run build && npm start     # bản production
npm run typecheck              # kiểm tra kiểu
```

## Biến môi trường

| Biến | Bắt buộc | Mô tả |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | ✅ | Tên miền thật. Dùng cho canonical, sitemap, Open Graph |
| `GOOGLE_SHEET_WEBHOOK_URL` | ✅ | URL Web App của Google Apps Script (xem bên dưới) |
| `GOOGLE_SHEET_SECRET` | ✅ | Chuỗi bí mật khớp với biến `SECRET` trong Apps Script |

> Chưa cấu hình Sheet thì form vẫn chạy, trả về thành công và ghi log ở server — không mất lead trong lúc thiết lập.

---

## Sửa nội dung — KHÔNG cần biết lập trình

Toàn bộ chữ, số điện thoại, giá nằm trong thư mục **`content/`**. Sửa ở đây là trang tự cập nhật.

| File | Nội dung |
|---|---|
| `content/site.ts` | **Quan trọng nhất** — tên thương hiệu, hotline, Zalo, email, địa chỉ, giờ làm việc |
| `content/services.ts` | 8 khối dịch vụ + danh sách lỗi thường gặp + danh sách dịch vụ trong form |
| `content/pricing.ts` | 10 dòng bảng giá |
| `content/faq.ts` | 6 câu hỏi thường gặp |
| `content/commitments.ts` | 5 cam kết |
| `content/process.ts` | 4 bước quy trình |
| `content/areas.ts` | 20 quận/huyện phục vụ |
| `content/brands.ts` | Danh sách hãng nhận sửa |
| `content/promises.ts` | 3 ô cam kết dưới hero |
| `content/nav.ts` | Menu |

**Đổi hotline chỉ cần sửa 1 dòng** trong `content/site.ts` — header, footer, mọi nút gọi, thanh CTA mobile và JSON-LD đều tự đổi theo.

---

## Ảnh

Ảnh gốc của khách nằm ở `img/`. Script xử lý sinh ra ảnh web trong `public/images/`:

```bash
python3 scripts/process-images.py
```

Script tự động: crop đúng tỉ lệ từng vị trí → tăng contrast → phủ duotone xanh 13% cho đồng bộ
→ xuất WebP chất lượng 82 → sinh `blurDataURL` → ghi `public/images/manifest.json`.

Thêm/đổi ảnh: bỏ file vào `img/`, khai báo trong mảng `FILES` và `JOBS` của script rồi chạy lại.

**Logo** được tách tự động từ ảnh gốc bằng mặt nạ tròn; favicon và ảnh Open Graph đều sinh từ logo đó.

---

## Google Sheet — nơi nhận yêu cầu đặt lịch

1. Tạo bảng tính mới tại [sheets.new](https://sheets.new), đổi tên tab dưới cùng thành **`Leads`**.
2. Menu **Tiện ích mở rộng → Apps Script**, dán mã trong `docs/BA-landing-dien-lanh-thai-tuan.md` §6.5.
3. Sửa `const SECRET = '...'` thành chuỗi bí mật tự đặt.
4. **Deploy → New deployment → Web app** · *Execute as:* **Me** · *Who has access:* **Anyone**.
5. Copy Web app URL vào `GOOGLE_SHEET_WEBHOOK_URL`, chuỗi bí mật vào `GOOGLE_SHEET_SECRET`.

Mỗi yêu cầu sẽ tự ghi 1 dòng vào Sheet **và** gửi email thông báo có sẵn link bấm gọi.

---

## Kiểm tra chất lượng

```bash
# Khoi dong Chrome che do debug
google-chrome --headless=new --no-sandbox --remote-debugging-port=9222 \
  --user-data-dir=/tmp/cdp about:blank &

# Do tran ngang o 8 be rong thiet bi that (emulate dung media query)
node --experimental-websocket scripts/audit-responsive.mjs http://localhost:3000
```

Script báo `✓ khong tran` cho từng breakpoint từ 320px đến 1440px.

---

## Hiệu ứng chuyển động

Tất cả đều tôn trọng `prefers-reduced-motion: reduce` — người dùng bật "giảm chuyển động"
trong hệ điều hành sẽ thấy trang tĩnh hoàn toàn, nội dung vẫn đầy đủ.

| Hiệu ứng | Nơi dùng | Cách chạy |
|---|---|---|
| **Tuyết rơi 3 lớp chiều sâu** | Hero (dày), CTA cuối trang (thưa) | CSS thuần — **0 byte JS**. Xem `components/ui/Snowfall.tsx` |
| Hiện dần khi cuộn tới, so le 8 bậc | Mọi khối | `IntersectionObserver`, tự ngắt sau lần đầu |
| Thanh tiến trình đọc trang | Mép trên | `requestAnimationFrame` + ghi thẳng vào `style` — không render lại React |
| Ken Burns (ảnh hero phóng chậm 26s) | Hero | CSS thuần |
| Vệt sáng quét qua nút | 2 nút gọi chính | CSS thuần |
| Dải hãng chạy ngang, dừng khi rê chuột | Dải thương hiệu | CSS thuần |
| Vòng sóng lan quanh nút gọi nổi | Desktop | CSS thuần |
| Nhãn chữ trượt ra khi rê chuột / Tab tới | Cụm nút nổi | CSS thuần, có cả `group-focus-visible` cho bàn phím |
| Hộp ảnh phóng to (lightbox) | Gallery | Phím ←/→ chuyển ảnh, Esc đóng, khoá cuộn nền |
| Thanh kéo so sánh Trước/Sau | Khối trước–sau | `<input type="range">` |
| Đường nối 4 bước vẽ dần | Quy trình | CSS `scaleX` |
| Ảnh phóng nhẹ + chú thích trượt lên | Gallery, quy trình | CSS `transform` |
| Thẻ nhấc lên khi rê chuột | Dịch vụ, quy trình | CSS `transform` |
| Header dính + làm mờ nền, hamburger biến thành X | Header | CSS `transition` |
| Mũi tên xoay khi mở câu hỏi | FAQ | `group-open:rotate-180` |

Chỉ dùng `transform` và `opacity` (không gây reflow). Khi người dùng tắt chuyển động,
dải hãng chuyển sang vuốt ngang thủ công thay vì đứng im giữa chừng, và tuyết bị ẩn hẳn.

### Về hiệu ứng tuyết

Hợp chủ đề điện lạnh, và cố ý làm bằng **HTML tĩnh + CSS**, không một dòng JavaScript:

- **3 lớp chiều sâu** — xa (26 hạt nhỏ mờ, rơi 21–31s) · giữa (16 hạt, 14–20s) ·
  gần (9 **hoa tuyết 6 cánh**, 9–15s, cùng mô-típ với bông tuyết trong logo).
- Vị trí, kích thước, tốc độ, độ dạt ngang sinh bằng bộ sinh số **có hạt giống cố định**
  (`sinhHat(20260818)`) — mỗi lần build ra kết quả giống hệt, không lệch giữa server và client.
- Độ trễ **âm** để một số hạt đã ở giữa màn hình ngay khi trang vừa mở, không phải chờ.
- Dùng đơn vị `100cqh` (container query) nên hạt rơi vừa đúng chiều cao khối chứa,
  không phụ thuộc chiều cao màn hình. Có sẵn nhánh dự phòng `105vh` cho trình duyệt cũ.
- Lớp tuyết nằm ở `z-index: 1`, nội dung ở `z-10` — **chữ luôn nằm trên tuyết**, không ảnh hưởng đọc.
- `aria-hidden="true"` + `pointer-events: none` — trình đọc màn hình bỏ qua, không chắn chuột.

Đổi mật độ: `<Snowfall />` (dày) hoặc `<Snowfall mậtĐộ="thưa" />`.
Chỉnh số lượng / kích thước / tốc độ ở mảng `LOP` trong `components/ui/Snowfall.tsx`.

---

## Các điểm liên hệ trên trang

| Vị trí | Gọi điện | Zalo | Hiện khi nào |
|---|---|---|---|
| Header | ✅ | — | Luôn (từ 640px trở lên) |
| Hero | ✅ | — | Luôn |
| Mỗi thẻ dịch vụ | ✅ | — | Luôn |
| Bảng giá | ✅ | — | Luôn |
| FAQ | ✅ | — | Luôn |
| CTA cuối trang | ✅ | ✅ | Luôn |
| Footer | ✅ ×2 | ✅ | Luôn |
| **Cụm nút nổi** (góc phải dưới) | ✅ | ✅ | Desktop, sau khi cuộn > 600px |
| **Thanh CTA cố định** (đáy màn hình) | ✅ | ✅ | Dưới 1024px |

Cụm nút nổi xếp từ trên xuống: **lên đầu trang · Zalo · gọi điện**.
Nút gọi to nhất (64px) và có vòng sóng lan, Zalo 56px — cỡ nút phản ánh đúng thứ tự ưu tiên chuyển đổi.

Mọi link Zalo đều là `https://zalo.me/0978072221` sinh từ `content/site.ts`,
mở tab mới kèm `rel="noopener noreferrer"`.

---

## Cấu trúc thư mục

```
app/                      Route, layout, metadata, sitemap, robots, manifest
  api/booking/route.ts    Nhận form → kiểm tra → đẩy sang Google Sheet
components/
  layout/                 Header, Footer, thanh CTA mobile, cụm nút nổi, thanh tiến trình, Logo
  sections/               12 khối nội dung của trang
  ui/                     Container, SectionHeading, Reveal, Lightbox, Snowfall
  form/                   Form đặt lịch
  icons/                  Bộ icon SVG tự vẽ — không dùng thư viện icon
content/                  ★ Toàn bộ nội dung — sửa ở đây
lib/
  booking-rules.ts        Quy tắc kiểm tra dùng chung client + server (JS thuần)
  validation.ts           Schema zod phía server
  schema.ts               Sinh JSON-LD
  images.ts               Đọc manifest ảnh
  format.ts               Định dạng số điện thoại
  rate-limit.ts           Giới hạn tần suất theo IP
scripts/
  process-images.py       Xử lý ảnh
  audit-responsive.mjs    Kiểm tra tràn ngang qua CDP
```

---

## Những gì đã cố ý KHÔNG làm

Theo nguyên tắc **NT-01** trong tài liệu BA: mục nào khách không có dữ liệu thật thì cắt bỏ,
không để ô trống và không bịa. Cụ thể:

- **Không có khối đánh giá khách hàng** — khách chưa có đánh giá thật. Đăng đánh giá giả kèm
  schema `Review` có thể bị Google phạt thủ công.
- **Không có `AggregateRating` / `Review`** trong JSON-LD, không có "4.9/5", "2.400 đánh giá",
  "12.000+ khách hàng" — đều là số demo không xác minh được.
- **Không có Google Maps, Fanpage, mã số thuế, chi nhánh** — khách ghi "chưa có".
- **Không nhúng Google Analytics / Facebook Pixel** — khách chưa có mã.
- **Không dùng logo các hãng** (Daikin, LG…), chỉ dùng chữ — tránh rủi ro nhãn hiệu.

Khi khách bổ sung dữ liệu, xem `docs/BA-landing-dien-lanh-thai-tuan.md` §15 để biết cách bật lại.

---

## Kết quả đo

| Chỉ số | Giá trị |
|---|---|
| JS riêng của trang | 10.5 kB |
| First Load JS | 121 kB |
| Kiểu render | SSG — toàn bộ HTML có sẵn, không phụ thuộc JS |
| Tràn ngang | Không, từ 320px đến 1440px |
| Thẻ `<h1>` | Đúng 1 |
| Ảnh thiếu `alt` | 0 / 21 |
| SVG thiếu `aria-hidden` | 0 / 133 |
| Node JSON-LD | 11 (HVACBusiness, WebSite, 8 × Service, FAQPage) |
