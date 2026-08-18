# TÀI LIỆU PHÂN TÍCH NGHIỆP VỤ (BA)
## Landing Page — Điện Lạnh Thái Tuấn

| Trường | Giá trị |
|---|---|
| Dự án | Landing page dịch vụ sửa chữa điện lạnh tại nhà |
| Khách hàng | Điện Lạnh Thái Tuấn |
| Người phụ trách | Nguyễn Lê Thái Tuấn — 0978 072 221 |
| Nguồn đầu vào | `PHIEU-THONG-TIN-KHACH-HANG-Landing-Dien-Lanh.docx` + bản demo `index.html` |
| Công nghệ | Next.js (App Router) + TypeScript + Tailwind CSS |
| Tông màu | **Xanh lạnh (cold blue)** — thay cho tông đỏ của bản demo |
| Nơi nhận đặt lịch | **Google Sheet** (đã chốt) |
| Mục tiêu chính | Chuẩn SEO tối đa & tối ưu tỉ lệ gọi/đặt lịch |
| Ngày lập | 2026-08-18 |
| Phiên bản | **1.2** — đã triển khai |

### Thay đổi so với v1.1 (sau khi khách gửi 17 ảnh thật)
1. **Khách đã gửi 17 ảnh thật** — trong đó ảnh số 17 chính là **logo thương hiệu** (huy hiệu tròn tông xanh). Điều này **huỷ bỏ mục C-04** (cắt toàn bộ ảnh chụp) của v1.1: trang nay dùng ảnh thật ở 4 vị trí.
2. **Bảng màu chỉnh lại theo logo thật**: `#14397E` · `#195A9E` · `#609AC4` lấy trực tiếp bằng cách lấy mẫu màu từ file logo, thay cho bảng màu ước lượng ở v1.1.
3. **Thêm 2 khối mới** tận dụng ảnh thật:
   - **Trước – Sau** (thanh kéo so sánh): 2 cặp ảnh vệ sinh máy giặt — khối thuyết phục nhất trang.
   - **Gallery "Hình ảnh tại công trình"**: 8 ảnh công việc thực tế.
4. **Thẻ dịch vụ giữ hướng icon-led** (không dùng ảnh) để 8 thẻ đồng bộ — vì khách không có ảnh cho tivi và nhóm gia dụng. Ảnh dồn vào các khối phát huy tác dụng nhất.
5. **Không dùng ảnh AI nào** — 100% ảnh trên trang là ảnh thật của khách. Đã thử nguồn stock CC0 miễn phí nhưng kết quả không liên quan ngành nghề nên loại bỏ.
6. **Logo, favicon và ảnh Open Graph** đều sinh tự động từ ảnh logo gốc, không cần khách gửi thêm file.
7. Mục **B-03 (logo), B-04 (ảnh đội thợ), B-05 (ảnh OG), B-06 (favicon)** trong danh sách chặn go-live: **đã hoàn thành**.

### Thay đổi ở v1.1 so với v1.0
1. **Nguyên tắc nội dung mới (NT-01):** mục nào khách không điền / ghi "— chưa có —" ⇒ **cắt bỏ khỏi trang**, không để ô trống, không dùng dữ liệu demo, không tự bịa. Toàn bộ danh sách cắt bỏ ở **§2**.
2. **Form đặt lịch:** chốt phương án **Google Sheet** (chi tiết §6.3).
3. Bỏ khung "hạng mục bị chặn" — thay bằng **§2 Phạm vi cắt bỏ** và **§11 Việc cần khách làm** (rút gọn còn 2 mục).

---

## 1. BỐI CẢNH & MỤC TIÊU

### 1.1 Bối cảnh
Khách đang có bản demo HTML tĩnh 1 file (tông đỏ `#E11D2E`) với dữ liệu giả. Phiếu thu thập đã điền được phần **nội dung chữ** (thương hiệu, hotline, dịch vụ, quy trình, FAQ, bảng giá) nhưng **không có bất kỳ tài sản hình ảnh, liên kết ngoài, hay số liệu thống kê nào**.

Dự án dựng lại trên **Next.js**, đổi sang **tông xanh lạnh**, và — theo nguyên tắc NT-01 — chỉ hiển thị những gì khách thực sự có. Kết quả là một trang **gọn hơn, trung thực hơn, và tải nhanh hơn** bản demo.

### 1.2 Mục tiêu kinh doanh
| # | Mục tiêu | KPI |
|---|---|---|
| BG-01 | Tăng cuộc gọi từ website | ≥ 60 click gọi/tháng sau 3 tháng |
| BG-02 | Thu lead qua form | ≥ 30 dòng Google Sheet/tháng |
| BG-03 | Lên top tìm kiếm địa phương | Top 10 cho ≥ 5 từ khoá chính trong 6 tháng |
| BG-04 | Giảm chi phí quảng cáo | Điểm chất lượng Google Ads ≥ 7/10 |
| BG-05 | Tạo niềm tin | Bounce rate < 55% |

### 1.3 Mục tiêu kỹ thuật
| # | Mục tiêu | Ngưỡng |
|---|---|---|
| TG-01 | Core Web Vitals | LCP < 1.8s, INP < 200ms, CLS < 0.05 (mobile 4G) |
| TG-02 | Lighthouse | Performance ≥ 97, SEO = 100, A11y ≥ 95, Best Practices ≥ 95 |
| TG-03 | Dữ liệu có cấu trúc | Pass 100% Google Rich Results Test |
| TG-04 | Mobile-first | Hoạt động đầy đủ từ 320px |
| TG-05 | Trang tĩnh | SSG hoàn toàn, TTFB < 200ms qua CDN |

> Ngưỡng LCP hạ từ 2.0s xuống **1.8s** vì trang không còn ảnh chụp nặng (xem §2 và §4.4).

### 1.4 Ngoài phạm vi
- Blog / hệ thống bài viết (đề xuất giai đoạn 2 — §15).
- Đa ngôn ngữ (khách xác nhận **chỉ tiếng Việt**).
- Thanh toán online, tài khoản người dùng.
- **Google Analytics / Facebook Pixel / GTM** — khách chưa có mã. Code chừa sẵn điểm cắm, bật sau khi khách cung cấp (§10).
- **Google Business Profile** — khách chưa có. Nằm ngoài phạm vi website nhưng là khuyến nghị quan trọng nhất (§12, RISK-02).

---

## 2. PHẠM VI CẮT BỎ (NGUYÊN TẮC NT-01)

> **NT-01 — Nguyên tắc nội dung:** Chỉ đưa lên trang những thông tin khách đã cung cấp và xác nhận là thật. Mục nào khách để trống hoặc ghi "— chưa có —" thì **loại bỏ khỏi thiết kế**, không để ô ảnh trống, không giữ dữ liệu demo, không suy đoán thay khách.

### 2.1 Danh sách cắt bỏ hoàn toàn
| # | Hạng mục bị cắt | Lý do (theo phiếu) | Ảnh hưởng thiết kế |
|---|---|---|---|
| C-01 | **Toàn bộ khối "Đánh giá khách hàng"** (mục 11) | Khách ghi "Chưa có — gửi kèm nếu có" | Trang còn 12 khối thay vì 13. Bù bằng khối bảng giá + cam kết đặt ngay trước CTA cuối |
| C-02 | **Số "4.9/5" và "2.400 lượt đánh giá"** | Số demo, không có nguồn | Bỏ dòng ghi chú cuối hero; bỏ ô số thứ 4 ở dải thống kê |
| C-03 | **Số "12.000+ khách hàng đã phục vụ"** | Số demo, khách không xác nhận | Bỏ ô số thứ 2 ở dải thống kê |
| C-04 | **Toàn bộ ảnh chụp** (đội thợ, xe, đồng phục, cửa hàng, trước–sau, giấy phép) | Khách ghi "Chưa có" ở cả 6 mục | ⇒ **Thiết kế không dùng ảnh chụp** (§4.4) |
| C-05 | **Ảnh bản đồ khu vực phục vụ** | Khách ghi "Đang là ô ảnh trống" | Khối khu vực chỉ còn lưới chip tên quận (dữ liệu này khách đã điền đủ) |
| C-06 | **Link Google Maps + nút "Chỉ đường"** | Khách ghi "— chưa có —" | Bỏ nút; địa chỉ ở footer để dạng chữ thuần |
| C-07 | **Link Fanpage Facebook** | Khách chỉ ghi tên, không có URL | Bỏ icon Facebook ở header/footer |
| C-08 | **Mã số thuế** | Chỉ có số demo `0xxxxxxxxx` | Bỏ dòng MST khỏi footer |
| C-09 | **Chi nhánh khác** | Khách ghi "— chưa có —" | Footer chỉ 1 địa chỉ |
| C-10 | **Trang "Chính sách bảo hành" riêng** | Khách không soạn nội dung | Bỏ trang; link chuyển thành neo tới FAQ #3 + cột "Bảo hành" trong bảng giá — nội dung này khách đã điền đầy đủ |
| C-11 | **Cam kết 06** | Bị copy trùng cam kết 05 trong phiếu | Khối cam kết còn **5 mục**, lưới 5 ô cân đối |
| C-12 | **Slogan / khẩu hiệu** | Khách ghi "Chưa có" | Không thêm dòng slogan dưới logo (đã có mô tả ngắn) |
| C-13 | **Ghi chú phí ngoài giờ / ngoại thành / chiết khấu** | Khách bỏ trống | Bỏ dòng ghi chú này dưới bảng giá |
| C-14 | **Google Analytics / Facebook Pixel / GTM** | Khách ghi "Chưa gắn" | Không nhúng script nào ở bản go-live (§10) |
| C-15 | **Zalo OA** | Khách ghi "Chưa có" | Dùng link `zalo.me` sinh từ số điện thoại (§2.2) |
| C-16 | **Bản tiếng Anh** | Khách chọn "Chỉ tiếng Việt" | Không làm i18n |
| C-17 | **Giá khởi điểm của nhóm gia dụng** (bếp từ, lò vi sóng, máy rửa chén, máy lọc nước) | Khách nêu dịch vụ nhưng không cho giá | **Giữ thẻ dịch vụ**, bỏ dòng giá, thay bằng nút "Gọi tư vấn báo giá" |
| C-18 | **Hiệu ứng tuyết rơi** của demo | Không có trong yêu cầu, tốn INP | Bỏ |

