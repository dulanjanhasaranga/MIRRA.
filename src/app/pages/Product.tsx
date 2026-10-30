import { AnimatePresence, motion } from 'motion/react'
import { ArrowLeft, Check, ChevronRight, Minus, Plus, Package, Ruler, Truck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'

import { bySlug, discount, products } from '../../data/products'
import { ProductCard } from '../components/ProductCard'
import { Button, Container, Stepper } from '../components/ui'
import { money, useCart } from '../lib/cart'
import { cx } from '../lib/cx'

export function Product() {
  const { slug } = useParams()
  const product = slug ? bySlug(slug) : undefined
  const cart = useCart()
  const [size, setSize] = useState(product?.sizes[0])
  const [color, setColor] = useState(product?.colors[0]?.name)
  const [quantity, setQuantity] = useState(1)
  const [view, setView] = useState(0)
  const [added, setAdded] = useState(false)
  const [open, setOpen] = useState<number | null>(0)

  useEffect(() => {
    setSize(product?.sizes[0])
    setColor(product?.colors[0]?.name)
    setQuantity(1)
    setView(0)
    window.scrollTo({ top: 0 })
  }, [product])

  if (!product) return <Navigate to="/shop" replace />

  const off = discount(product)
  const option = [size === 'One size' ? null : size, color].filter(Boolean).join(' / ') || undefined
  const views = [
    { label: 'Front', src: product.image, style: {} },
    { label: 'Detail', src: product.image, style: { transform: 'scale(1.9)', transformOrigin: '50% 38%' } },
    ...(product.hoverImage !== product.image ? [{ label: 'Colourway', src: product.hoverImage, style: {} }] : []),
  ]
  const sameDepartment = products.filter((p) => (p.department ?? 'women') === (product.department ?? 'women') && p.slug !== product.slug)
  const related = sameDepartment.filter((p) => p.category === product.category).slice(0, 4)
  const fallbackRelated = sameDepartment.filter((p) => p.featured && !related.includes(p)).slice(0, 4)
  const alsoLike = related.length >= 4 ? related : [...related, ...fallbackRelated].slice(0, 4)
  const sections = [
    { title: 'Details', body: product.details },
    { title: 'Materials and care', body: [product.materials] },
    {
      title: 'Shipping and returns',
      body: ['Shipping is free when your bag reaches $49.', 'This storefront uses a demo checkout; no order is shipped.'],
    },
  ]

  function add() {
    cart.add(product!, option, quantity)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <Container className="pt-5 sm:pt-7">
      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-muted">
        <Link to="/" className="hover:text-fg">Home</Link>
        <ChevronRight className="size-3" aria-hidden />
        <Link to={`/shop?department=${product.department ?? 'women'}`} className="hover:text-fg">{product.department === 'men' ? 'Men' : 'Women'}</Link>
        <ChevronRight className="size-3" aria-hidden />
        <Link to={`/shop?department=${product.department ?? 'women'}&category=${product.category}`} className="capitalize hover:text-fg">{product.category}</Link>
        <ChevronRight className="size-3" aria-hidden />
        <span className="truncate text-fg">{product.name}</span>
      </nav>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div className="grid grid-cols-[58px_1fr] gap-2.5 sm:grid-cols-[68px_1fr] sm:gap-3">
          <div className="flex flex-col gap-2.5">
            {views.map((v, i) => (
              <button
                key={v.label}
                type="button"
                aria-label={v.label}
                onClick={() => setView(i)}
                className={cx('image-frame aspect-[3/4] rounded-[8px] border-2 transition-colors', view === i ? 'border-fg' : 'border-transparent hover:border-line-strong')}
              >
                <img src={v.src} alt="" className="size-full object-cover" style={v.style} />
              </button>
            ))}
          </div>
          <div className="image-frame relative aspect-[3/4] rounded-[12px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={view}
                src={views[view].src}
                alt={`${product.name} ${product.image.endsWith('.webp') ? 'styling photo' : 'illustration'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 size-full object-cover"
                style={views[view].style}
              />
            </AnimatePresence>
            {off > 0 && <span className="absolute left-3 top-3 rounded-[6px] bg-accent px-2 py-1 text-[12px] font-semibold text-white">-{off}%</span>}
          </div>
        </div>

        <div className="lg:pt-1">
          <h1 className="text-[24px] font-semibold leading-tight tracking-tight sm:text-[28px]">{product.name}</h1>
          {product.image.endsWith('.webp') && <p className="mt-1 text-[12.5px] text-muted">Styling photo for reference; see the colour options below.</p>}
          <div className="mt-4 flex flex-wrap items-baseline gap-2.5">
            <span className="text-[26px] font-semibold tabular-nums text-accent">{money(product.price)}</span>
            {product.compareAt && (
              <>
                <span className="text-[15px] tabular-nums text-faint line-through">{money(product.compareAt)}</span>
                <span className="rounded-[5px] bg-accent-soft px-1.5 py-0.5 text-[12px] font-medium text-accent">Save {money(product.compareAt - product.price)}</span>
              </>
            )}
          </div>
          <p className="mt-1 text-[12.5px] text-muted">Tax included. Free shipping over $49.</p>

          <p className="mt-5 text-pretty text-[14.5px] leading-relaxed text-muted">{product.description}</p>

          {product.colors.length > 0 && (
            <div className="mt-6">
              <p className="text-[13px] font-medium">
                Colour <span className="ml-1 font-normal text-muted">{color}</span>
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setColor(c.name)}
                    aria-label={c.name}
                    aria-pressed={color === c.name}
                    className={cx('round grid size-8 place-items-center rounded-full ring-1 ring-line-strong transition-shadow', color === c.name && 'ring-2 ring-fg ring-offset-2')}
                  >
                    <span className="round size-6 rounded-full" style={{ background: c.hex }} />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="text-[13px] font-medium">
                Size <span className="ml-1 font-normal text-muted">{size}</span>
              </p>
              <span className="inline-flex items-center gap-1 text-[12.5px] text-muted">
                <Ruler className="size-3.5" />
                True to size
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={cx(
                    'h-10 min-w-12 rounded-[6px] border px-3 text-[13px] transition-colors',
                    size === s ? 'border-fg bg-fg text-bg' : 'border-line-strong text-fg hover:border-fg',
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-[124px_1fr] gap-2.5">
            <Stepper value={quantity} onChange={setQuantity} />
            <Button size="md" onClick={add} className={cx('h-12 w-full bg-accent hover:bg-[#bd1936]', added && 'bg-fg hover:bg-fg')}>
              {added ? (
                <>
                  <Check />
                  Added to bag
                </>
              ) : (
                <>Add to bag · {money(product.price * quantity)}</>
              )}
            </Button>
          </div>

          <ul className="mt-6 grid gap-2.5 rounded-[10px] bg-surface p-4 text-[13px] text-muted">
            <li className="flex items-center gap-2.5">
              <Truck className="size-4 text-fg" />
              Free shipping threshold: $49
            </li>
            <li className="flex items-center gap-2.5">
              <Ruler className="size-4 text-fg" />
              Explore sizes and colourways before adding to your bag
            </li>
            <li className="flex items-center gap-2.5">
              <Package className="size-4 text-fg" />
              Demo checkout · no payment is collected
            </li>
          </ul>

          <ul className="mt-6 divide-y divide-line border-y border-line">
            {sections.map((s, i) => {
              const isOpen = open === i
              return (
                <li key={s.title}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)} className="flex h-12 w-full items-center justify-between text-left text-[14px] font-medium">
                    {s.title}
                    {isOpen ? <Minus className="size-4 text-muted" /> : <Plus className="size-4 text-muted" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                        <ul className="flex flex-col gap-1.5 pb-4 text-[13.5px] leading-relaxed text-muted">
                          {s.body.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <section className="mt-14 sm:mt-20">
        <h2 className="text-[22px] font-semibold tracking-tight sm:text-[26px]">You may also like</h2>
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 lg:grid-cols-4 lg:gap-x-5">
          {alsoLike.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} />
          ))}
        </div>
        <div className="mt-8">
          <Link to="/shop" className="inline-flex items-center gap-1.5 text-[13.5px] text-muted hover:text-fg">
            <ArrowLeft className="size-4" />
            Back to the shop
          </Link>
        </div>
      </section>
    </Container>
  )
}
