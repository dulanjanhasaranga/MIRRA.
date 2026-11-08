import { useState } from 'react'
import { Link } from 'react-router'

import { discount, products, type Product } from '../../data/products'
import { money } from '../lib/cart'
import { Button, Container } from './ui'

const PAGE = 12

// Stable pseudo-shuffle so the feed order is varied but never changes between renders.
function shuffleKey(slug: string) {
  let hash = 0
  for (let i = 0; i < slug.length; i += 1) hash = (hash * 31 + slug.charCodeAt(i)) % 100003
  return hash
}

const pool = [...products].sort((a, b) => shuffleKey(a.slug) - shuffleKey(b.slug))

function FeedCard({ product }: { product: Product }) {
  const off = discount(product)

  return (
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="image-frame relative aspect-[3/4] rounded-image">
        <img
          src={product.image}
          alt={`${product.name} styling photo`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        {off > 0 && (
          <span className="absolute left-1.5 top-1.5 rounded-[5px] bg-accent px-1.5 py-0.5 text-[10.5px] font-bold tabular-nums text-white">
            -{off}%
          </span>
        )}
        {product.badge === 'New' && (
          <span className="absolute right-1.5 top-1.5 rounded-[5px] bg-fg px-1.5 py-0.5 text-[10.5px] font-medium text-bg">New</span>
        )}
      </div>
      <p className="mt-1.5 line-clamp-2 min-h-8 text-[12.5px] leading-4">{product.name}</p>
      <p className="mt-0.5 flex flex-wrap items-baseline gap-x-1.5">
        <span className="text-[14px] font-bold tabular-nums">{money(product.price)}</span>
        {product.compareAt && <span className="text-[11.5px] tabular-nums text-faint line-through">{money(product.compareAt)}</span>}
        {off > 0 && <span className="text-[11px] font-semibold text-accent">{off}% off</span>}
      </p>
      <p className="mt-0.5 line-clamp-1 text-[11.5px] text-muted">{product.short}</p>
    </Link>
  )
}

export function JustForYou() {
  const [visible, setVisible] = useState(PAGE)
  const items = pool.slice(0, visible)

  return (
    <section className="pt-14 sm:pt-20">
      <Container>
        <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
          <div>
            <h2 className="font-display text-[28px] sm:text-[34px]">Just for you</h2>
            <p className="mt-1 text-[12.5px] text-muted">{pool.length} styles picked from the full collection</p>
          </div>
          <Link to="/shop" className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-fg">
            Shop all
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-2.5 gap-y-6 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-5">
          {items.map((product) => (
            <FeedCard key={product.slug} product={product} />
          ))}
        </div>

        {visible < pool.length && (
          <div className="mt-8 flex flex-col items-center gap-2">
            <Button variant="secondary" onClick={() => setVisible((n) => n + PAGE)}>
              Show more styles
            </Button>
            <p className="text-[11.5px] text-muted">
              Showing {items.length} of {pool.length}
            </p>
          </div>
        )}
      </Container>
    </section>
  )
}