### 2.2 Nội dung suy ra được — GIỮ LẠI
Những mục sau tuy phiếu không điền riêng nhưng **suy ra trực tiếp từ dữ liệu khách đã cho**, không phải bịa:

| Hạng mục | Nguồn suy ra |
|---|---|
| Link chat Zalo `https://zalo.me/0978072221` | Số Zalo khách đã điền ở mục 1 |
| Link gọi `tel:+84978072221` / `tel:+84898675073` | Hotline chính & phụ khách đã điền |
| Bảo hành "6 – 12 tháng tuỳ hạng mục" | Cột bảo hành trong bảng giá khách đã duyệt (1 / 3 / 6 / 12 tháng) — **giải quyết luôn thắc mắc "6 tháng vs 12 tháng"** khách ghi ở mục 4 |
| Logo dạng chữ + icon | Không cần file khách — tự dựng (§4.4) |
| Favicon & ảnh chia sẻ mạng xã hội | Sinh tự động từ logo chữ + nền xanh (§4.4) |
| Nội dung chính sách bảo hành | Ghép từ FAQ #3 + cột bảo hành bảng giá |

### 2.3 Kết quả: cấu trúc trang sau khi cắt
| # | Khối | Anchor | Trạng thái |
|---|---|---|---|
| 1 | Header + hotline | — | ✅ |
| 2 | Hero + Form đặt lịch | `#top` | ✅ (bỏ dòng ghi chú đánh giá) |
| 3 | Dải cam kết nhanh (thay dải thống kê) | — | ✅ Rút từ 4 → **3 ô** |
| 4 | Dải hãng nhận sửa | — | ✅ |
| 5 | Khối dịch vụ (8 thẻ) | `#dich-vu` | ✅ |
| 6 | Cam kết (5 mục) | `#cam-ket` | ✅ Rút từ 6 → 5 |
| 7 | Quy trình 4 bước | `#quy-trinh` | ✅ |
| 8 | Bảng giá (10 dòng) | `#bang-gia` | ✅ |
| 9 | Khu vực phục vụ | `#khu-vuc` | ✅ Bỏ ảnh bản đồ |
| ~~10~~ | ~~Đánh giá khách hàng~~ | — | ❌ **Cắt (C-01)** |
| 10 | Câu hỏi thường gặp | `#faq` | ✅ |
| 11 | CTA cuối trang | `#lien-he` | ✅ |
| 12 | Footer | — | ✅ Bỏ MST, Fanpage, Maps |
| 13 | Nút gọi nổi + thanh CTA đáy (mobile) | — | ✅ |

---

## 3. ĐỐI TƯỢNG NGƯỜI DÙNG

### 3.1 Persona chính — "Khách khẩn cấp"
Chủ nhà/người thuê tại TP.HCM, 25–55 tuổi, thiết bị vừa hỏng. Tìm bằng điện thoại, thường buổi tối hoặc ngày nóng. Cần thợ đến nhanh, biết trước giá. Quyết định trong **dưới 60 giây**.
⇒ Hotline hiện ngay màn hình đầu; nút gọi cố định trên mobile; giá và bảo hành xuất hiện sớm.

### 3.2 Persona phụ — "Khách bảo dưỡng định kỳ"
Hộ gia đình/văn phòng nhỏ cần vệ sinh máy lạnh, máy giặt định kỳ. Cần bảng giá minh bạch, chiết khấu số lượng.
⇒ Bảng giá chi tiết; form có chọn dịch vụ.

### 3.3 Persona phụ — "Khách doanh nghiệp"
Quán ăn, văn phòng — cần hoá đơn VAT.
⇒ Nhấn "xuất hoá đơn VAT" ở thẻ dịch vụ tháo lắp và FAQ thanh toán.

---

## 4. HỆ THỐNG THIẾT KẾ — TÔNG XANH LẠNH

### 4.1 Bảng màu
Thay hoàn toàn tông đỏ/cam của demo. Xanh dương sâu tạo cảm giác tin cậy & mát; cyan làm điểm nhấn hành động.

| Token | Hex | Dùng cho |
|---|---|---|
| `--brand-900` | `#0B2545` | Nền footer, nền hero đậm, tiêu đề |
| `--brand-800` | `#12395F` | Gradient hero |
| `--brand-700` | `#14558C` | Nút phụ, viền nhấn |
| `--brand-600` | `#1B72B8` | **Màu chủ đạo** — nút chính, link |
| `--brand-500` | `#2C93DE` | Hover, icon |
| `--brand-100` | `#DCEEFB` | Nền badge, chip tên quận |
| `--brand-50` | `#F2F8FD` | Nền section xen kẽ |
| `--accent-500` | `#06B6D4` | **Nhấn hành động** — nút gọi, highlight |
| `--accent-300` | `#67E8F9` | Gradient phụ |
| `--warm-500` | `#F59E0B` | Giá tiền (điểm ấm duy nhất) |
| `--ink` | `#0F172A` | Chữ chính |
| `--ink-2` | `#334155` | Chữ phụ |
| `--muted` | `#64748B` | Chữ mờ, ghi chú |
| `--line` | `#E2E8F0` | Đường kẻ, viền |
| `--bg` | `#FFFFFF` | Nền chính |
| `--success` | `#059669` | Chấm "đang nhận lịch", thông báo thành công |
| `--danger` | `#DC2626` | Lỗi form |

- `theme-color`: `#0B2545`
- **Tương phản:** mọi cặp chữ/nền đạt WCAG AA (≥ 4.5:1). Cyan `#06B6D4` **không** dùng làm chữ trên nền trắng — chỉ làm nền với chữ `--brand-900`.

### 4.2 Typography
- **Be Vietnam Pro** (theo yêu cầu khách), nạp qua `next/font/google`, subset `vietnamese` + `latin`, weight 400/500/600/700/800, `display: 'swap'` ⇒ tự host, **0 request tới `fonts.googleapis.com`**.
- Thang chữ (mobile → desktop):
  - H1: 30 → 52px, weight 800, line-height 1.15
  - H2: 24 → 36px, weight 700
  - H3: 18 → 22px, weight 600
  - Body: **16px tối thiểu** (tránh iOS tự zoom khi focus input)
  - Ghi chú: 13–14px

### 4.3 Nguyên tắc giao diện
- Bo góc 12px (thẻ nhỏ) / 20px (thẻ lớn) / 999px (badge, nút tròn).
- Đổ bóng ánh xanh: `0 8px 24px rgba(11,37,69,.08)`.
- Nền section xen kẽ trắng ↔ `--brand-50`.
- Chuyển động chỉ dùng `transform`/`opacity`. Tôn trọng `prefers-reduced-motion: reduce` ⇒ tắt toàn bộ animation.
- Icon: **SVG inline tự vẽ**, không thư viện icon, không icon font.

### 4.4 ⭐ Hướng thiết kế không dùng ảnh chụp (hệ quả của C-04)
Khách không có bất kỳ ảnh nào. Thay vì để ô ảnh trống (làm trang trông dở dang, giảm niềm tin nhiều hơn là không có ảnh), toàn trang chuyển sang ngôn ngữ thị giác **đồ hoạ – kiểu chữ**:

| Vị trí trước đây dùng ảnh | Thay bằng |
|---|---|
| Ảnh nền hero | Gradient `--brand-900 → --brand-700` + hoa văn bông tuyết/luồng khí SVG mờ + hoạ tiết lưới nhẹ |
| Ảnh minh hoạ thẻ dịch vụ | Icon SVG tự vẽ nét 1.5px tông cyan trong khung tròn `--brand-100` |
| Ảnh đội thợ | Khối "5 cam kết" phóng to với typography mạnh — bán bằng **lời hứa cụ thể**, không bằng ảnh |
| Ảnh bản đồ | Lưới chip tên quận, 20 chip, `--brand-100` |
| Logo | Wordmark **"ĐIỆN LẠNH THÁI TUẤN"** + icon bông tuyết SVG, dựng bằng code |
| Favicon | Icon bông tuyết trên nền `--brand-900`, xuất `.ico` + `.png` 512 & 180 |
| Ảnh chia sẻ mạng xã hội (OG) | Sinh động bằng `next/og` (ImageResponse): nền gradient xanh + wordmark + dòng "Sửa máy lạnh · tủ lạnh · máy giặt tại nhà TP.HCM · 0978 072 221" |

