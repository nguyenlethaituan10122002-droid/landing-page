/**
 * Kiem tra webhook Google Sheet da hoat dong chua.
 *
 * Chay:  node scripts/test-sheet-webhook.mjs
 *
 * Doc URL + khoa bi mat tu .env.local, gui mot yeu cau THU vao Sheet,
 * roi bao ket qua. Sau khi chay, mo Sheet se thay 1 dong ten "KIEM TRA HE THONG".
 */
import { readFile } from 'node:fs/promises'

function docEnv(text) {
  const out = {}
  for (const line of text.split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m) out[m[1]] = m[2].trim()
  }
  return out
}

const env = docEnv(await readFile(new URL('../.env.local', import.meta.url), 'utf8'))
const url = env.GOOGLE_SHEET_WEBHOOK_URL
const secret = env.GOOGLE_SHEET_SECRET

console.log('\n  Kiem tra ket noi Google Sheet\n  ' + '-'.repeat(46))

if (!url) {
  console.log('  ✗ Chua co GOOGLE_SHEET_WEBHOOK_URL trong .env.local')
  console.log('    Lam theo docs/HUONG-DAN-GOOGLE-SHEET.md roi dan URL vao.\n')
  process.exit(1)
}
if (!secret) {
  console.log('  ✗ Chua co GOOGLE_SHEET_SECRET trong .env.local\n')
  process.exit(1)
}
console.log('  URL    :', url.slice(0, 62) + (url.length > 62 ? '…' : ''))
console.log('  Khoa   :', secret.slice(0, 10) + '…')

// 1) Deploy da chay chua
try {
  const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(15000) })
  const text = await res.text()
  if (text.includes('"ok":true')) {
    console.log('  ✓ Buoc 1/3 — Web App dang chay')
  } else if (text.includes('<html')) {
    console.log('  ✗ Buoc 1/3 — Google tra ve trang dang nhap.')
    console.log('    => Deploy chua dat "Who has access: Anyone". Vao Deploy > Manage deployments > sua lai.\n')
    process.exit(1)
  } else {
    console.log('  ? Buoc 1/3 — phan hoi la:', text.slice(0, 120))
  }
} catch (e) {
  console.log('  ✗ Buoc 1/3 — khong goi duoc URL:', e.message, '\n')
  process.exit(1)
}

// 2) Khoa bi mat co khop khong
const goi = (body) =>
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    redirect: 'follow',
    signal: AbortSignal.timeout(20000),
  }).then((r) => r.text())

const sai = await goi({ secret: 'khoa-sai-co-y', name: 'x' })
if (sai.includes('sai-khoa')) {
  console.log('  ✓ Buoc 2/3 — khoa bi mat dang duoc kiem tra dung')
} else {
  console.log('  ✗ Buoc 2/3 — Apps Script KHONG chan khoa sai. Kiem tra lai bien SECRET trong code.')
}

// 3) Ghi thu mot dong that
const ket = await goi({
  secret,
  name: 'KIEM TRA HE THONG',
  phone: '0978072221',
  service: 'Sửa máy lạnh',
  address: 'Dòng thử — có thể xoá',
  note: 'Dòng này do script kiểm tra tạo ra, xoá đi được.',
  source: 'test-script',
  device: 'Desktop',
})

if (ket.includes('"ok":true')) {
  console.log('  ✓ Buoc 3/3 — da ghi duoc mot dong vao Sheet')
  console.log('\n  HOAN TAT. Mo Google Sheet se thay dong "KIEM TRA HE THONG"')
  console.log('  va mot email thong bao trong hop thu. Xoa dong do di la xong.\n')
} else {
  console.log('  ✗ Buoc 3/3 — khong ghi duoc. Phan hoi:', ket.slice(0, 200), '\n')
  process.exit(1)
}
