import { ArrowRight, Flame, Package, Sparkles, Truck, Zap } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'

import { discount, type Product } from '../../data/products'
import { money } from '../lib/cart'
import { cx } from '../lib/cx'
import { Container } from './ui'

const pad = (n: number) => String(n).padStart(2, '0')

// Counts down to local midnight so the band always has a live timer.
function useCountdown() {
  const [parts, setParts] = useState<string[] | null>(null)

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)
      const ms = Math.max(0, end.getTime() - now.getTime())
      setParts([
        pad(Math.floor(ms / 3600000)),
        pad(Math.floor((ms % 3600000) / 60000)),
        pad(Math.floor((ms % 60000) / 1000)),
      ])
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return parts
}

export function DealCard({ product, framed = false, className }: { product: Product; framed?: boolean; className?: string }) {
  const off = discount(product)

  return (
    <Link
      to={`/product/${product.slug}`}
      className={cx(
        'group block w-[44%] shrink-0 snap-start sm:w-auto',
        framed && 'rounded-[12px] bg-bg p-1.5 text-fg',
        className,
      )}
    >
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
      </div>
      <p className="mt-1.5 line-clamp-2 min-h-8 text-[12px] leading-4">{product.name}</p>
      <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5">
        <span className="text-[14px] font-bold tabular-nums text-accent">{money(product.price)}</span>
        {product.compareAt && <span className="text-[11.5px] tabular-nums text-faint line-through">{money(product.compareAt)}</span>}
      </p>
    </Link>
  )
}

export function FlashSale({ items }: { items: Product[] }) {
  const parts = useCountdown()

  return (
    <section className="bg-accent text-white">
      <Container className="py-5 sm:py-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-white/15">
              <Zap className="size-4" />
            </span>
            <div>
              <p className="text-[17px] font-bold leading-none tracking-tight">Flash sale</p>
              <p className="mt-1 text-[11.5px] leading-none text-white/80">Today only · while stock lasts</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-[11.5px] leading-none text-white/85 sm:inline">Ends in</span>
            <div className="flex items-center gap-1" role="timer" aria-label="Flash sale time remaining">
              {parts ? (
                parts.map((part, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && (
                      <span className="text-[12px] font-bold text-white/60" aria-hidden>
                        :
                      </span>
                    )}
                    <span className="grid h-7 min-w-[28px] place-items-center rounded-[6px] bg-bg px-1 text-[13px] font-bold tabular-nums text-accent">
                      {part}
                    </span>
                  </span>
                ))
              ) : (
                <span className="h-7 w-[92px] rounded-[6px] bg-white/20" aria-hidden />
              )}
            </div>
          </div>
        </div>

        <div className="scrollbar-none -mx-5 mt-4 flex snap-x gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
          {items.map((p) => (
            <DealCard key={p.slug} product={p} framed />
          ))}
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <Link to="/shop?sale=1" className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-white hover:underline">
            Shop all sale
            <ArrowRight className="size-3.5" />
          </Link>
          <span className="text-[11.5px] text-white/75">Prices as marked · no code needed</span>
        </div>
      </Container>
    </section>
  )
}

export function DealRail({ items }: { items: Product[] }) {
  return (
    <section className="border-y border-line bg-surface py-6 sm:py-8">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
              <Flame className="size-3.5" /> Biggest markdowns
            </p>
            <h2 className="font-display mt-1.5 text-[26px] sm:text-[32px]">Super deals</h2>
          </div>
          <Link to="/shop?sale=1" className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-fg">
            See all
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="scrollbar-none -mx-5 mt-4 flex snap-x gap-2.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
          {items.map((p) => (
            <DealCard key={p.slug} product={p} />
          ))}
        </div>
      </Container>
    </section>
  )
}

const promises = [
  { icon: Truck, title: 'Free shipping', body: 'On orders over $49' },
  { icon: Package, title: 'Clear pricing', body: 'Sale and original shown' },
  { icon: Sparkles, title: 'Honest details', body: 'Materials and care listed' },
]

export function TrustStrip() {
  return (
    <section className="border-b border-line">
      <Container>
        <ul className="grid grid-cols-3 divide-x divide-line">
          {promises.map(({ icon: Icon, title, body }) => (
            <li
              key={title}
              className="flex flex-col items-center gap-1.5 px-2 py-4 text-center sm:flex-row sm:gap-2.5 sm:px-4 sm:text-left"
            >
              <Icon className="size-4 shrink-0 text-accent" />
              <div>
                <p className="text-[12px] font-semibold leading-tight">{title}</p>
                <p className="mt-0.5 text-[11px] leading-tight text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