**Lợi ích kèm theo:** không ảnh chụp ⇒ trang chỉ còn HTML/CSS/SVG ⇒ LCP cực nhanh, tổng dung lượng trang mục tiêu **< 250KB**, điểm Performance dễ đạt 99–100.

> Khi khách gửi ảnh thật (khuyến nghị mạnh, xem §12/RISK-03), bổ sung vào 3 vị trí đã chừa sẵn: nền hero, dải ảnh công việc dưới khối quy trình, và ảnh nền OG. Không cần đổi cấu trúc.

---

## 5. YÊU CẦU CHỨC NĂNG — PHẦN NỘI DUNG

Ký hiệu: **(*)** = dữ liệu bắt buộc, đã có đủ.

### 5.1 FR-01 — Header
| Thành phần | Nội dung chốt |
|---|---|
| Logo | Wordmark + icon bông tuyết SVG (§4.4) |
| Tên thương hiệu (*) | Điện Lạnh Thái Tuấn |
| Mô tả dưới logo (*) | Sửa máy lạnh · tủ lạnh · máy giặt |
| Menu | Dịch vụ · Bảng giá · Quy trình · Khu vực · Hỏi đáp |
| CTA header | `Gọi 0978 072 221` → `tel:+84978072221` |
| Giờ làm việc (*) | 8:00 – 21:00 (T2 – CN) |

**Hành vi:** header dính khi cuộn > 80px, nền `backdrop-blur` + viền dưới. Mobile: hamburger mở panel trượt, chiều cao header ≤ 64px. Menu bỏ mục "Đánh giá" (khối đã cắt — C-01).

### 5.2 FR-02 — Hero
| Thành phần | Nội dung thật |
|---|---|
| Nhãn trạng thái | ● Đang nhận lịch — thợ có mặt sau 30 phút |
| H1 (*) | **Sửa máy lạnh, tủ lạnh, máy giặt tại nhà TP.HCM** |
| Mô tả (*) | Kiểm tra miễn phí, báo giá trước khi sửa — không phát sinh. Kỹ thuật viên tay nghề cao, có mặt trong 30 phút, bảo hành đến 12 tháng. |
| Điểm mạnh 1 (*) | Miễn phí kiểm tra |
| Điểm mạnh 2 (*) | **Giá cả minh bạch** *(khách sửa từ "Báo giá trước")* |
| Điểm mạnh 3 (*) | Bảo hành đến 12 tháng |
| Điểm mạnh 4 (*) | Làm việc cả T7 – CN |
| Nút chính | `Gọi 0978 072 221` |
| Nút phụ | `Đặt lịch online` → cuộn tới form |
| ~~Ghi chú cuối~~ | ❌ **Cắt (C-02)** — thay bằng: *Hoạt động 8:00 – 21:00 tất cả các ngày* |

**Kỹ thuật:** `<h1>` duy nhất trên trang. Nền gradient + SVG (không ảnh) ⇒ LCP là khối chữ H1, tải gần như tức thì. Bố cục 2 cột ≥1024px (nội dung trái / form phải); mobile 1 cột theo thứ tự nội dung → nút CTA → form.

### 5.3 FR-03 — Dải cam kết nhanh *(thay dải thống kê cũ)*
Dải thống kê cũ có 4 ô, trong đó 2 ô là số bịa (C-02, C-03). Giữ lại 3 ô dựa trên dữ kiện có thật:

| # | Số / nhãn | Chú thích | Nguồn |
|---|---|---|---|
| 1 | **30 phút** | Có mặt tận nơi | Khách xác nhận ở hero & cam kết 01 |
| 2 | **6 – 12 tháng** | Bảo hành tuỳ hạng mục | Cột bảo hành bảng giá (§5.7) |
| 3 | **8:00 – 21:00** | Nhận lịch cả T7 – CN & ngày lễ | Mục 1 phiếu + FAQ #4 |

> Không có ô nào là con số thống kê tự khai. Toàn bộ đều là **cam kết dịch vụ** — dùng được cho quảng cáo Google/Facebook mà không rủi ro bị từ chối.

### 5.4 FR-04 — Dải hãng nhận sửa
- Tiêu đề: **Nhận sửa mọi thương hiệu**
- Danh sách (*): Daikin, Panasonic, LG, Samsung, Toshiba, Electrolux, Sharp, Aqua, Mitsubishi, Casper, Funiki, Hitachi, Sanyo, Midea
- Hiển thị: dải chạy ngang CSS thuần, dừng khi hover, tự dừng khi `prefers-reduced-motion`.
- Dùng **chữ (wordmark) tông xanh xám**, **không dùng logo hãng** — tránh rủi ro nhãn hiệu (RISK-04).

### 5.5 FR-05 — Khối dịch vụ (8 thẻ)
- Tiêu đề mục: **Sửa chữa & bảo dưỡng mọi thiết bị điện lạnh**
- Mô tả mục: *Máy lạnh · tủ lạnh · máy giặt · bếp từ · lò vi sóng · máy rửa chén · máy lọc nước — nhận sửa tại nhà tất cả hãng.*

| # | Dịch vụ | Mô tả hiển thị | 3 gạch đầu dòng | Giá | Ghi chú giá |
|---|---|---|---|---|---|
| 1 | Sửa máy lạnh | Máy không mát, chảy nước, kêu to, xì gas, chớp đèn báo lỗi, tự tắt nguồn. | Nạp gas R32/R410A · Thay board, tụ, quạt · Xử lý rò rỉ gas, nghẹt ống | Từ 200.000đ | Đã gồm công kiểm tra |
| 2 | Sửa tủ lạnh | Tủ không lạnh, đóng tuyết, chảy nước, block kêu, chạy liên tục không nghỉ. | Mọi dung tích, side-by-side · Thay block, thay gas · Cho mượn tủ nếu sửa lâu | Từ 250.000đ | Báo giá theo dung tích tủ |
| 3 | Sửa máy giặt | Không lên nguồn, không cấp/xả nước, không vắt, rò điện, báo lỗi E1/E2/E3. | Cửa trên & cửa ngang · Thay bo mạch, dây curoa · Vệ sinh lồng giặt | Từ 180.000đ | Miễn phí kiểm tra |
| 4 | Vệ sinh máy lạnh | Bảo dưỡng định kỳ giúp máy lạnh nhanh, tiết kiệm 20–30% tiền điện. | Xịt rửa bằng máy áp lực · Diệt khuẩn, khử mùi hôi · Kiểm tra gas miễn phí | Từ 150.000đ | Giảm 15% từ 2 máy |
| 5 | **Vệ sinh máy giặt** | Loại bỏ cặn bột giặt, xơ vải, nấm mốc trong lồng giặt — quần áo sạch thơm, máy bền hơn. | Cửa trên & cửa ngang · Tháo lồng vệ sinh sâu · Diệt khuẩn, khử mùi | Từ 350.000đ | Bảo hành 3 tháng |
| 6 | Sửa tivi | Mất hình, mất tiếng, sọc màn hình, không lên nguồn, lỗi phần mềm. | LED, OLED, Smart TV · Thay panel, main, nguồn · Sửa tại nhà | Từ 250.000đ | Linh kiện chính hãng |
| 7 | **Bếp từ · Lò vi sóng · Máy rửa chén · Máy lọc nước** | Nhận kiểm tra và sửa chữa tại nhà, thay linh kiện chính hãng. | Kiểm tra tại nhà · Thay linh kiện chính hãng · Báo giá trước khi sửa | ❌ **Cắt dòng giá (C-17)** | Nút `Gọi tư vấn báo giá` |
| 8 | Tháo lắp – di dời máy lạnh | Tháo lắp khi chuyển nhà, thu hồi gas đúng kỹ thuật, thi công đường ống mới trọn gói. | Thu hồi gas đúng kỹ thuật · Khảo sát vị trí miễn phí · Có xuất hoá đơn VAT | Từ 350.000đ | Trọn gói tháo + lắp |

**Xử lý nội dung dài:** khách gửi danh sách lỗi rất chi tiết cho dịch vụ 1, 2, 3, 8. Hiển thị 1 câu tóm tắt trên thẻ; danh sách đầy đủ đặt trong `<details>` "Các lỗi thường gặp" **ngay trong HTML** (không lazy render bằng JS) — vừa gọn giao diện vừa tăng mật độ từ khoá dài.

**Hiển thị:** lưới 1 / 2 / 4 cột (mobile / tablet / desktop). Icon SVG tự vẽ cho từng dịch vụ. Mỗi thẻ có nút gọi.

### 5.6 FR-06 — Cam kết (5 mục)
- Tiêu đề: **Vì sao khách hàng chọn chúng tôi**
- Mô tả: *Minh bạch từ giá đến quy trình — bạn biết chính xác mình trả tiền cho việc gì.*

