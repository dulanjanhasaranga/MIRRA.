import { motion } from 'motion/react'
import { ArrowRight, BadgePercent, Package, Sparkles, Truck } from 'lucide-react'
import { Link } from 'react-router'

import { categories, discount, featured, menProducts, newArrivals, onSale, products } from '../../data/products'
import { ProductCard } from '../components/ProductCard'
import { ButtonLink, Container, Reveal, SectionTitle } from '../components/ui'

const ease = [0.22, 1, 0.36, 1] as const

export function Home() {
  const heroProduct = newArrivals[0]
  const flash = [...onSale].sort((a, b) => discount(b) - discount(a)).slice(0, 4)

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-surface">
        <Container className="grid items-center gap-8 py-8 sm:py-12 lg:grid-cols-[1.02fr_1fr] lg:gap-14 lg:py-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-[12px] font-medium text-accent"
            >
              <Sparkles className="size-3.5" />
              The latest edit · {products.length} styles to explore
            </motion.p>
            <h1 className="font-display mt-5 text-[50px] leading-[0.95] sm:text-[68px] lg:text-[80px]">
              {['Find your', 'next favourite'].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                  <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.08 + i * 0.1, ease }}>
                    {line}
                  </motion.span>
                </span>
              ))}
              <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.28, ease }}>
                  <span className="text-accent">piece.</span>
                </motion.span>
              </span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4, ease }} className="mt-5 max-w-md text-[15.5px] leading-relaxed text-muted">
              Thoughtful everyday pieces, easy layers and finishing touches. Browse the full collection by category, size or price.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5, ease }} className="mt-7 flex flex-col gap-2.5 sm:flex-row">
              <ButtonLink to="/shop?department=women" size="lg" className="w-full sm:w-auto">
                Shop women
                <ArrowRight />
              </ButtonLink>
              <ButtonLink to="/shop?department=men" size="lg" variant="secondary" className="w-full sm:w-auto">
                Shop men
              </ButtonLink>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.65 }} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12.5px] text-muted">
              <span className="inline-flex items-center gap-1.5"><Package className="size-4" /> {products.length} styles across {categories.length} categories</span>
              <span className="inline-flex items-center gap-1.5">
                <Truck className="size-4" /> Free shipping over $49
              </span>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15, ease }} className="relative">
            <div className="image-frame relative aspect-[5/4] rounded-[20px] sm:aspect-[4/3] lg:aspect-[5/5]">
              <img src="/images/products/photos/satin-slip-midi-dress.webp" alt="Styling photo of a satin slip dress" className="size-full object-cover" fetchPriority="high" />
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
      <section className="border-b border-line py-7">
        <Container>
          <div className="scrollbar-none -mx-1 flex gap-3 overflow-x-auto px-1 sm:grid sm:grid-cols-5 sm:gap-4 sm:overflow-visible lg:grid-cols-9">
            {categories.map((c, i) => (
              <Reveal key={c.key} delay={i * 0.03}>
                <Link to={`/shop?category=${c.key}`} className="group flex w-[76px] shrink-0 flex-col items-center gap-2 sm:w-auto">
                  <span className="round relative size-[68px] overflow-hidden rounded-full bg-surface-2 ring-1 ring-line transition-[transform,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:shadow-soft lg:size-[74px]">
                    <img src={c.image} alt="" className="size-full object-cover" loading="lazy" />
                  </span>
                  <span className="text-center text-[12.5px] font-medium">{c.label}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Men's collection */}
      <section className="border-b border-line py-12 sm:py-16">
        <Container>
          <Reveal>
            <SectionTitle
              title="Men's essentials"
              action={<Link to="/shop?department=men" className="inline-flex items-center gap-1.5 text-[13.5px] text-muted transition-colors hover:text-fg">Shop all men <ArrowRight className="size-4" /></Link>}
            />
            <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-muted">Shirts, denim, easy layers and everyday accessories—now in the collection.</p>
          </Reveal>
          <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-5">
            {menProducts.filter((p) => p.featured).slice(0, 4).map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </Container>
      </section>

      {/* Sale edit */}
      <section className="bg-accent-soft/60 py-10 sm:py-14">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-[30px] leading-none text-accent sm:text-[38px]">The sale edit</h2>
            </div>
            <p className="max-w-sm text-[13px] leading-relaxed text-muted">Selected styles at lower prices. See the original and current price on every item.</p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-4">
            {flash.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} priority={i < 2} />
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink to="/shop?sale=1" className="bg-accent text-white hover:bg-[#bd1936]">
              Shop all sale
              <ArrowRight />
            </ButtonLink>
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
              { image: '/images/edit-layers.svg', eyebrow: 'The edit', title: 'Layers for the in-between', to: '/shop?category=outerwear' },
              { image: '/images/edit-accessories.svg', eyebrow: 'Finishing touches', title: 'Shoes, bags, everything else', to: '/shop?category=accessories' },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <Link to={item.to} className="group image-frame relative block aspect-[4/3] rounded-[16px] sm:aspect-[5/4]">
                  <img src={item.image} alt={item.title} className="size-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]" loading="lazy" />
                  <div className="absolute inset-x-4 bottom-4 rounded-[12px] bg-bg/95 p-4 backdrop-blur sm:max-w-[300px]">
                    <p className="text-[11.5px] font-medium uppercase tracking-wider text-muted">{item.eyebrow}</p>
                    <p className="mt-1 flex items-center justify-between gap-4 text-[17px] font-semibold tracking-tight">
                      {item.title}
                      <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

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

      {/* Promises */}
      <section className="pt-14 sm:pt-20">
        <Container>
          <ul className="grid gap-6 border-t border-line pt-9 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Truck, title: 'Free shipping over $49', body: 'See your order total in the bag.' },
              { icon: Package, title: 'Shop by category', body: 'Find pieces for every part of your wardrobe.' },
              { icon: BadgePercent, title: 'Clear sale pricing', body: 'Original and current prices shown together.' },
              { icon: Sparkles, title: 'Details that help', body: 'Materials, sizes and colours on every item.' },
            ].map(({ icon: Icon, title, body }, i) => (
              <Reveal key={title} delay={i * 0.05}>
                <li className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-surface-2">
                    <Icon className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-[14px] font-medium">{title}</p>
                    <p className="mt-0.5 text-[13px] text-muted">{body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>
    </>
  )
}
