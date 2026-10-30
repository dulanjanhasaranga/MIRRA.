import { AnimatePresence, motion } from 'motion/react'
import { Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

import { categories, products } from '../../data/products'
import { useCart } from '../lib/cart'
import { cx } from '../lib/cx'

const promos = [`Explore ${products.length} everyday styles`, 'Shop by size, category and price', 'Free shipping over $49']

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cx('inline-flex items-baseline gap-1.5', className)} aria-label="MIRRA home">
      <span className="font-display text-[26px] leading-none tracking-[-0.05em]">MIRRA</span>
      <span className="round mb-1 size-1.5 rounded-full bg-accent" aria-hidden />
    </Link>
  )
}

export function Nav() {
  const cart = useCart()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [query, setQuery] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => setOpen(false), [location])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function search(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    const next = new URLSearchParams()
    if (q) next.set('q', q)
    if (department) next.set('department', department)
    navigate(`/shop${next.size ? `?${next}` : ''}`)
    setOpen(false)
  }

  const shopParams = new URLSearchParams(location.search)
  const department = shopParams.get('department')
  const activeCategory = shopParams.get('category')
  const sale = location.pathname === '/shop' && shopParams.get('sale') === '1'
  const shopActive = location.pathname === '/shop'
  const visibleCategories = categories.filter((c) => !department || products.some((p) => (p.department ?? 'women') === department && p.category === c.key))
  const categoryUrl = (key: string) => `/shop?category=${key}${department ? `&department=${department}` : ''}`
  const navClass = (active: boolean) => cx('inline-flex shrink-0 items-center border-b-2 px-3 text-[13.5px] transition-colors', active ? 'border-fg text-fg' : 'border-transparent text-muted hover:text-fg')

  return (
    <>
      <div className="flex h-9 items-center justify-center gap-5 bg-fg px-4 text-center text-[12px] tracking-[0.01em] text-bg">
        {promos.map((p, i) => (
          <span key={p} className={cx('flex items-center gap-5', i > 0 && 'hidden sm:flex')}>
            {i > 0 && <span className="size-1 rounded-full bg-bg/40" aria-hidden />}
            {p}
          </span>
        ))}
      </div>
      <header className={cx('sticky top-0 z-40 bg-bg transition-shadow duration-300', scrolled && 'shadow-[0_1px_0_0_var(--color-line),0_8px_24px_-16px_rgb(17_17_17_/_0.3)]')}>
        <div className="mx-auto flex h-16 max-w-[1360px] items-center gap-3 px-4 sm:gap-6 sm:px-6 lg:px-8">
          <button type="button" aria-label="Menu" onClick={() => setOpen(true)} className="grid size-10 shrink-0 place-items-center rounded-control lg:hidden">
            <Menu className="size-5" />
          </button>
          <Logo className="shrink-0" />

          <form onSubmit={search} role="search" className="mx-auto hidden w-full max-w-[560px] items-center sm:flex">
            <div className="flex h-10 w-full items-center gap-2 rounded-full border border-line-strong bg-surface px-4 transition-colors focus-within:border-fg focus-within:bg-bg">
              <Search className="size-4 shrink-0 text-muted" />
              <label htmlFor="site-search" className="sr-only">
                Search products
              </label>
              <input
                id="site-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search dresses, denim, boots…"
                className="h-full min-w-0 flex-1 bg-transparent text-[14px] placeholder:text-faint focus:outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              <button type="submit" className="h-7 shrink-0 rounded-full bg-fg px-3 text-[12px] font-medium text-bg transition-opacity hover:opacity-85">
                Search
              </button>
            </div>
          </form>

          <div className="ml-auto flex shrink-0 items-center gap-1">
            <Link to="/about" className="hidden h-9 items-center rounded-control px-3 text-[14px] text-muted transition-colors hover:bg-surface-2 hover:text-fg lg:inline-flex">
              About
            </Link>
            <Link to="/shop?sale=1" className="hidden h-9 items-center rounded-control px-3 text-[14px] font-medium text-accent transition-colors hover:bg-accent-soft md:inline-flex">
              Sale
            </Link>
            <button
              type="button"
              aria-label={`Bag, ${cart.count} items`}
              onClick={() => cart.setOpen(true)}
              className="relative inline-flex h-10 items-center gap-2 rounded-control px-2.5 text-[14px] transition-colors hover:bg-surface-2 sm:px-3"
            >
              <ShoppingBag className="size-5" />
              <span className="hidden sm:inline">Bag</span>
              <AnimatePresence>
                {cart.count > 0 && (
                  <motion.span
                    key={cart.count}
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    className="round grid min-w-5 place-items-center rounded-full bg-accent px-1.5 text-[11px] font-semibold tabular-nums text-white"
                  >
                    {cart.count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        <nav aria-label="Shop" className="border-t border-line">
          <div className="scrollbar-none mx-auto flex h-11 max-w-[1360px] items-stretch gap-1 overflow-x-auto px-4 sm:px-6 lg:justify-center lg:px-8">
            <Link to="/shop" className={navClass(shopActive && !department && !activeCategory && !sale)}>
              All
            </Link>
            <Link to="/shop?department=women" className={navClass(shopActive && department === 'women' && !activeCategory && !sale)}>Women</Link>
            <Link to="/shop?department=men" className={navClass(shopActive && department === 'men' && !activeCategory && !sale)}>Men</Link>
            {visibleCategories.map((c) => (
              <Link
                key={c.key}
                to={categoryUrl(c.key)}
                className={navClass(shopActive && activeCategory === c.key && !sale)}
              >
                {c.label}
              </Link>
            ))}
            <Link to="/shop?sale=1" className={cx('inline-flex shrink-0 items-center border-b-2 px-3 text-[13.5px] font-medium transition-colors', sale ? 'border-accent text-accent' : 'border-transparent text-accent hover:text-accent')}>
              Sale
            </Link>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 bg-fg/40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
            <motion.nav
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -24, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 flex w-[86%] max-w-[340px] flex-col bg-bg p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button type="button" aria-label="Close" onClick={() => setOpen(false)} className="grid size-10 place-items-center rounded-control hover:bg-surface-2">
                  <X className="size-5" />
                </button>
              </div>

              <form onSubmit={search} role="search" className="mt-6 flex h-11 items-center gap-2 rounded-full border border-line-strong px-4">
                <Search className="size-4 text-muted" />
                <label htmlFor="mobile-search" className="sr-only">
                  Search products
                </label>
                <input
                  id="mobile-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search the shop"
                  className="h-full min-w-0 flex-1 bg-transparent text-[14px] placeholder:text-faint focus:outline-none"
                />
              </form>

              <ul className="mt-6 flex flex-1 flex-col overflow-y-auto">
                <li><Link to="/shop?department=women" className="flex h-11 items-center rounded-control px-2 text-[15px] font-medium hover:bg-surface-2">Shop women</Link></li>
                <li><Link to="/shop?department=men" className="flex h-11 items-center rounded-control px-2 text-[15px] font-medium hover:bg-surface-2">Shop men</Link></li>
                {visibleCategories.map((c) => (
                  <li key={c.key}>
                    <Link to={categoryUrl(c.key)} className="flex h-11 items-center justify-between rounded-control px-2 text-[15px] hover:bg-surface-2">
                      {c.label}
                      <span className="text-[12px] text-faint">{c.blurb}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/shop?sale=1" className="flex h-11 items-center rounded-control px-2 text-[15px] font-medium text-accent hover:bg-accent-soft">
                    Sale
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="flex h-11 items-center rounded-control px-2 text-[15px] hover:bg-surface-2">
                    About
                  </Link>
                </li>
              </ul>

              <p className="border-t border-line pt-4 text-[12.5px] text-muted">Free shipping over $49 · 30-day returns</p>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