| # | Tiêu đề | Giải thích |
|---|---|---|
| 01 | Có mặt sau 30 phút | Đội thợ phủ khắp các quận, nhận lịch là điều phối người gần bạn nhất. |
| 02 | Báo giá trước khi sửa | Kiểm tra xong báo giá rõ ràng. Bạn đồng ý mới làm. |
| 03 | Miễn phí kiểm tra | Không sửa vẫn không mất phí, không thu phí di chuyển nội thành. |
| 04 | Bảo hành đến 12 tháng | Có phiếu bảo hành cho từng hạng mục. |
| 05 | Linh kiện chính hãng | Cho khách xem linh kiện cũ đã thay, nói rõ nguồn gốc. |
| ~~06~~ | ❌ **Cắt (C-11)** — trùng mục 05 trong phiếu | |

**Bố cục:** lưới 5 ô — mobile 1 cột, tablet 2 cột (3+2), desktop 5 cột ngang hoặc 3+2 lệch. Mục 01 và 04 phóng to (ô đôi) vì là hai lời hứa mạnh nhất.

### 5.7 FR-07 — Quy trình 4 bước
- Tiêu đề: **4 bước — từ lúc gọi đến khi máy chạy lại**

| Bước | Tiêu đề | Nội dung |
|---|---|---|
| 1 | Tiếp nhận yêu cầu | Gọi hotline hoặc điền form. Tổng đài xác nhận địa chỉ và khung giờ. |
| 2 | Kỹ thuật viên đến | Thợ gần nhất có mặt trong khoảng 30 phút, kiểm tra trực tiếp, xác định chính xác nguyên nhân và tư vấn phương án phù hợp. |
| 3 | Báo giá & sửa chữa | Báo giá rõ ràng từng hạng mục. Chỉ khi bạn đồng ý, thợ mới bắt đầu — không phát sinh chi phí ngoài dự kiến. |
| 4 | Nghiệm thu & bảo hành | Chạy thử cùng khách, kiểm tra máy hoạt động ổn định, dọn sạch khu vực và bàn giao phiếu bảo hành. |

*(Nội dung khách gửi dạng đoạn văn dài đã rút gọn cho vừa giao diện — giữ nguyên ý.)*
Hiển thị: timeline ngang (desktop) / dọc (mobile), số bước trong vòng tròn gradient xanh→cyan.

### 5.8 FR-08 — Bảng giá ⭐ (khối quan trọng nhất)
Khách đã xác nhận **"Giá như trên ok không cần chỉnh sửa"** ⇒ giá demo trở thành giá chính thức, cộng 2 hạng mục khách bổ sung.

| Hạng mục | Thiết bị / phạm vi | Giá | Bảo hành |
|---|---|---|---|
| Vệ sinh máy lạnh | Treo tường 9.000 – 12.000 BTU | 150.000 – 250.000đ | 1 tháng |
| Vệ sinh máy lạnh | Áp trần / tủ đứng | 350.000 – 600.000đ | 1 tháng |
| Nạp gas R32 / R410A | Máy lạnh dân dụng | 400.000 – 700.000đ | 6 tháng |
| Thay board mạch | Máy lạnh Inverter | 900.000 – 1.800.000đ | 12 tháng |
| Thay block | Tủ lạnh 150 – 300L | 1.200.000 – 2.200.000đ | 12 tháng |
| Xử lý tủ không lạnh | Tủ lạnh mọi loại | 250.000 – 800.000đ | 6 tháng |
| Thay bo mạch máy giặt | Cửa trên / cửa ngang | 700.000 – 1.500.000đ | 12 tháng |
| Tháo lắp máy lạnh | Trọn gói tháo + lắp lại | 350.000 – 700.000đ | 3 tháng |
| **Vệ sinh máy giặt** | Cửa trên / cửa ngang | 350.000 – 650.000đ | 3 tháng |
| **Thay ron tủ lạnh** | Mọi loại tủ | 1.200.000 – 2.200.000đ | 3 tháng |

- Ghi chú duy nhất dưới bảng: *Giá tham khảo, đã gồm công. Giá cuối cùng được báo tại nhà sau khi kiểm tra và chỉ thực hiện khi khách đồng ý.*
- ❌ Bỏ dòng ghi chú phí ngoài giờ / ngoại thành / chiết khấu (C-13).
- **Kỹ thuật:** `<table>` ngữ nghĩa có `<caption>`, `<thead>`, `<th scope="col">`. Mobile chuyển sang thẻ xếp chồng, **không cuộn ngang**. Không dùng `<div>` giả bảng.
- Cột "Bảo hành" là nguồn nội dung thay thế cho trang chính sách bảo hành đã cắt (C-10) ⇒ đặt `id="bao-hanh"` để neo tới.

### 5.9 FR-09 — Khu vực phục vụ
- Tiêu đề: **Có mặt khắp TP.HCM & vùng lân cận**
- Mô tả: *Đội kỹ thuật được phân bổ theo từng cụm quận, giúp tối ưu thời gian di chuyển — trung bình chỉ 20–30 phút tuỳ vị trí và tình hình giao thông.*
- Danh sách (*): Q1, Q3, Q4, Q5, Q6, Q7, Q8, Q10, Q11, Q12, Bình Thạnh, Gò Vấp, Phú Nhuận, Tân Bình, Tân Phú, Bình Tân, TP. Thủ Đức, Nhà Bè, Hóc Môn, Bình Chánh
- Hiển thị: lưới 20 chip `--brand-100`. ❌ Không có ảnh/bản đồ (C-05, C-06).
- **Khối SEO địa phương quan trọng nhất** — mỗi tên quận là một cụm từ khoá, đồng thời là `areaServed` trong schema.

### 5.10 FR-10 — Câu hỏi thường gặp
| # | Câu hỏi | Trả lời |
|---|---|---|
| 1 | Phí kiểm tra có mất tiền không? | Hoàn toàn miễn phí trong nội thành TP.HCM. Nếu bạn không đồng ý sửa sau khi nghe báo giá, cũng không mất bất kỳ chi phí nào. |
| 2 | Bao lâu thì thợ có mặt? | Thông thường khoảng 30 phút với các quận trung tâm. Thời gian có thể thay đổi tuỳ vị trí và tình hình giao thông, chúng tôi luôn cố gắng có mặt nhanh nhất. |
| 3 | Chính sách bảo hành như thế nào? | Áp dụng theo từng hạng mục: vệ sinh máy 1 tháng, nạp gas 6 tháng, linh kiện thay thế đến 12 tháng. Trong thời gian bảo hành, nếu phát sinh vấn đề thuộc hạng mục đã làm, kỹ thuật viên sẽ kiểm tra và xử lý. |
| 4 | Có làm ngoài giờ và ngày lễ không? | Có. Chúng tôi nhận lịch 8:00 – 21:00 tất cả các ngày, kể cả buổi tối, cuối tuần và ngày lễ. |
| 5 | Thanh toán bằng hình thức nào? | Tiền mặt, chuyển khoản hoặc ví điện tử. Có hỗ trợ xuất hoá đơn VAT theo yêu cầu. |
| 6 | Nếu sửa lâu ngày thì sao? | Với tủ lạnh cần mang về xưởng, chúng tôi cho mượn thiết bị thay thế miễn phí trong thời gian sửa. |

- Giữ đúng **6 câu** khách đã duyệt. Không tự thêm câu mới (theo NT-01).
- Câu 3 mang `id="bao-hanh-faq"` — là nội dung thay thế cho trang chính sách bảo hành đã cắt.
- **Kỹ thuật:** `<details>/<summary>` gốc HTML (không cần JS, luôn có trong DOM, bot đọc được toàn bộ) + JSON-LD `FAQPage` khớp nguyên văn.

### 5.11 FR-11 — CTA cuối trang & Footer
| Thành phần | Nội dung |
|---|---|
| Tiêu đề CTA | Máy đang hỏng? Gọi ngay, thợ tới sau 30 phút |
| Mô tả | Tổng đài hoạt động 8:00 – 21:00 mỗi ngày. Miễn phí kiểm tra, báo giá trước khi sửa. |
| Nút | `Gọi 0978 072 221` · `Chat Zalo` · `Đặt lịch online` |
| Giới thiệu footer | Dịch vụ sửa chữa & bảo dưỡng điện lạnh tại nhà khu vực TP.HCM. Uy tín — minh bạch — bảo hành dài hạn. |
| Hotline chính (*) | 0978 072 221 |
| Hotline phụ (*) | 0898 675 073 |
| Zalo (*) | `https://zalo.me/0978072221` |
| Email (*) | nguyenlethaituan10122002@gmail.com |
| Địa chỉ (*) | 186 Nguyễn Sơn, Phường Phú Thọ Hoà, Quận Tân Phú, TP.HCM |
| Giờ làm việc (*) | 8:00 – 21:00 (T2 – CN) |
| Liên kết nhanh | Dịch vụ · Bảng giá · Quy trình · Khu vực · Hỏi đáp · Chính sách bảo mật |
| Bản quyền | © 2026 Điện Lạnh Thái Tuấn |
| ❌ Cắt | Mã số thuế (C-08) · Fanpage (C-07) · Google Maps (C-06) · Chi nhánh khác (C-09) · Link "Chính sách bảo hành" (C-10 → đổi thành neo `#bao-hanh`) |

> **Khuyến nghị (không chặn):** email `nguyenlethaituan10122002@gmail.com` là email cá nhân. Khi có tên miền nên chuyển sang `lienhe@<tenmien>` — tăng độ tin cậy với khách doanh nghiệp.

