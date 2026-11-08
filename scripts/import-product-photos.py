"""Download the reviewed Pexels photos listed in product-photo-sources.json.

The images are used as styling references for this sample storefront.
Source pages are retained in the JSON file for attribution and review.

Pexels' own CDN is happy to serve larger renditions, so the store keeps one
900x1200 rendition per product (crisp on retina cards and in the product
gallery's detail zoom) instead of the original 600x800 thumbnails.
"""
import concurrent.futures
import hashlib
import io
import json
from pathlib import Path

import requests
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SOURCES = json.loads((ROOT / 'src/data/product-photo-sources.json').read_text())
(ROOT / 'src/data/product-photo-slugs.json').write_text(json.dumps(list(SOURCES), indent=2) + '\n')
OUTPUT = ROOT / 'public/images/products/photos'
OUTPUT.mkdir(parents=True, exist_ok=True)

SOURCE_WIDTH = 1600
SIZE = (900, 1200)
QUALITY = 76
HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; MirraStorefront/1.0; photo import)'}


def download(item):
    slug, data = item
    url = f"{data['imageUrl']}?auto=compress&cs=tinysrgb&w={SOURCE_WIDTH}"
    response = requests.get(url, timeout=45, headers=HEADERS)
    response.raise_for_status()
    if not response.headers.get('content-type', '').startswith('image/'):
        raise ValueError(f'{slug}: expected an image')
    image = Image.open(io.BytesIO(response.content)).convert('RGB')
    if image.width < SIZE[0]:
        raise ValueError(f'{slug}: source only {image.size}, too small')
    image = ImageOps.fit(image, SIZE, method=Image.Resampling.LANCZOS)
    image.save(OUTPUT / f'{slug}.webp', format='WEBP', quality=QUALITY, method=6)
    return slug


with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    completed = list(pool.map(download, SOURCES.items()))

sizes = [(OUTPUT / f'{slug}.webp').stat().st_size for slug in completed]
total = sum(sizes)
print(f'Wrote {len(completed)} photos at {SIZE[0]}x{SIZE[1]}')
print(f'Total {total / 1048576:.2f} MB, average {total / len(sizes) / 1024:.0f} KB, largest {max(sizes) / 1024:.0f} KB')


# Guard: every product must get its own photo. Two products pointing at one
# Pexels frame (even via different URLs) reads as a listing mistake.
photo_ids = [data.get('photoId', '') for data in SOURCES.values()]
image_urls = [data['imageUrl'] for data in SOURCES.values()]
if len(set(photo_ids)) != len(photo_ids) or len(set(image_urls)) != len(image_urls):
    raise SystemExit('Two products share one Pexels source; give each its own photo')

hashes = {}
for slug in completed:
    digest = hashlib.sha256((OUTPUT / f'{slug}.webp').read_bytes()).hexdigest()
    if digest in hashes:
        raise SystemExit(f'Duplicate image: {slug} and {hashes[digest]} are identical')
    hashes[digest] = slug
print(f'Uniqueness: {len(hashes)} distinct files from {len(set(photo_ids))} distinct Pexels photos')

if total > 9.5 * 1048576:
    raise SystemExit('Asset budget exceeded: total is over 9.5 MB')
