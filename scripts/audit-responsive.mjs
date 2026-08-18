/**
 * Kiem tra tran ngang o cac be rong thiet bi that, bang Chrome DevTools Protocol.
 * Dung Emulation.setDeviceMetricsOverride nen MEDIA QUERY doi theo dung nhu tren may that.
 *
 * Chay:  node --experimental-websocket scripts/audit-responsive.mjs <url> [outDir]
 */
const URL_ = process.argv[2] ?? 'http://localhost:3987'
const OUT = process.argv[3] ?? null

const WIDTHS = [320, 360, 390, 430, 768, 1024, 1280, 1440]

const list = await (await fetch('http://127.0.0.1:9222/json/list')).json()
const page = list.find((t) => t.type === 'page')
if (!page) throw new Error('Khong tim thay tab trong Chrome (can chay voi --remote-debugging-port=9222)')

const ws = new WebSocket(page.webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))

let id = 0
const pending = new Map()
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data)
  if (msg.id && pending.has(msg.id)) {
    const { resolve, reject } = pending.get(msg.id)
    pending.delete(msg.id)
    msg.error ? reject(new Error(JSON.stringify(msg.error))) : resolve(msg.result)
  }
}
const send = (method, params = {}) =>
  new Promise((resolve, reject) => {
    const i = ++id
    pending.set(i, { resolve, reject })
    ws.send(JSON.stringify({ id: i, method, params }))
  })

await send('Page.enable')
await send('Runtime.enable')

const DETECT = `(() => {
  const vw = document.documentElement.clientWidth;
  const out = [];
  document.querySelectorAll('body *').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return;
    if (r.right <= vw + 1 && r.left >= -1) return;
    let p = el.parentElement, clipped = false;
    while (p) {
      const s = getComputedStyle(p);
      if (s.overflowX === 'hidden' || s.overflow === 'hidden' || s.overflowX === 'clip') { clipped = true; break; }
      p = p.parentElement;
    }
    if (!clipped) out.push(el.tagName.toLowerCase() + ' .' + String(el.className).slice(0,64)
      + ' [' + Math.round(r.left) + '..' + Math.round(r.right) + ']');
  });
  return JSON.stringify({
    vw, sw: document.documentElement.scrollWidth,
    h: document.documentElement.scrollHeight,
    items: [...new Set(out)].slice(0, 8),
  });
})()`

let failures = 0
for (const w of WIDTHS) {
  const mobile = w < 768
  await send('Emulation.setDeviceMetricsOverride', {
    width: w, height: 900, deviceScaleFactor: 1, mobile,
    screenWidth: w, screenHeight: 900,
  })
  await send('Page.navigate', { url: URL_ })
  await new Promise((r) => setTimeout(r, 3500))
  // Cuon het trang de kich hoat lazy-load va reveal
  await send('Runtime.evaluate', {
    expression: `(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,55))}scrollTo(0,0)})()`,
    awaitPromise: true,
  })
  await new Promise((r) => setTimeout(r, 900))

  const { result } = await send('Runtime.evaluate', { expression: DETECT, returnByValue: true })
  const d = JSON.parse(result.value)
  const over = d.sw - d.vw
  const ok = over <= 1 && d.items.length === 0
  if (!ok) failures++
  console.log(`${String(w).padStart(4)}px  vw=${d.vw} sw=${d.sw} cao=${d.h}px  ${ok ? '✓ khong tran' : `✗ TRAN ${over}px`}`)
  d.items.forEach((i) => console.log('         ' + i))

  if (OUT) {
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true })
    const { writeFile } = await import('node:fs/promises')
    await writeFile(`${OUT}/w${w}.png`, Buffer.from(shot.data, 'base64'))
  }
}
console.log(failures === 0 ? '\nKET QUA: tat ca be rong deu khong tran ngang.' : `\nKET QUA: ${failures} be rong bi tran.`)
ws.close()
process.exit(failures === 0 ? 0 : 1)