### 5.12 FR-12 — CTA nổi (mobile)
- **Thanh CTA đáy** (< 1024px): 2 nút chia đôi — `📞 Gọi ngay` (nền cyan) và `💬 Zalo` (nền trắng, viền xanh).
- **Nút gọi tròn nổi** góc phải dưới trên desktop, vòng sóng lan nhẹ — tắt khi `prefers-reduced-motion`.
- `<body>` chừa `padding-bottom` bằng chiều cao thanh; tôn trọng `env(safe-area-inset-bottom)` cho iPhone.
- Nút "Lên đầu trang" xuất hiện sau khi cuộn > 600px.

---

## 6. FORM ĐẶT LỊCH → GOOGLE SHEET ⭐ (ĐÃ CHỐT)

### 6.1 Nội dung form
| Thành phần | Nội dung |
|---|---|
| Tiêu đề | Đặt lịch thợ đến nhà |
| Mô tả | Điền thông tin, tổng đài gọi lại xác nhận trong 5 phút. |
| Nút gửi | Gửi yêu cầu — Gọi lại sau 5 phút |
| Thông báo thành công | ✓ Đã nhận yêu cầu. Tổng đài sẽ gọi lại trong 5 phút. Cần gấp, vui lòng gọi 0978 072 221. |
| Thông báo lỗi | Không gửi được. Vui lòng gọi trực tiếp 0978 072 221 — tổng đài hỗ trợ ngay. |

### 6.2 Các trường
| Trường | Kiểu | Bắt buộc | Kiểm tra hợp lệ |
|---|---|---|---|
| Họ tên | text | ✅ | 2–60 ký tự |
| Số điện thoại | tel | ✅ | Số VN: bắt đầu `0` hoặc `+84`, đầu số 3/5/7/8/9, đủ 10 chữ số |
| Dịch vụ | select | ✅ | Thuộc danh sách bên dưới |
| Địa chỉ | text | ✅ | 5–160 ký tự |
| Mô tả tình trạng | textarea | ❌ | ≤ 500 ký tự |
| Honeypot (ẩn) | text | — | Có giá trị ⇒ loại bỏ âm thầm, vẫn trả 200 |

**Danh sách dịch vụ trong ô chọn (*)** — đúng theo khách điền:
Sửa máy lạnh · Vệ sinh máy lạnh · Sửa tủ lạnh · Sửa máy giặt · Vệ sinh máy giặt · Sửa tivi · Tháo lắp – di dời máy lạnh · Máy rửa chén · Máy lọc nước · Bếp từ · Khác

> Giữ đúng 5 trường như bản demo. **Không thêm trường "khung giờ mong muốn"** — khách không yêu cầu, và mỗi trường thêm vào đều làm giảm tỉ lệ hoàn thành form.

### 6.3 Kiến trúc gửi dữ liệu

```
Người dùng gửi form
  → Kiểm tra client (react-hook-form + zod)
  → POST /api/booking                          (Next.js Route Handler)
      ├─ Kiểm tra lại server bằng CHÍNH schema zod đó
      ├─ Honeypot + rate limit theo IP (5 lượt / 10 phút)
      ├─ POST tới Google Apps Script Web App   (kèm SHARED_SECRET)
      │     └─ Apps Script: appendRow() vào Sheet
      │                   + MailApp.sendEmail() báo về Gmail khách
      └─ Trả 200
  → Hiện thông báo thành công (không chuyển trang, giữ ngữ cảnh)
```

**Vì sao chọn Apps Script thay vì Service Account + `googleapis`:**

| Tiêu chí | Apps Script Web App ✅ | Service Account |
|---|---|---|
| Khách tự quản lý | Sheet nằm trong Drive của khách, tự mở xem bất cứ lúc nào | Phải chia sẻ quyền qua email service account |
| Khoá bí mật | 1 chuỗi `SHARED_SECRET` tự đặt | File JSON private key — rủi ro lộ cao hơn |
| Phụ thuộc | 0 package | `googleapis` (~2MB) |
| Gửi email báo | `MailApp` có sẵn, miễn phí | Cần thêm dịch vụ email (Resend/SendGrid) |
| Chi phí | Miễn phí hoàn toàn | Miễn phí nhưng cấu hình phức tạp hơn |

### 6.4 Cấu trúc Google Sheet
Sheet tên `Đặt lịch — Điện Lạnh Thái Tuấn`, tab `Leads`:

| Cột | Tên | Nguồn |
|---|---|---|
| A | Thời gian | Server sinh (múi giờ `Asia/Ho_Chi_Minh`) |
| B | Họ tên | Form |
| C | Số điện thoại | Form (định dạng `'0978072221` — thêm dấu `'` để Sheet không cắt số 0 đầu) |
| D | Dịch vụ | Form |
| E | Địa chỉ | Form |
| F | Mô tả tình trạng | Form |
| G | Nguồn | `utm_source` / `document.referrer` — phục vụ đo hiệu quả quảng cáo sau này |
| H | Thiết bị | Mobile / Desktop (rút từ user-agent) |
| I | **Trạng thái** | Cột trống để khách tự cập nhật: `Mới` → `Đã gọi` → `Đã đặt lịch` → `Hoàn thành` / `Huỷ` |
| J | **Ghi chú nội bộ** | Khách tự điền |

**Thiết lập kèm theo (bên phát triển làm giúp):**
- Hàng 1 khoá (freeze) + định dạng đậm nền xanh.
- **Định dạng có điều kiện** cột I: `Mới` = vàng, `Đã gọi` = xanh dương, `Hoàn thành` = xanh lá, `Huỷ` = xám.
- Bộ lọc sẵn trên toàn bảng.
- Email thông báo tức thì về `nguyenlethaituan10122002@gmail.com` với tiêu đề `🔔 Yêu cầu mới: <Dịch vụ> — <SĐT>` và nội dung có sẵn link `tel:` để bấm gọi ngay từ điện thoại.

### 6.5 Mã Apps Script (bàn giao cho khách dán vào Sheet)
```javascript
const SECRET = 'ĐẶT_CHUỖI_BÍ_MẬT_Ở_ĐÂY';
const NOTIFY_EMAIL = 'nguyenlethaituan10122002@gmail.com';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.secret !== SECRET) {
      return ContentService.createTextOutput(JSON.stringify({ ok: false }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
    const now = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm');

    sheet.appendRow([
      now, d.name, "'" + d.phone, d.service,
      d.address, d.note || '', d.source || 'truc-tiep',
      d.device || '', 'Mới', '',
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: '🔔 Yêu cầu mới: ' + d.service + ' — ' + d.phone,
      htmlBody:
        '<h3>Yêu cầu đặt lịch mới</h3>' +
        '<p><b>Khách:</b> ' + d.name + '<br>' +
        '<b>SĐT:</b> <a href="tel:' + d.phone + '">' + d.phone + '</a><br>' +
        '<b>Dịch vụ:</b> ' + d.service + '<br>' +
        '<b>Địa chỉ:</b> ' + d.address + '<br>' +
        '<b>Tình trạng:</b> ' + (d.note || '(không ghi)') + '</p>' +
        '<p><i>' + now + '</i></p>',
    });

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```
**Triển khai:** Deploy → New deployment → Web app → Execute as **Me** → Who has access **Anyone** → copy URL vào biến môi trường `GOOGLE_SHEET_WEBHOOK_URL`.

### 6.6 Bảo mật & quyền riêng tư
- `GOOGLE_SHEET_WEBHOOK_URL` và `SHEET_SHARED_SECRET` nằm trong biến môi trường server, **không commit, không lộ ra client**.
- Route `/api/booking` chỉ nhận `POST` cùng origin (chống CSRF).
- Không log số điện thoại / địa chỉ ra console phía client.
- Rate limit theo IP: 5 lượt / 10 phút (in-memory với LRU; đủ cho quy mô này).
- Dưới nút gửi có dòng: *Thông tin của bạn chỉ dùng để liên hệ báo giá và đặt lịch.* kèm link `/chinh-sach-bao-mat` — bắt buộc theo **Nghị định 13/2023/NĐ-CP** về bảo vệ dữ liệu cá nhân.
- Sheet để chế độ **Restricted** (chỉ khách và người được chia sẻ xem được), không bao giờ để "Anyone with the link".

---

## 7. YÊU CẦU SEO (TRỌNG TÂM DỰ ÁN)

### 7.1 Bản đồ từ khoá
| Nhóm | Từ khoá | Đặt ở đâu |
|---|---|---|
| Chính | sửa máy lạnh tại nhà TP.HCM | H1, title, mô tả hero |
| Chính | sửa tủ lạnh tại nhà | H2 khối dịch vụ, thẻ 2 |
| Chính | sửa máy giặt tại nhà | Thẻ 3 |
| Chính | vệ sinh máy lạnh giá rẻ | Thẻ 4, bảng giá |
| Phụ | nạp gas máy lạnh R32 R410A | Bảng giá, thẻ 1 |
| Phụ | tháo lắp di dời máy lạnh | Thẻ 8 |
| Phụ | vệ sinh máy giặt | Thẻ 5, bảng giá |
| Địa phương | sửa máy lạnh Tân Phú / Tân Bình / Quận 7 / Thủ Đức… | Khối khu vực, footer, `areaServed` |
| Long-tail | máy lạnh không mát phải làm sao, tủ lạnh đóng tuyết, máy giặt báo lỗi E1 | Khối `<details>` lỗi thường gặp, FAQ |
| Thương hiệu | điện lạnh thái tuấn | Title, footer, schema `name` |

