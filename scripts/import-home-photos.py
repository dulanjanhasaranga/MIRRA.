"""Download the dedicated home-page Pexels photos listed in home-photo-sources.json.

These are deliberately separate from the 96 product photos: the hero collage and
the category tiles should never repeat a picture that already belongs to a
product listing. Source pages are kept in the JSON for attribution.
"""
import concurrent.futures
import hashlib
import io
import json
from pathlib import Path

import requests
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SOURCES = json.loads((ROOT / 'src/data/home-photo-sources.json').read_text())
PRODUCT_SOURCES = json.loads((ROOT / 'src/data/product-photo-sources.json').read_text())
OUTPUT = ROOT / 'public/images/home'
OUTPUT.mkdir(parents=True, exist_ok=True)

SOURCE_WIDTH = 1600
QUALITY = 78
HEADERS = {'User-Agent': 'Mozilla/5.0 (compatible; MirraStorefront/1.0; photo import)'}
SIZES = {
    'hero-1': (900, 1200),
    'hero-2': (900, 1125),
    'hero-3': (900, 1125),
    'banner-edit': (1200, 900),
    'banner-accessories': (1200, 900),
    'about-hero': (1600, 900),
}
# Where to crop vertically when the source aspect differs: favour the head of
# the frame on portrait sources so full-body shots keep the subject's face.
CENTERING = {
    'banner-edit': (0.5, 0.28),
    'banner-accessories': (0.5, 0.45),
    # Portrait source: drop to the racks rather than crop the ceiling.
    'about-hero': (0.5, 0.55),
}
DEFAULT_SIZE = (900, 1200)


def download(item):
    key, data = item
    url = f"{data['imageUrl']}?auto=compress&cs=tinysrgb&w={SOURCE_WIDTH}"
    response = requests.get(url, timeout=45, headers=HEADERS)
    response.raise_for_status()
    if not response.headers.get('content-type', '').startswith('image/'):
        raise ValueError(f'{key}: expected an image')
    image = Image.open(io.BytesIO(response.content)).convert('RGB')
    size = SIZES.get(key, DEFAULT_SIZE)
    if image.width < size[0]:
        raise ValueError(f'{key}: source only {image.size}, too small')
    image = ImageOps.fit(image, size, method=Image.Resampling.LANCZOS, centering=CENTERING.get(key, (0.5, 0.5)))
    image.save(OUTPUT / f'{key}.webp', format='WEBP', quality=QUALITY, method=6)
    return key


# Guard: home imagery is its own set. It must not repeat a product photo, or
# repeat itself, or the home page starts showing the same picture twice.
home_ids = [int(data['photoId']) for data in SOURCES.values()]
product_ids = {int(data['photoId']) for data in PRODUCT_SOURCES.values()}
overlap = sorted(set(home_ids) & product_ids)
if overlap:
    raise SystemExit(f'Home photo ids also used by products: {overlap}')
if len(set(home_ids)) != len(home_ids):
    raise SystemExit('Two home slots share one Pexels photo')

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    completed = list(pool.map(download, SOURCES.items()))

hashes = {}
for key in completed:
    digest = hashlib.sha256((OUTPUT / f'{key}.webp').read_bytes()).hexdigest()
    if digest in hashes:
        raise SystemExit(f'Duplicate image: {key} and {hashes[digest]} are identical')
    hashes[digest] = key

total = sum((OUTPUT / f'{key}.webp').stat().st_size for key in completed)
print(f'Wrote {len(completed)} home photos to {OUTPUT}')
print(f'Uniqueness: {len(hashes)} distinct files, none shared with the {len(product_ids)} product photos')
print(f'Total {total / 1048576:.2f} MB, average {total / len(hashes) / 1024:.0f} KB')
