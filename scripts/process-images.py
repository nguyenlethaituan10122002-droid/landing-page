#!/usr/bin/env python3
"""
Xu ly toan bo anh goc trong /img -> /public/images
- Crop dung ti le cho tung vi tri su dung
- Tang contrast nhe + phu duotone xanh lanh cho dong bo thuong hieu
- Xuat WebP chat luong cao + sinh blurDataURL (base64) cho next/image
- Sinh manifest JSON de tang content/ import
"""
import base64, io, json, os
from PIL import Image, ImageEnhance, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(ROOT, "img")
OUT  = os.path.join(ROOT, "public", "images")

# Tong xanh lanh cua thuong hieu — dung de phu duotone
TINT       = (14, 58, 99)   # #0E3A63
TINT_ALPHA = 0.13           # 13% — du de dong bo, van giu ve that cua anh
CONTRAST   = 1.09
SATURATE   = 1.06

# Anh goc theo so thu tu tren contact sheet
FILES = {
     1: "2aOboQs60mMkB7BVPSyFGBYyodNsxZ8ocPpnvljs.jpg",
     2: "2aOboQs60moPAN0lGrAvNnzs4f23Y2OnQmCow2oC.jpg",
     3: "2aOboQs60mxLnhhC2CSTqes465QtZ9vbLP8mnCu8.jpg",
     4: "2aOboQs60nJHd036PH3Gj4x4l8AOaINhn8dHIHq4.jpg",
     5: "2aOboQs60q0VOp8lgGFSTeDZB3MpQDcQhIylPztI.jpg",
     6: "2aOboQs60qW0mbFAs06rKJKkUNhb4nD3oj8sqqTg.jpg",
     7: "2aOboQs60r7poewc6Ah15EEmBK3gUbPFXqL3DPjE.jpg",
     8: "2aOboQs60rPB1p8AZx1SCDAj5NVEOcnABUBu73w0.jpg",
     9: "2aOboQs60t0x9FcBazjFrMajDAOqoYW9ZkiHkjLM.jpg",
    10: "2aOboQs60tZTqIDmXitMhyp9PINPwcFNlbdGfROi.jpg",
    11: "2aOboQs60uh2r3ftysa4NaeHKZfOCgrZ6AIKmyKu.jpg",
    12: "2aOboQs60XjDyc1EwcDc9ungS3PtOLf4GBsiBSPQ.jpg",
    13: "2aOboQs63f3QPTfRa03LuKOolkTZhK4rTgauLIDw.jpg",
    14: "2aOboQs63fZRPw0mJRHEjNSPazMT5IyrakfRMEtM.jpg",
    15: "2aOboQs63g13yMtefcbj0f5WeiRRrNPfTbsJ2jPU.jpg",
    16: "2aOboQs646nz5yd8RgqbPCOL6t4YH7l1bm1mzZOi.jpg",
    17: "2aOboQsJq3QbROmVxQfjwtrX14sVQJLJ8BoG8Tx2.jpg",  # logo
}