### 7.2 Metadata (`app/layout.tsx` + `page.tsx`)
```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://<TEN_MIEN>'),
  title: 'Sửa Máy Lạnh, Tủ Lạnh, Máy Giặt Tại Nhà TP.HCM | Điện Lạnh Thái Tuấn',
  description:
    'Sửa chữa & vệ sinh máy lạnh, tủ lạnh, máy giặt tại nhà TP.HCM. Thợ có mặt sau 30 phút, ' +
    'miễn phí kiểm tra, báo giá trước khi sửa, bảo hành đến 12 tháng. Gọi 0978 072 221.',
  keywords: ['sửa máy lạnh tại nhà', 'sửa tủ lạnh', 'sửa máy giặt', 'vệ sinh máy lạnh', 'điện lạnh TP.HCM'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website', locale: 'vi_VN', url: '/',
    siteName: 'Điện Lạnh Thái Tuấn',
    title: 'Sửa Máy Lạnh, Tủ Lạnh, Máy Giặt Tại Nhà TP.HCM — Thợ đến sau 30 phút',
    description: 'Miễn phí kiểm tra · Báo giá trước khi sửa · Bảo hành đến 12 tháng · 8:00–21:00 mỗi ngày.',
    images: ['/opengraph-image'],   // sinh động bằng next/og — không cần file ảnh
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
}
```
Quy tắc: title ≤ 60 ký tự hiển thị · description 150–160 ký tự · canonical tuyệt đối · `lang="vi"` trên `<html>`.

### 7.3 Dữ liệu có cấu trúc (JSON-LD)
Render phía server, không chèn bằng JS client.

| Schema | Nội dung |
|---|---|
| `HVACBusiness` (kế thừa `LocalBusiness`) | `name`, `telephone` (cả 2 số), `email`, `address` (PostalAddress đầy đủ), `openingHoursSpecification` Mo–Su 08:00–21:00, `areaServed` (20 quận/huyện), `priceRange: "150.000đ - 2.200.000đ"`, `url`, `sameAs: [zalo.me/...]`, `logo` |
| `Service` × 8 | `serviceType`, `provider` (`@id` trỏ LocalBusiness), `areaServed`, `offers.priceSpecification` (bỏ `offers` cho dịch vụ 7 — không có giá) |
| `FAQPage` | 6 cặp Question/Answer khớp **nguyên văn** nội dung hiển thị |
| `WebSite` + `Organization` | Định danh site |
| `BreadcrumbList` | Cho `/chinh-sach-bao-mat` |
| ❌ `AggregateRating` / `Review` | **Không dùng** — không có đánh giá thật (C-01). Đánh dấu schema cho đánh giá không tồn tại có thể bị Google phạt thủ công. |
| ❌ `geo` (toạ độ) | **Không dùng** — chưa có Google Maps để lấy toạ độ chính xác (C-06). Địa chỉ chữ vẫn đủ để Google hiểu vị trí. |

### 7.4 SEO kỹ thuật — checklist
- [ ] `app/sitemap.ts` sinh `sitemap.xml` (có `lastModified`, `priority`)
- [ ] `app/robots.ts` — allow all, trỏ sitemap, chặn `/api/`
- [ ] `favicon.ico`, `icon.png` 512×512, `apple-icon.png` 180×180, `manifest.webmanifest` — tất cả sinh từ logo SVG
- [ ] `opengraph-image.tsx` dùng `next/og` (ImageResponse) — không cần file ảnh thiết kế sẵn
- [ ] Toàn trang SSG (`export const dynamic = 'force-static'`)
- [ ] Heading đúng cấp: 1 × `<h1>` → `<h2>` mỗi section → `<h3>` mỗi thẻ, không nhảy bậc
- [ ] Thẻ ngữ nghĩa: `<header> <nav> <main> <section aria-labelledby> <article> <table> <footer>`
- [ ] Mọi `<svg>` trang trí có `aria-hidden="true"`; SVG mang nghĩa có `<title>`
- [ ] **Không còn bất kỳ `href="#"` nào** — mọi link trỏ thật hoặc chuyển thành `<button>`
- [ ] HTTPS + chuyển hướng 301 thống nhất `non-www` ↔ `www`
- [ ] Trang 404 tuỳ biến có link về trang chủ + hotline
- [ ] Xem mã nguồn: thấy đầy đủ H1, dịch vụ, bảng giá, FAQ **trong HTML tĩnh**

### 7.5 Hiệu năng
- Font tự host qua `next/font` — 0 request domain ngoài.
- **Không ảnh chụp** (§4.4) ⇒ không cần tối ưu ảnh, LCP là khối chữ.
- Không thư viện UI/animation. Ngân sách JS client: **< 70KB gzip** (hạ từ 90KB nhờ bỏ carousel đánh giá và lightbox ảnh).
- Tổng dung lượng trang mục tiêu: **< 250KB**.
- `'use client'` chỉ ở: form đặt lịch, menu mobile, nút cuộn lên đầu. Còn lại là Server Component.
- Không script bên thứ ba ở bản go-live (C-14).
- Mọi khối có kích thước xác định ⇒ CLS ≈ 0.
- Bật Brotli + cache header dài cho tài nguyên tĩnh.

---

## 8. KIẾN TRÚC KỸ THUẬT

### 8.1 Công nghệ
| Lớp | Lựa chọn | Lý do |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSG + metadata API + `next/og` + `next/font` |
| Ngôn ngữ | TypeScript (strict) | An toàn kiểu cho lớp nội dung |
| Style | Tailwind CSS + CSS variables | Đổi tông màu tập trung một chỗ |
| Form | react-hook-form + zod | Schema dùng chung client & server |
| Lưu lead | Google Apps Script → Google Sheet | §6 |
| Triển khai | Vercel | CDN, HTTPS tự động, biến môi trường sẵn |

### 8.2 Cấu trúc thư mục
```
app/
  layout.tsx                    # metadata gốc, font, JSON-LD Organization
  page.tsx                      # landing (Server Component)
  opengraph-image.tsx           # sinh ảnh OG bằng next/og
  icon.tsx                      # sinh favicon
  sitemap.ts   robots.ts
  chinh-sach-bao-mat/page.tsx
  api/booking/route.ts          # nhận form → Apps Script
components/
  layout/    Header.tsx  Footer.tsx  MobileCtaBar.tsx  FloatingCall.tsx
  sections/  Hero.tsx  QuickPromises.tsx  BrandMarquee.tsx  Services.tsx
             Commitments.tsx  Process.tsx  PriceTable.tsx  ServiceAreas.tsx
             Faq.tsx  FinalCta.tsx
  ui/        Button.tsx  Card.tsx  Badge.tsx  SectionHeading.tsx  Logo.tsx
  icons/     ServiceIcons.tsx          # SVG tự vẽ cho 8 dịch vụ
  form/      BookingForm.tsx  fields/*
content/
  site.ts        # NAP, hotline, Zalo, giờ làm việc  ← nguồn sự thật duy nhất
  services.ts    # 8 dịch vụ
  pricing.ts     # 10 dòng bảng giá
  faq.ts  commitments.ts  process.ts  areas.ts  brands.ts
lib/
  schema.ts      # sinh JSON-LD
  validation.ts  # zod dùng chung
  format.ts      # định dạng SĐT, tiền
  rate-limit.ts
```
❌ Không có `components/sections/Testimonials.tsx`, `content/testimonials.ts`, `public/images/` — đã cắt theo C-01, C-04.

### 8.3 Nguyên tắc code
- **Mọi văn bản, số điện thoại, giá nằm trong `content/*.ts`** — không hardcode trong JSX. Đổi hotline chỉ sửa 1 chỗ.
- SĐT lưu chuẩn (`0978072221`); `format.ts` sinh bản hiển thị (`0978 072 221`) và bản `tel:` (`+84978072221`).
- Dữ liệu bất biến — không mutate mảng/object nội dung.
- Mỗi file component ≤ 300 dòng.

---

## 9. YÊU CẦU PHI CHỨC NĂNG

