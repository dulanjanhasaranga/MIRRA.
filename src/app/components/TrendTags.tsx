import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from './ui'

const trends = [
  { tag: '#LayersForNow', note: 'Knitwear', to: '/shop?category=knitwear' },
  { tag: '#DenimOnDenim', note: 'Denim', to: '/shop?category=denim' },
  { tag: '#SlipDressSeason', note: 'Dresses', to: '/shop?category=dresses' },
  { tag: '#EverydayTailoring', note: 'Outerwear', to: '/shop?category=outerwear' },
  { tag: '#FinishingTouches', note: 'Accessories', to: '/shop?category=accessories' },
  { tag: '#MensSale', note: 'Men', to: '/shop?department=men&sale=1' },
  { tag: '#EasyPrices', note: 'Under $30', to: '/shop?price=20-40' },
]

export function TrendTags() {
  return (
    <section className="pt-14 sm:pt-20">
      <Container>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">Top trends</p>
            <h2 className="font-display mt-1.5 text-[28px] sm:text-[34px]">Shop the hashtags</h2>
          </div>
          <Link to="/shop" className="inline-flex shrink-0 items-center gap-1.5 text-[13px] text-muted transition-colors hover:text-fg">
            All styles
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="scrollbar-none -mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {trends.map(({ tag, note, to }) => (
            <Link
              key={tag}
              to={to}
              className="group flex shrink-0 items-center gap-2 rounded-full border border-line-strong px-3.5 py-2 transition-colors hover:border-fg hover:bg-fg hover:text-bg"
            >
              <span className="text-[13px] font-medium">{tag}</span>
              <span className="text-[11.5px] text-muted transition-colors group-hover:text-bg/70">{note}</span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}
