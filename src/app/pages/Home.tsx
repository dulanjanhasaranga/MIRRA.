import { motion } from 'motion/react'
import { ArrowRight, BadgePercent } from 'lucide-react'
import { Link } from 'react-router'

import { categories, discount, featured, menProducts, mensSale, newArrivals, onSale, products } from '../../data/products'
import { DealRail, FlashSale, TrustStrip } from '../components/Deals'
import { JustForYou } from '../components/JustForYou'
import { ProductCard } from '../components/ProductCard'
import { TrendTags } from '../components/TrendTags'
import { ButtonLink, Container, Reveal, SectionTitle } from '../components/ui'

const ease = [0.22, 1, 0.36, 1] as const

const heroShots = [
  { src: '/images/home/hero-1.webp', alt: 'Woman in black tailoring on a stone colonnade' },
  { src: '/images/home/hero-2.webp', alt: 'Woman in a beige knit sweater with arms raised' },
  { src: '/images/home/hero-3.webp', alt: 'Studio portrait in a white shirt and light trousers' },
]

export function Home() {
  const ranked = [...onSale].sort((a, b) => discount(b) - discount(a))
  const flashSale = ranked.slice(0, 6)
  const superDeals = ranked.slice(6, 18)
  const flash = ranked.slice(18, 26)
  const mensOff = mensSale.length ? Math.max(...mensSale.map(discount)) : 0
  const menPicks = [...mensSale].sort((a, b) => discount(b) - discount(a)).slice(0, 4)
  const heroProduct = menPicks[0]
  const menNew = menProducts.filter((p) => p.newIn).slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-surface">
        <Container className="grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_1.02fr] lg:gap-14 lg:py-16">
          <div>
            <h1 className="font-display text-[52px] leading-[0.9] sm:text-[74px] lg:text-[86px]">
              {['New drops.', 'Honest prices.'].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                  <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.08 + i * 0.1, ease }}>
                    {line}
                  </motion.span>
                </span>
              ))}
              <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.28, ease }}>
                  <span className="text-accent">Men’s sale.</span>
                </motion.span>
              </span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease }} className="mt-5 max-w-md text-[15.5px] leading-relaxed text-muted">
              {mensSale.length} men’s pieces on sale — shirts, denim, knits and outerwear. Plus {products.length} styles across the whole shop.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease }} className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <ButtonLink to="/shop?department=men&sale=1" size="lg" className="w-full bg-accent hover:bg-[#bd1936] sm:w-auto">
                Shop men’s sale
                <ArrowRight />
              </ButtonLink>
              <ButtonLink to="/shop?department=women" size="lg" variant="secondary" className="w-full sm:w-auto">
                Shop women
              </ButtonLink>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15, ease }} className="relative">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              <div className="image-frame relative row-span-2 overflow-hidden rounded-[16px]">
                <img src={heroShots[0].src} alt={heroShots[0].alt} className="absolute inset-0 size-full object-cover" fetchPriority="high" width={900} height={1200} />
              </div>
              <div className="flex flex-col gap-2.5 sm:gap-3">
                <div className="image-frame relative aspect-[4/5] overflow-hidden rounded-[16px]">
                  <img src={heroShots[1].src} alt={heroShots[1].alt} className="size-full object-cover" width={900} height={1125} />
                </div>
                <div className="image-frame relative aspect-[4/5] overflow-hidden rounded-[16px]">
                  <img src={heroShots[2].src} alt={heroShots[2].alt} className="size-full object-cover" width={900} height={1125} />
                </div>
              </div>
            </div>

            <div className="absolute -left-2 top-6 rotate-[-8deg] rounded-[10px] bg-accent px-3 py-2 text-center text-white shadow-soft sm:left-4">
              <span className="block text-[19px] font-bold leading-none">-{mensOff}%</span>
              <span className="mt-1 block text-[9.5px] font-semibold uppercase tracking-[0.14em]">Men’s sale</span>
            </div>

            {heroProduct && (
              <Link
                to={`/product/${heroProduct.slug}`}
                className="absolute bottom-4 left-4 flex items-center gap-3 rounded-[12px] bg-bg/95 py-2 pl-2 pr-4 text-[12.5px] shadow-soft backdrop-blur transition-colors hover:bg-bg"
              >
                <img src={heroProduct.image} alt="" className="size-11 rounded-[8px] object-cover" />
                <span>
                  <span className="block font-medium">{heroProduct.name}</span>
                  <span className="text-muted">
                    {heroProduct.compareAt && <span className="mr-1.5 line-through">{`$${heroProduct.compareAt}`}</span>}
                    <span className="text-accent">${heroProduct.price}</span>
                  </span>
                </span>
                <ArrowRight className="size-4 text-muted" />
              </Link>
            )}
          </motion.div>
        </Container>
      </section>

      {/* Categories */}
      <section className="border-b border-line py-6 sm:py-8">
        <Container>
          <div className="scrollbar-none -mx-1 flex snap-x gap-2.5 overflow-x-auto px-1 sm:mx-0 sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:px-0 lg:grid-cols-9">
            {categories.map((c, i) => (
              <Reveal key={c.key} delay={i * 0.03}>
                <Link to={`/shop?category=${c.key}`} className="group relative block w-[112px] shrink-0 snap-start overflow-hidden rounded-[12px] bg-surface-2 sm:w-auto">
                  <div className="image-frame aspect-[3/4]">
                    <img src={c.image} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" loading="lazy" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-2 pt-6">
                    <span className="block text-[12px] font-semibold leading-tight text-white">{c.label}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <FlashSale items={flashSale} />

      {/* Men's sale */}
      <section className="pt-10 sm:pt-14">
        <div className="bg-fg py-9 text-bg sm:py-12">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.2em] text-bg/60">
                  <BadgePercent className="size-3.5" /> Limited time
                </p>
                <h2 className="font-display mt-2 text-[42px] leading-[0.9] sm:text-[64px]">Men’s sale</h2>
                <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-bg/70">
                  Up to {mensOff}% off shirts, denim, knits, outerwear and shoes. Prices as marked — no code needed.
                </p>
              </div>
              <div className="flex flex-col items-start gap-3 sm:items-end">
                <span className="rounded-full border border-bg/25 px-3 py-1 text-[11.5px] text-bg/70">{mensSale.length} styles marked down</span>
                <Link
                  to="/shop?department=men&sale=1"
                  className="inline-flex h-11 items-center gap-2 rounded-control bg-bg px-5 text-[13.5px] font-medium text-fg transition-opacity hover:opacity-90"
                >
                  Shop all men’s sale
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </Container>
        </div>
        <Container className="mt-6 sm:mt-8">
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-5">
            {menPicks.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} priority={i < 2} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-muted">
            <Link to="/shop?department=men&sort=new" className="inline-flex items-center gap-1.5 hover:text-fg">
              New in men’s
              <ArrowRight className="size-3.5" />
            </Link>
            <span className="hidden size-1 rounded-full bg-line-strong sm:block" />
            <span>{menNew.length} new men’s styles in the collection</span>
          </div>
        </Container>
      </section>

      <DealRail items={superDeals} />

      <TrustStrip />

      {/* Sale edit */}
      <section className="mt-12 bg-accent-soft/60 py-10 sm:mt-16 sm:py-14">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-[30px] leading-none text-accent sm:text-[40px]">The sale edit</h2>
              <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-muted">More markdowns from across the shop, women’s and men’s together.</p>
            </div>
            <Link to="/shop?sale=1" className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent hover:underline">
              Shop all sale
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-4">
            {flash.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} priority={i < 2} />
            ))}
          </div>
        </Container>
      </section>

      {/* New in */}
      <section className="pt-12 sm:pt-16">
        <Container>
          <Reveal>
            <SectionTitle
              title="New in"
              action={
                <Link to="/shop?sort=new" className="inline-flex items-center gap-1.5 text-[13.5px] text-muted transition-colors hover:text-fg">
                  View all
                  <ArrowRight className="size-4" />
                </Link>
              }
            />
          </Reveal>
          <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
            {newArrivals.slice(0, 8).map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} priority={i < 4} />
            ))}
          </div>
        </Container>
      </section>

      {/* Editorial */}
      <section className="pt-14 sm:pt-20">
        <Container>
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {[
              { image: '/images/home/banner-edit.webp', eyebrow: 'The edit', title: 'Layers for the in-between', to: '/shop?category=outerwear' },
              { image: '/images/home/banner-accessories.webp', eyebrow: 'Finishing touches', title: 'Accessories that make it yours', to: '/shop?category=accessories' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <Link to={item.to} className="group image-frame relative block aspect-[4/3] overflow-hidden rounded-[16px] sm:aspect-[5/4]">
                  <img src={item.image} alt={item.title} className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]" loading="lazy" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent transition-opacity duration-500 group-hover:from-black/45 group-hover:via-black/10" aria-hidden="true" />
                  <div className="absolute inset-x-4 bottom-4 rounded-[12px] bg-bg/95 p-4 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] backdrop-blur sm:max-w-[300px]">
                    <p className="text-[11.5px] font-medium uppercase tracking-wider text-muted">{item.eyebrow}</p>
                    <p className="mt-1 flex items-center justify-between gap-4 text-[17px] font-semibold tracking-tight">
                      {item.title}
                      <span className="grid size-7 shrink-0 place-items-center rounded-full border border-line transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-bg">
                        <ArrowRight className="size-3.5" />
                      </span>
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Trend tags */}
      <TrendTags />

      {/* Trending */}
      <section className="pt-14 sm:pt-20">
        <Container>
          <Reveal>
            <SectionTitle
              title="Trending now"
              action={
                <Link to="/shop" className="inline-flex items-center gap-1.5 text-[13.5px] text-muted transition-colors hover:text-fg">
                  Shop everything
                  <ArrowRight className="size-4" />
                </Link>
              }
            />
          </Reveal>
          <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
            {featured.slice(0, 8).map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </Container>
      </section>

      {/* Just for you */}
      <JustForYou />
    </>
  )
}