| Mã | Yêu cầu | Ngưỡng |
|---|---|---|
| NFR-01 | Trình duyệt | Chrome/Edge/Safari/Firefox 2 phiên bản gần nhất; Safari iOS 15+; Chrome Android |
| NFR-02 | Đáp ứng | 320px – 2560px, không cuộn ngang ở mọi breakpoint |
| NFR-03 | Trợ năng | WCAG 2.1 AA: điều hướng bàn phím đầy đủ, focus ring rõ, `aria-label` cho nút icon, vùng chạm ≥ 44×44px, link "Bỏ qua tới nội dung chính" |
| NFR-04 | Bảo mật | HTTPS; header `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, CSP; không lộ khoá ở client; rate limit API |
| NFR-05 | Quyền riêng tư | Trang chính sách bảo mật; nêu rõ mục đích dùng dữ liệu; tuân thủ NĐ 13/2023 |
| NFR-06 | Bảo trì | Sửa nội dung chỉ cần sửa `content/*.ts`; README hướng dẫn kèm hướng dẫn dùng Google Sheet |
| NFR-07 | Uptime | ≥ 99.9% |
| NFR-08 | Chống spam | Honeypot + rate limit; bật Cloudflare Turnstile nếu bị spam (không dùng reCAPTCHA v2 — chậm, hại CWV) |

---

## 10. ĐO LƯỜNG

Khách chưa có GA4 / Pixel / GTM (C-14) ⇒ **bản go-live không nhúng script theo dõi nào**. Code chừa sẵn `lib/analytics.ts` với hàm `track(event, params)` hiện đang **no-op**; khi khách cung cấp mã chỉ cần thêm biến môi trường và bật `next/script` với `strategy="afterInteractive"`.

Danh sách sự kiện đã cắm sẵn điểm gọi:

| Sự kiện | Trigger |
|---|---|
| `click_call` | Bấm bất kỳ link `tel:` (kèm tham số vị trí nút) |
| `click_zalo` | Bấm nút Zalo |
| `form_start` | Focus lần đầu vào form |
| `generate_lead` | Gửi form thành công |
| `view_pricing` | Bảng giá hiển thị ≥ 50% |
| `faq_open` | Mở một câu hỏi |

**Đo lường tạm thời không cần script:** cột "Nguồn" và "Thời gian" trong Google Sheet đã đủ để khách biết lead đến từ đâu và vào giờ nào.

---

## 11. VIỆC CẦN KHÁCH LÀM (chỉ còn 2 mục)

| # | Việc | Mức | Ghi chú |
|---|---|---|---|
| **A-01** | **Mua tên miền** | 🔴 Bắt buộc — không có thì không lên web được | Đề xuất `dienlanhthaituan.vn` hoặc `.com`. Bên phát triển hỗ trợ mua & trỏ DNS nếu khách uỷ quyền |
| **A-02** | **Tạo Google Sheet + cấp quyền** | 🔴 Bắt buộc cho form | Bên phát triển hướng dẫn từng bước (5 phút): tạo Sheet → dán mã Apps Script (§6.5) → Deploy → gửi lại URL |

**Khuyến nghị thêm (không chặn go-live):**
| # | Việc | Vì sao nên làm |
|---|---|---|
| K-01 | Tạo & xác minh **Google Business Profile** | Quyết định thứ hạng trên Google Maps — kênh khách gọi nhiều nhất cho ngành này |
| K-02 | Chụp **6 ảnh** bằng điện thoại (hướng dẫn ở Phụ lục B) | Tăng rõ rệt tỉ lệ chuyển đổi; bổ sung vào 3 vị trí đã chừa sẵn |
| K-03 | Xin **đánh giá thật** từ khách đã sửa | Mở lại khối đánh giá đã cắt (C-01) |
| K-04 | Tạo **GA4 + Facebook Pixel** | Bật đo lường (§10) |
| K-05 | Email theo tên miền | Chuyên nghiệp hơn Gmail cá nhân |
| K-06 | Bổ sung **giá nhóm gia dụng** (bếp từ, lò vi sóng, máy rửa chén, máy lọc nước) | Mở lại dòng giá đã cắt (C-17) |

---

## 12. RỦI RO

| Mã | Rủi ro | Mức | Xử lý |
|---|---|---|---|
| RISK-01 | ~~Đăng đánh giá & số liệu giả~~ | ~~Cao~~ | ✅ **Đã triệt tiêu** — cắt toàn bộ C-01, C-02, C-03 |
| RISK-02 | Chưa có Google Business Profile ⇒ gần như không lên được Map Pack | **Cao** | K-01 — làm song song với dựng web |
| RISK-03 | Không có ảnh thật ⇒ giảm tỉ lệ chuyển đổi | Trung bình | Giảm nhẹ bằng thiết kế đồ hoạ chỉn chu (§4.4); khuyến nghị K-02 |
| RISK-04 | Dùng logo các hãng ⇒ rủi ro nhãn hiệu | Trung bình | Chỉ dùng chữ, không dùng logo (§5.4) |
| RISK-05 | Apps Script bị lỗi/quota ⇒ mất lead | Trung bình | Nếu POST thất bại, hiển thị ngay hotline + ghi log server; hạn mức Apps Script (20.000 lượt/ngày) vượt xa nhu cầu |
| RISK-06 | Tên miền mới ⇒ mất 3–6 tháng mới lên hạng tự nhiên | Trung bình | Kết hợp Google Ads giai đoạn đầu; tập trung Local SEO |
| RISK-07 | Giá công khai giúp đối thủ tham chiếu | Thấp | Chấp nhận — minh bạch giá là lợi thế chuyển đổi lớn hơn |

---

## 13. TIÊU CHÍ NGHIỆM THU

### 13.1 Nội dung
- [ ] Không còn số điện thoại demo `0912 345 678` ở bất kỳ đâu
- [ ] Không còn nhãn "NỘI DUNG DEMO" và ghi chú demo trong mã nguồn
- [ ] Không còn ô ảnh trống (placeholder) nào trên trang
- [ ] **Đã cắt đủ 18 hạng mục ở §2.1** — kiểm tra từng dòng
- [ ] Bảng giá đúng 10 dòng (§5.8)
- [ ] 8 thẻ dịch vụ · 5 cam kết · 4 bước quy trình · 6 FAQ · 20 quận/huyện
- [ ] Không còn link `href="#"`

### 13.2 Chức năng
- [ ] Mọi nút gọi mở được ứng dụng điện thoại trên thiết bị thật
- [ ] Nút Zalo mở đúng cửa sổ chat `zalo.me/0978072221`
- [ ] **Gửi form thử → xuất hiện đúng 1 dòng mới trong Google Sheet với đủ 10 cột**
- [ ] **Email thông báo về Gmail khách trong vòng 1 phút, bấm được số điện thoại trong email**
- [ ] Số điện thoại trong Sheet giữ nguyên số `0` đầu (không bị cắt thành `978072221`)
- [ ] Form chặn được SĐT sai định dạng
- [ ] Bot honeypot bị loại, không ghi vào Sheet
- [ ] Gửi 6 lần liên tiếp → lần thứ 6 bị rate limit chặn
- [ ] Khi Apps Script lỗi → hiện thông báo lỗi kèm hotline, không crash
- [ ] Menu mobile, accordion FAQ, dải hãng chạy ngang hoạt động ổn định
- [ ] Thanh CTA đáy không che nội dung; an toàn vùng notch iPhone

### 13.3 SEO
- [ ] Lighthouse SEO = **100**
- [ ] Rich Results Test: `HVACBusiness`, `Service`, `FAQPage` hợp lệ, **0 lỗi 0 cảnh báo**
- [ ] Xác nhận **không có** schema `Review` / `AggregateRating` nào trong mã nguồn
- [ ] `sitemap.xml`, `robots.txt` truy cập được; sitemap khai trong robots
- [ ] Canonical đúng trên mọi trang
- [ ] View Source thấy đầy đủ H1, dịch vụ, bảng giá, FAQ trong HTML
- [ ] Đúng 1 `<h1>`; heading không nhảy bậc
- [ ] Dán link vào Zalo & Facebook → hiện đúng ảnh OG sinh động
- [ ] Đã nộp sitemap lên Google Search Console

### 13.4 Hiệu năng & trợ năng
- [ ] Lighthouse mobile: Performance ≥ 97, A11y ≥ 95, Best Practices ≥ 95
- [ ] LCP < 1.8s · INP < 200ms · CLS < 0.05
- [ ] JS client < 70KB gzip · tổng trang < 250KB
- [ ] Duyệt toàn trang chỉ bằng bàn phím
- [ ] Kiểm tra thật trên iPhone Safari, Android Chrome, desktop Chrome

---

## 14. KẾ HOẠCH TRIỂN KHAI

| GĐ | Nội dung | Phụ thuộc | Ước lượng |
|---|---|---|---|
| P0 | Khởi tạo Next.js, Tailwind, token màu xanh lạnh, font, layout, logo SVG | — | 0.5 ngày |
| P1 | Lớp nội dung `content/*` — nhập toàn bộ dữ liệu thật từ BA này | BA duyệt | 0.5 ngày |
| P2 | Header, Hero, Dải cam kết, Marquee, Footer, CTA nổi | P0, P1 | 1 ngày |
| P3 | Services (8 icon SVG), Commitments, Process, PriceTable, ServiceAreas, FAQ | P1 | 1.5 ngày |
| P4 | Form + `/api/booking` + Apps Script + Sheet + email + chống spam | **A-02** | 1 ngày |
| P5 | SEO: metadata, JSON-LD, sitemap, robots, `next/og`, favicon, trang bảo mật | A-01 | 1 ngày |
| P6 | Tối ưu hiệu năng, trợ năng, kiểm thử đa thiết bị | P2–P5 | 0.5 ngày |
| P7 | Deploy, cấu hình tên miền + HTTPS | A-01 | 0.5 ngày |
| P8 | Search Console, bàn giao + hướng dẫn dùng Sheet | P7 | 0.5 ngày |
| | **Tổng (không tính thời gian chờ khách)** | | **~7 ngày công** |

> **Đường găng:** A-01 (tên miền) quyết định ngày go-live. A-02 (Sheet) chỉ mất 5 phút của khách nhưng chặn P4 — nên làm ngay ngày đầu.
>
> Việc cắt bỏ ảnh, đánh giá và analytics **rút ngắn** khối lượng so với v1.0 nhưng thời gian tổng giữ nguyên, phần dôi ra dồn vào chất lượng đồ hoạ SVG (§4.4) — đây là thứ thay thế cho ảnh thật.

---

## 15. ĐỀ XUẤT GIAI ĐOẠN 2

1. **Bổ sung ảnh thật** vào 3 vị trí đã chừa sẵn (nền hero, dải ảnh công việc, ảnh OG) — không cần đổi cấu trúc.
2. **Mở lại khối đánh giá** khi có đánh giá thật từ Google Maps, kèm schema `AggregateRating` hợp lệ.
3. **Trang dịch vụ riêng** (`/sua-may-lanh`, `/ve-sinh-may-lanh`…) — mỗi trang 800–1.200 từ, khi có đủ nội dung và ảnh.
4. **Trang theo khu vực** (`/sua-may-lanh-quan-tan-phu`…) — chỉ làm khi mỗi trang có nội dung thực sự khác biệt, tránh thin content.
5. **Blog kỹ thuật** — "máy lạnh chảy nước phải làm sao", "máy giặt báo lỗi E1", "bao lâu vệ sinh máy lạnh một lần". Nguồn traffic tự nhiên bền vững nhất.
6. **Tự động hoá từ Google Sheet** — Apps Script gửi tin nhắn xin đánh giá sau khi đổi trạng thái sang "Hoàn thành".
7. **Zalo OA + chatbot** trả lời ngoài giờ.

---

## PHỤ LỤC A — ĐỐI CHIẾU PHIẾU THU THẬP ↔ BA

| Mục phiếu | Trạng thái | Xử lý |
|---|---|---|
| 1. Thông tin doanh nghiệp | Đủ phần chữ | §5.11 — cắt MST, Maps, Fanpage, chi nhánh (C-06→C-09) |
| 2. Hero | Đủ | §5.2 — cắt dòng đánh giá (C-02) |
| 3. Form đặt lịch | **Đã chốt Google Sheet** ✅ | §6 |
| 4. Con số uy tín | 2/4 là số bịa | §5.3 — rút còn 3 ô cam kết thật (C-02, C-03) |
| 5. Dải hãng | Đủ | §5.4 |
| 6. Khối dịch vụ | Đủ, mở rộng 6→8 | §5.5 — cắt giá nhóm gia dụng (C-17) |
| 7. Cam kết | Trùng mục 06 | §5.6 — còn 5 mục (C-11) |
| 8. Quy trình | Đủ | §5.7 |
| 9. Bảng giá | **Đã chốt** ✅ | §5.8 — cắt ghi chú phí (C-13) |
| 10. Khu vực | Đủ phần chữ | §5.9 — cắt ảnh bản đồ (C-05) |
| 11. Đánh giá | Không có | ❌ **Cắt cả khối (C-01)** |
| 12. FAQ | Đủ 6 câu | §5.10 |
| 13. CTA & Footer | Đủ | §5.11 — cắt trang bảo hành (C-10) |
| 14. Hình ảnh & logo | **Không có gì** | ❌ **Cắt (C-04)** ⇒ thiết kế không ảnh (§4.4) |
| 15. Màu sắc | Đổi đỏ → **xanh lạnh** | §4.1 — cắt slogan (C-12) |
| 16. Kỹ thuật & tích hợp | Chỉ thiếu tên miền | A-01; cắt GA/Pixel/GTM/OA/tiếng Anh (C-14→C-16) |
| 18. Checklist bàn giao | Đã tích hợp | §13 |

---

## PHỤ LỤC B — HƯỚNG DẪN CHỤP ẢNH (gửi kèm khi khách sẵn sàng làm K-02)

- Chụp **ngang**, ánh sáng tự nhiên, gửi **file gốc** (Zalo chọn "Gửi file gốc", không nén).
- 6 cảnh cần có:
  1. Thợ mặc đồng phục đang vệ sinh máy lạnh treo tường
  2. Thợ đang kiểm tra tủ lạnh / máy giặt tại nhà khách
  3. Cận cảnh đồng hồ đo gas / dụng cụ chuyên dụng
  4. Xe hoặc thùng đồ nghề có tên thương hiệu
  5. Khu vực làm việc đã dọn sạch sau khi sửa xong
  6. Ảnh chân dung đội thợ
- Không chụp lộ mặt khách hàng khi chưa xin phép.

---

## PHỤ LỤC C — HƯỚNG DẪN KHÁCH TẠO GOOGLE SHEET (việc A-02, ~5 phút)

1. Vào [sheets.new](https://sheets.new) → đặt tên **"Đặt lịch — Điện Lạnh Thái Tuấn"**.
2. Đổi tên tab dưới cùng từ `Sheet1` thành **`Leads`**.
3. Menu **Tiện ích mở rộng → Apps Script**.
4. Xoá hết code có sẵn, dán đoạn mã ở **§6.5** vào.
5. Sửa dòng `const SECRET = '...'` thành một chuỗi bí mật bất kỳ (vd. `TT2026dienlanh#88`) và **gửi chuỗi này cho bên phát triển**.
6. Bấm **Deploy → New deployment** → chọn loại **Web app**:
   - *Execute as:* **Me**
   - *Who has access:* **Anyone**
7. Bấm **Deploy** → cấp quyền khi Google hỏi → **copy đường link Web app URL** và gửi cho bên phát triển.
8. Xong. Từ đó mọi yêu cầu đặt lịch tự chảy vào Sheet, đồng thời có email báo về Gmail.

> Sheet nằm trong Google Drive của khách — bên phát triển **không** có quyền truy cập dữ liệu khách hàng.

---

*Hết tài liệu — Phiên bản 1.1. Mọi thay đổi nội dung sau khi duyệt cần cập nhật vào tài liệu này trước khi sửa mã nguồn.*


---

## 16. TRẠNG THÁI TRIỂN KHAI (cập nhật v1.2)

### 16.1 Đã hoàn thành
| Hạng mục | Trạng thái |
|---|---|
| Dự án Next.js 15 + TypeScript + Tailwind v4 | ✅ Build sạch, toàn bộ trang SSG |
| 12 khối nội dung + form đặt lịch | ✅ |
| Lớp `content/` — sửa nội dung không cần lập trình viên | ✅ 10 file |
| Xử lý 17 ảnh thật → 21 ảnh web (crop, duotone, WebP, blur) | ✅ 5.2 MB |
| Tách logo, sinh favicon + ảnh Open Graph | ✅ |
| API `/api/booking` → Google Sheet + honeypot + rate limit + chống CSRF | ✅ Đã test 6 kịch bản |
| JSON-LD: HVACBusiness, WebSite, 8× Service, FAQPage | ✅ 11 node, **không có Review giả** |
| sitemap.xml · robots.txt · manifest · trang bảo mật · trang 404 | ✅ |
| Kiểm tra tràn ngang 320 → 1440px | ✅ Sạch ở cả 8 breakpoint |

### 16.2 Chỉ số đo được
| Chỉ số | Mục tiêu BA | Thực tế |
|---|---|---|
| JS riêng của trang | — | **8.61 kB** |
| First Load JS | < 70 kB (riêng trang) | **119 kB tổng**, trong đó 102 kB là React 19 + Next runtime (mức sàn) |
| Ảnh thiếu `alt` | 0 | **0 / 21** |
| SVG thiếu `aria-hidden` | 0 | **0 / 125** |
| Thẻ `<h1>` | đúng 1 | **1** |
| Link `href="#"` | 0 | **0** |
| Số điện thoại demo còn sót | 0 | **0** |
| Tràn ngang | không | **không, 320–1440px** |

> Ghi chú về ngân sách JS: mục tiêu "< 70 kB" ở v1.1 đặt cho phần JS riêng của trang. Con số thực tế **8.61 kB** vượt xa mục tiêu, đạt được bằng cách bỏ `react-hook-form` và `zod` khỏi bundle trình duyệt — quy tắc kiểm tra form được tách ra `lib/booking-rules.ts` viết bằng JS thuần, dùng chung cho cả client lẫn server. 102 kB còn lại là mức sàn của React 19 + Next runtime, không cắt được nếu vẫn dùng Next.js.

### 16.3 Còn lại cần khách làm
| # | Việc | Chặn? |
|---|---|---|
| A-01 | **Mua tên miền** rồi điền vào `NEXT_PUBLIC_SITE_URL` | 🔴 Chặn go-live |
| A-02 | **Tạo Google Sheet + Apps Script** (hướng dẫn 8 bước ở Phụ lục C, ~5 phút) | 🔴 Chặn form |
| K-01 | Tạo & xác minh **Google Business Profile** | Không chặn, nhưng quan trọng nhất cho thứ hạng Maps |
| K-03 | Xin **đánh giá thật** để mở lại khối đánh giá | Không chặn |
| K-04 | Tạo **GA4 / Facebook Pixel** để bật đo lường | Không chặn |
| K-06 | Bổ sung **giá nhóm gia dụng** (bếp từ, lò vi sóng, máy rửa chén, máy lọc nước) | Không chặn |
