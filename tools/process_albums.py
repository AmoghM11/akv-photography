"""Turn the studio's Drive originals into web-ready, story-ordered album files.

usage: python -I process_akv.py <raw_dir> <site_photos_dir> <manifest.json> [<order.json>]

For each album folder in raw_dir:
  * sort frames by capture time (EXIF DateTimeOriginal + subseconds),
    or by an explicit order list if order.json names the album
  * honour EXIF orientation, convert to sRGB, strip metadata
  * write WebP renditions: 640w and 1080w for the grid, 2400px long edge
    for the lightbox
"""
import io
import json
import os
import sys
from concurrent.futures import ProcessPoolExecutor

from PIL import Image, ImageCms, ImageOps

WIDTHS = (640, 1080)
FULL_EDGE = 2400
Q_GRID = 80
Q_FULL = 86

SRGB = ImageCms.createProfile('sRGB')


def slugify(name):
    out = ''.join(ch.lower() if ch.isalnum() else '-' for ch in name.replace('&', 'and'))
    while '--' in out:
        out = out.replace('--', '-')
    return out.strip('-')


def captured(path):
    with Image.open(path) as im:
        ex = im.getexif()
        sub = ex.get_ifd(0x8769)
        t = sub.get(36867) or ex.get(306) or ''
        ss = str(sub.get(37521) or '0').strip().ljust(3, '0')
        cam = f"{ex.get(272, '')}"
        serial = str(sub.get(42033, ''))
    return f'{t}.{ss}', cam, serial


def to_srgb(im):
    icc = im.info.get('icc_profile')
    if im.mode not in ('RGB', 'L'):
        im = im.convert('RGB')
    if icc:
        try:
            src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
            desc = ImageCms.getProfileDescription(src).lower()
            if 'srgb' not in desc:
                im = ImageCms.profileToProfile(im, src, SRGB, outputMode='RGB')
        except Exception:
            pass
    return im.convert('RGB')


def render(job):
    src, out_dir, stem = job
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)
        im = to_srgb(im)
        w, h = im.size
        sizes = {}
        for tw in WIDTHS:
            tw = min(tw, w)
            th = round(h * tw / w)
            dst = os.path.join(out_dir, f'{stem}-{tw}.webp')
            im.resize((tw, th), Image.LANCZOS).save(dst, 'WEBP', quality=Q_GRID, method=6)
            sizes[tw] = os.path.getsize(dst)
        scale = min(1.0, FULL_EDGE / max(w, h))
        fw, fh = round(w * scale), round(h * scale)
        dst = os.path.join(out_dir, f'{stem}-full.webp')
        im.resize((fw, fh), Image.LANCZOS).save(dst, 'WEBP', quality=Q_FULL, method=6)
        sizes['full'] = os.path.getsize(dst)
    return stem, fw, fh, sizes


def main():
    raw, site_dir, manifest_path = sys.argv[1:4]
    order = json.load(open(sys.argv[4], encoding='utf-8')) if len(sys.argv) > 4 else {}
    manifest = {}
    jobs = []
    for root, _, files in os.walk(raw):
        # '._' files are macOS sidecars that ride along in Drive folders, not photos
        frames = [f for f in files if f.lower().endswith(('.jpg', '.jpeg', '.png')) and not f.startswith('._')]
        if not frames:
            continue
        album = os.path.relpath(root, raw).replace('\\', '/')
        slug = slugify(album)
        meta = {f: captured(os.path.join(root, f)) for f in frames}
        if album in order:
            seq = order[album]
            missing = set(frames) - set(seq)
            seq = seq + sorted(missing, key=lambda f: (meta[f][0], f))
        else:
            seq = sorted(frames, key=lambda f: (meta[f][0], f))
        out_dir = os.path.join(site_dir, slug)
        os.makedirs(out_dir, exist_ok=True)
        entries = []
        for i, f in enumerate(seq, 1):
            stem = f'{i:03d}-{os.path.splitext(f)[0].lower()}'
            entries.append({'file': f, 'stem': stem, 'taken': meta[f][0],
                            'camera': meta[f][1], 'serial': meta[f][2]})
            jobs.append((os.path.join(root, f), out_dir, stem))
        manifest[album] = {'slug': slug, 'frames': entries}

    with ProcessPoolExecutor() as pool:
        done = {stem: (w, h, s) for stem, w, h, s in pool.map(render, jobs)}

    for album in manifest.values():
        for e in album['frames']:
            w, h, s = done[e['stem']]
            e['w'], e['h'], e['bytes'] = w, h, s
    with open(manifest_path, 'w', encoding='utf-8') as fh:
        json.dump(manifest, fh, indent=1)
    total = sum(sum(v.values()) for _, _, v in done.values())
    print(f'{len(jobs)} frames, {total / 1e6:.1f} MB written')


if __name__ == '__main__':
    main()
