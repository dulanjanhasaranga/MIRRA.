# MIRRA

A sample fashion storefront with search-first navigation, category rails,
sale pricing, product grids, size and colour selection, and a slide-out bag
with free-shipping progress. Checkout and order confirmation are a demo:
no payment is collected and no order is shipped.

The catalogue is 96 sample products, including 12 men's styles, across dresses,
tops, bottoms, denim, outerwear, knitwear, shoes, bags and accessories. All 96 listings use locally
stored Pexels styling photos. Photos are illustrative, not proof of
inventory or the exact colourway shown.

## Run it

Install Bun 1.4.4 or newer. Older Bun versions cannot read this project's lockfile.

```sh
bun install --frozen-lockfile
bun run dev        # http://localhost:5173
bun run build      # dist/client (assets) + dist/store/index.js (Worker)
```

## Make it yours

- `src/data/products.ts` is the catalogue: products, categories, prices, sizes,
  colourways and copy. `src/data/product-photo-sources.json` records each
  imported photo's Pexels source page and image URL. The photos are stored as
  WebP files in `public/images/products/photos`; run
  `python3 scripts/import-product-photos.py` with Pillow installed to refresh
  them. Pexels allows use without attribution under its license, but source
  pages are retained for review.
- The SVG generator remains available for alternate artwork and editorial images.
- `scripts/generate-product-images.ts` draws the product illustrations, the
  alternate colourway, and the hero and editorial images. Run it after changing
  a product's `shape` or colours:

  ```sh
  bun scripts/generate-product-images.ts
  ```

- `src/app/pages/*` are the screens; `src/app/components/*` the pieces (nav with
  search, bag drawer, product card, footer, primitives).
- `src/styles.css` holds the tokens: white canvas, ink text, a single sale-red
  accent, Inter for everything, tight radii.
- `src/worker/index.ts` handles `/api/orders` and `/api/newsletter`. The
  checkout is a demo: swap the order handler for a Stripe Checkout session
  (keep the secret in Sites → Secrets) or save orders to D1.

## Deploy with Freebuff Sites

`deploy.json` points at the build output. After `bun run build`, deploy with the
`sites_deploy` tool from this directory.

## Run and deploy with Specific

`specific.hcl` describes the app for [Specific](https://docs.specific.dev): one
`web` service that builds with `npm run build` and starts with `npm start`, which
runs `server.mjs` on the `PORT` Specific injects. Vite preview inside that
entrypoint runs the Cloudflare Worker, so the API is served alongside the
storefront, with a health check on `/api/health`.

```sh
specific dev      # local dashboard, plus the app on an auto-assigned port
specific deploy   # build and ship to Specific Cloud
```

Specific's managed Node base installs dependencies with npm and has no bun, so
the commands in `specific.hcl` go through npm even though local development uses
bun. The catalogue is static and the demo checkout persists nothing, so there is
no database yet; add a `postgres "main" {}` block to `specific.hcl` and pass
`DATABASE_URL = postgres.main.url` to the service when orders need to be stored.
