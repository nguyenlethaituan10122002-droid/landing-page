/**
 * Lop tuyet roi cho cac khoi nen toi.
 *
 * - Server Component: HTML sinh san khi build, KHONG ton mot dong JS nao o trinh duyet.
 * - Chi dung transform + opacity nen chay tren GPU, khong gay reflow.
 * - Vi tri/kich thuoc sinh bang bo sinh so ngau nhien CO HAT GIONG CO DINH
 *   -> moi lan build ra ket qua giong het nhau, khong lech giua server va client.
 * - Ba lop chieu sau (xa / giua / gan) tao cam giac khong gian that.
 */

/** Bo sinh so gia ngau nhien (LCG) — cung hat giong thi cung ket qua. */
function taoBoSinhSo(hatGiong: number) {
  let s = hatGiong
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296
    return s / 4294967296
  }
}

type Lop = {
  soLuong: number
  cỡMin: number
  cỡMax: number
  mờMin: number
  mờMax: number
  giâyMin: number
  giâyMax: number
  nhoè: number
}

const LOP: readonly Lop[] = [
  // Xa: nhieu, nho, mo, roi cham — tao lop nen
  { soLuong: 26, cỡMin: 2, cỡMax: 3.5, mờMin: 0.4, mờMax: 0.62, giâyMin: 21, giâyMax: 31, nhoè: 0 },
  // Giua
  { soLuong: 16, cỡMin: 4, cỡMax: 6, mờMin: 0.55, mờMax: 0.78, giâyMin: 14, giâyMax: 20, nhoè: 0.3 },
  // Gan: it, to, ro nhat — dung hinh hoa tuyet 6 canh, roi nhanh
  { soLuong: 9, cỡMin: 11, cỡMax: 20, mờMin: 0.5, mờMax: 0.8, giâyMin: 9, giâyMax: 15, nhoè: 0 },
]

/** So hat cua hai lop dau — tu chi so nay tro di la lop gan (hoa tuyet). */
const MOC_LOP_GAN = LOP[0].soLuong + LOP[1].soLuong
const MOC_LOP_GIUA = LOP[0].soLuong

type Hat = {
  trái: number
  cỡ: number
  mờ: number
  giây: number
  trễ: number
  dạt: number
  xoay: number
}

function sinhHat(hatGiong: number): Hat[] {
  const r = taoBoSinhSo(hatGiong)
  const out: Hat[] = []
  for (const l of LOP) {
    for (let i = 0; i < l.soLuong; i++) {
      const g = l.giâyMin + r() * (l.giâyMax - l.giâyMin)
      out.push({
        trái: Math.round(r() * 10000) / 100,
        cỡ: Math.round((l.cỡMin + r() * (l.cỡMax - l.cỡMin)) * 10) / 10,
        mờ: Math.round((l.mờMin + r() * (l.mờMax - l.mờMin)) * 100) / 100,
        giây: Math.round(g * 10) / 10,
        // Tre am: mot so hat da o giua man hinh ngay khi trang vua mo
        trễ: -Math.round(r() * g * 10) / 10,
        dạt: Math.round((r() * 120 - 60) * 10) / 10,
        xoay: Math.round((r() * 540 - 270) * 10) / 10,
      })
    }
  }
  return out
}

// Tinh mot lan khi build, dung lai cho moi lan render
const HAT_DAY = sinhHat(20260818)
const HAT_THUA = sinhHat(77771).filter((_, i) => i % 3 === 0)

export function Snowfall({ mậtĐộ = 'dày' }: { mậtĐộ?: 'dày' | 'thưa' }) {
  const hat = mậtĐộ === 'dày' ? HAT_DAY : HAT_THUA

  return (
    <div className="snow-layer" aria-hidden="true">
      {hat.map((h, i) => {
        const làHoaTuyết = i >= MOC_LOP_GAN
        const nhoè = i < MOC_LOP_GIUA ? 0 : làHoaTuyết ? 0 : 0.3
        return (
          <span
            key={i}
            className={làHoaTuyết ? 'snow-flake snow-star' : 'snow-flake'}
            style={
              {
                left: `${h.trái}%`,
                width: `${h.cỡ}px`,
                height: `${h.cỡ}px`,
                filter: nhoè ? `blur(${nhoè}px)` : undefined,
                '--o': h.mờ,
                '--dur': `${h.giây}s`,
                '--delay': `${h.trễ}s`,
                '--drift': `${h.dạt}px`,
                '--spin': `${h.xoay}deg`,
              } as React.CSSProperties
            }
          />
        )
      })}
    </div>
  )
}