# (khoa, so anh goc, rong, cao, tam crop doc 0..1, alt)
JOBS = [
    # --- HERO: tho mac dong phuc dang ve sinh dan lanh ngoai troi ---
    ("hero", 13, 1920, 1280, 0.46,
     "Kỹ thuật viên Điện Lạnh Thái Tuấn đang vệ sinh dàn lạnh máy lạnh bằng máy xịt áp lực"),
    ("hero-portrait", 12, 900, 1200, 0.42,
     "Thợ điện lạnh mặc đồng phục xịt rửa dàn lạnh máy lạnh tại nhà khách"),

    # --- TRUOC / SAU: hai cap vệ sinh máy giặt ---
    ("ba-1-before", 4, 900, 900, 0.50,
     "Lồng giặt bám đầy cặn bẩn và mảng đen trước khi vệ sinh"),
    ("ba-1-after",  9, 900, 900, 0.50,
     "Lồng giặt trắng sạch hoàn toàn sau khi tháo lồng vệ sinh"),
    ("ba-2-before", 2, 900, 900, 0.45,
     "Thùng giặt ngoài đóng mảng bám dày trước khi xử lý"),
    ("ba-2-after",  7, 900, 900, 0.50,
     "Thùng giặt sạch sẽ sau khi vệ sinh bằng máy áp lực"),

    # --- QUY TRINH 4 BUOC ---
    ("process-1", 5,  1200, 900, 0.55,
     "Trải bạt bảo vệ sàn và sắp dụng cụ chuyên dụng trước khi thi công"),
    ("process-2", 12, 1200, 900, 0.45,
     "Kỹ thuật viên có mặt tại nhà và bắt đầu kiểm tra thiết bị"),
    ("process-3", 14, 1200, 900, 0.50,
     "Tháo dàn lạnh kiểm tra chi tiết để xác định nguyên nhân và báo giá"),
    ("process-4", 3,  1200, 900, 0.50,
     "Hoàn tất công việc, dọn dẹp sạch sẽ khu vực trước khi bàn giao"),

    # --- GALLERY: cong viec thuc te (doc 3:4) ---
    ("g-01", 1,  750, 1000, 0.50, "Tháo rời lồng giặt và mâm giặt để vệ sinh chi tiết"),
    ("g-02", 6,  750, 1000, 0.50, "Tháo máy giặt cửa trên, sắp xếp linh kiện gọn gàng trên bạt"),
    ("g-03", 8,  750, 1000, 0.50, "Lồng giặt inox đang trong quá trình xử lý mảng bám"),
    ("g-04", 10, 750, 1000, 0.50, "Lồng giặt inox sau khi được làm sạch hoàn toàn"),
    ("g-05", 11, 750, 1000, 0.50, "Máy giặt cửa ngang các hãng nhận sửa chữa tại nhà"),
    ("g-06", 15, 750, 1000, 0.50, "Dàn lạnh được tháo rời để vệ sinh sâu từng bộ phận"),
    ("g-07", 16, 750, 1000, 0.42, "Kỹ thuật viên kiểm tra bo mạch và hệ thống làm lạnh của tủ lạnh"),
    ("g-08", 13, 750, 1000, 0.50, "Thi công vệ sinh máy lạnh tận nơi, gọn gàng không ảnh hưởng sinh hoạt"),

    # --- ANH DUNG TRONG THE DICH VU (phu, ti le 4:3) ---
    ("sv-aircon", 15, 1000, 750, 0.50, "Vệ sinh và sửa chữa dàn lạnh máy lạnh mọi thương hiệu"),
    ("sv-fridge", 16, 1000, 750, 0.40, "Sửa tủ lạnh tại nhà, kiểm tra block và hệ thống gas"),
    ("sv-washer", 11, 1000, 750, 0.50, "Sửa và vệ sinh máy giặt cửa trên, cửa ngang tại nhà"),
]

def process(im: Image.Image, w: int, h: int, focus: float) -> Image.Image:
    """Crop theo ti le mong muon quanh diem focus doc, roi chinh mau."""
    src_ratio, dst_ratio = im.width / im.height, w / h
    if src_ratio > dst_ratio:                      # anh rong hon -> cat 2 ben
        nw = int(im.height * dst_ratio)
        left = (im.width - nw) // 2
        im = im.crop((left, 0, left + nw, im.height))
    else:                                          # anh cao hon -> cat tren/duoi quanh focus
        nh = int(im.width / dst_ratio)
        top = int((im.height - nh) * focus)
        top = max(0, min(top, im.height - nh))
        im = im.crop((0, top, im.width, top + nh))

    im = im.resize((w, h), Image.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(CONTRAST)
    im = ImageEnhance.Color(im).enhance(SATURATE)
    # Phu duotone xanh lanh de ca bo anh dong bo ve tong
    tint = Image.new("RGB", im.size, TINT)
    return Image.blend(im, tint, TINT_ALPHA)

def blur_data_url(im: Image.Image) -> str:
    tiny = im.copy()
    tiny.thumbnail((12, 12), Image.LANCZOS)
    buf = io.BytesIO()
    tiny.save(buf, "JPEG", quality=45)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()

os.makedirs(OUT, exist_ok=True)
manifest, total = {}, 0

for key, idx, w, h, focus, alt in JOBS:
    with Image.open(os.path.join(SRC, FILES[idx])) as raw:
        im = process(ImageOps.exif_transpose(raw).convert("RGB"), w, h, focus)
    path = os.path.join(OUT, f"{key}.webp")
    im.save(path, "WEBP", quality=82, method=6)
    size = os.path.getsize(path)
    total += size
    manifest[key] = {
        "src": f"/images/{key}.webp",
        "width": w, "height": h, "alt": alt,
        "blurDataURL": blur_data_url(im),
    }
    print(f"  {key:16s} {w:>4}x{h:<4} {size/1024:6.1f} KB   <- #{idx:02d}")

with open(os.path.join(OUT, "manifest.json"), "w", encoding="utf-8") as f:
    json.dump(manifest, f, ensure_ascii=False, indent=2)

print(f"\n  Tong: {len(JOBS)} anh, {total/1024/1024:.2f} MB")
