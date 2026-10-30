"""Download reviewed Pexels photos listed in product-photo-sources.json.

The images are used as styling references for this sample storefront.
Source pages are retained in the JSON file for attribution and review.
"""
import concurrent.futures
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


def download(item):
    slug, data = item
    url = data['imageUrl'] + '?auto=compress&cs=tinysrgb&w=800'
    response = requests.get(url, timeout=30)
    response.raise_for_status()
    if not response.headers.get('content-type', '').startswith('image/'):
        raise ValueError(f'{slug}: expected an image')
    image = Image.open(io.BytesIO(response.content)).convert('RGB')
    image = ImageOps.fit(image, (600, 800), method=Image.Resampling.LANCZOS)
    image.save(OUTPUT / f'{slug}.webp', format='WEBP', quality=78, method=6)
    return slug


with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    completed = list(pool.map(download, SOURCES.items()))
print(f'Downloaded {len(completed)} reviewed photos to {OUTPUT}')
