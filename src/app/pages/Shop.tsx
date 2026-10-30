import { AnimatePresence, motion } from 'motion/react'
import { SlidersHorizontal, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router'

import { categories, discount, products, type Category } from '../../data/products'
import { ProductCard } from '../components/ProductCard'
import { Button, Container } from '../components/ui'
import { cx } from '../lib/cx'

const priceOptions = [
  { key: '', label: 'Any price' },
  { key: '0-20', label: 'Under $20' },
  { key: '20-40', label: '$20 to $40' },
  { key: '40-60', label: '$40 to $60' },
  { key: '60-', label: '$60 and over' },
]
const sortOptions = [
  { key: 'featured', label: 'Recommended' },
  { key: 'new', label: 'Newest' },
  { key: 'price-asc', label: 'Price, low to high' },
  { key: 'price-desc', label: 'Price, high to low' },
  { key: 'discount', label: 'Biggest discount' },
]

export function Shop() {
  const [params, setParams] = useSearchParams()
  const [mobileOpen, setMobileOpen] = useState(false)
  const department = params.get('department') === 'men' ? 'men' : params.get('department') === 'women' ? 'women' : ''
  const category = params.get('category') ?? ''
  const price = params.get('price') ?? ''
  const size = params.get('size') ?? ''
  const sale = params.get('sale') === '1'
  const sort = params.get('sort') ?? 'featured'
  const query = (params.get('q') ?? '').trim()

  function update(next: Record<string, string>) {
    const merged = new URLSearchParams(params)
    for (const [k, v] of Object.entries(next)) v ? merged.set(k, v) : merged.delete(k)
    setParams(merged, { replace: true })
  }

  const departmentProducts = products.filter((p) => !department || (p.department ?? 'women') === department)
  const visibleCategories = categories.filter((c) => departmentProducts.some((p) => p.category === c.key))
  const availableSizes = [...new Set(departmentProducts.flatMap((p) => p.sizes))]

  const list = useMemo(() => {
    let items = [...products]
    if (department) items = items.filter((p) => (p.department ?? 'women') === department)
    if (query) {
      const needle = query.toLowerCase()
      items = items.filter((p) =>
        [p.name, p.short, p.category, p.description, ...p.colors.map((c) => c.name)].join(' ').toLowerCase().includes(needle),
      )
    }
    if (category) items = items.filter((p) => p.category === category)
    if (size) items = items.filter((p) => p.sizes.includes(size))
    if (sale) items = items.filter((p) => p.compareAt)
    if (price) {
      const [min, max] = price.split('-').map((v) => (v === '' ? undefined : Number(v)))
      items = items.filter((p) => (min === undefined || p.price >= min) && (max === undefined || p.price < max))
    }
    if (sort === 'price-asc') items.sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') items.sort((a, b) => b.price - a.price)
    if (sort === 'new') items.sort((a, b) => Number(b.newIn ?? false) - Number(a.newIn ?? false))
    if (sort === 'discount') items.sort((a, b) => discount(b) - discount(a))
    if (sort === 'featured') items.sort((a, b) => Number(b.featured ?? false) - Number(a.featured ?? false))
    return items
  }, [query, department, category, size, sale, price, sort])

  const activeCategory = categories.find((c) => c.key === category)
  const title = query ? `Results for “${query}”` : sale ? `${department === 'men' ? "Men's " : department === 'women' ? "Women's " : ''}sale` : activeCategory ? `${department === 'men' ? "Men's " : department === 'women' ? "Women's " : ''}${activeCategory.label}` : department === 'men' ? "Men's collection" : department === 'women' ? "Women's collection" : 'All products'
  const activeCount = (department ? 1 : 0) + (category ? 1 : 0) + (price ? 1 : 0) + (size ? 1 : 0) + (sale ? 1 : 0)

  const filters = (
    <div className="flex flex-col gap-7">
      <FilterGroup label="Department">
        {[{ key: '', label: 'All' }, { key: 'women', label: 'Women' }, { key: 'men', label: 'Men' }].map((item) => (
          <FilterOption key={item.key} active={department === item.key} onClick={() => update({ department: item.key, category: '', size: '' })}>
            {item.label}
            <span className="ml-auto text-[12px] tabular-nums text-faint">{item.key ? products.filter((p) => (p.department ?? 'women') === item.key).length : products.length}</span>
          </FilterOption>
        ))}
      </FilterGroup>
      <FilterGroup label="Category">
        {[{ key: '', label: 'Everything' }, ...visibleCategories].map((c) => (
          <FilterOption key={c.key} active={category === c.key} onClick={() => update({ category: c.key })}>
            {c.label}
            <span className="ml-auto text-[12px] tabular-nums text-faint">
              {c.key ? departmentProducts.filter((p) => p.category === (c.key as Category)).length : departmentProducts.length}
            </span>
          </FilterOption>
        ))}
      </FilterGroup>
      <FilterGroup label="Size">
        <div className="mt-1 flex flex-wrap gap-1.5">
          {availableSizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => update({ size: size === s ? '' : s })}
              aria-pressed={size === s}
              className={cx(
                'h-9 min-w-11 rounded-[6px] border px-2.5 text-[12.5px] transition-colors',
                size === s ? 'border-fg bg-fg text-bg' : 'border-line-strong text-muted hover:border-fg hover:text-fg',
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>
      <FilterGroup label="Price">
        {priceOptions.map((p) => (
          <FilterOption key={p.key} active={price === p.key} onClick={() => update({ price: p.key })}>
            {p.label}
          </FilterOption>
        ))}
      </FilterGroup>
      <FilterGroup label="Offers">
        <FilterOption active={sale} onClick={() => update({ sale: sale ? '' : '1' })}>
          <span className={cx('flex items-center gap-2', sale && 'text-accent')}>On sale only</span>
          <span className="ml-auto text-[12px] tabular-nums text-faint">{departmentProducts.filter((p) => p.compareAt).length}</span>
        </FilterOption>
      </FilterGroup>
      {activeCount > 0 && (
        <button type="button" onClick={() => setParams(query ? { q: query } : {}, { replace: true })} className="self-start text-[13px] text-muted underline underline-offset-4 hover:text-fg">
          Clear filters
        </button>
      )}
    </div>
  )

  return (
    <Container className="pt-6 sm:pt-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[12.5px] text-muted">
        <Link to="/" className="hover:text-fg">Home</Link>
        <span aria-hidden>/</span>
        <span className="text-fg">{title}</span>
      </nav>

      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[34px] sm:text-[42px]">
            {title} <span className="align-middle text-[18px] font-normal text-faint">{list.length}</span>
          </h1>
          {activeCategory && !query && !sale && <p className="mt-1 text-[13.5px] text-muted">{activeCategory.blurb}</p>}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <SlidersHorizontal />
            Filters{activeCount > 0 && ` (${activeCount})`}
          </Button>
          <label className="relative">
            <span className="sr-only">Sort</span>
            <select
              value={sort}
              onChange={(e) => update({ sort: e.target.value })}
              className="h-10 appearance-none rounded-control border border-line-strong bg-transparent pl-4 pr-9 text-[13.5px] focus:border-fg focus:outline-none"
            >
              {sortOptions.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </label>
        </div>
      </div>

      <nav aria-label="Shop department" className="mt-5 flex gap-2 border-b border-line pb-4">
        {[{ key: '', label: 'All' }, { key: 'women', label: 'Women' }, { key: 'men', label: 'Men' }].map((item) => (
          <button key={item.key} type="button" onClick={() => update({ department: item.key, category: '', size: '' })} aria-current={department === item.key ? 'page' : undefined} className={cx('rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors', department === item.key ? 'bg-fg text-bg' : 'bg-surface text-muted hover:text-fg')}>
            {item.label}
          </button>
        ))}
      </nav>

      {activeCount > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {[
            department && { key: 'department', label: department === 'men' ? 'Men' : 'Women' },
            category && { key: 'category', label: activeCategory?.label ?? category },
            size && { key: 'size', label: `Size ${size}` },
            price && { key: 'price', label: priceOptions.find((p) => p.key === price)?.label },
            sale && { key: 'sale', label: 'On sale' },
          ]
            .filter(Boolean)
            .map((chip) => {
              const item = chip as { key: string; label?: string }
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => update({ [item.key]: '' })}
                  className="inline-flex h-7 items-center gap-1.5 rounded-full bg-surface-2 pl-3 pr-2 text-[12px] text-fg"
                >
                  {item.label}
                  <X className="size-3.5 text-muted" />
                </button>
              )
            })}
        </div>
      )}

      <div className="mt-7 grid gap-8 lg:grid-cols-[200px_1fr] lg:gap-10">
        <aside className="hidden lg:block">
          <div className="sticky top-32">{filters}</div>
        </aside>
        <div>
          <motion.div layout className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-4 md:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div key={p.slug} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <ProductCard product={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          {list.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[20px] font-semibold">Nothing matches those filters</p>
              <p className="mt-1.5 text-[14px] text-muted">Try another size or clear the filters to see everything.</p>
              <Button variant="secondary" className="mt-6" onClick={() => setParams({}, { replace: true })}>
                Show all products
              </Button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div className="fixed inset-0 z-50 bg-fg/40 lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)}>
            <motion.div
              initial={{ y: 32, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 32, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 bottom-0 max-h-[88vh] overflow-y-auto rounded-t-[16px] bg-bg p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <p className="text-[20px] font-semibold">Filters</p>
                <button type="button" aria-label="Close" onClick={() => setMobileOpen(false)} className="grid size-10 place-items-center rounded-control hover:bg-surface-2">
                  <X className="size-5" />
                </button>
              </div>
              <div className="mt-5">{filters}</div>
              <Button className="mt-7 w-full" onClick={() => setMobileOpen(false)}>
                Show {list.length} {list.length === 1 ? 'product' : 'products'}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  )
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[12.5px] font-semibold uppercase tracking-wider text-muted">{label}</p>
      <ul className="mt-2 flex flex-col gap-0.5">{children}</ul>
    </div>
  )
}

function FilterOption({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={cx('flex h-8 w-full items-center gap-2 rounded-[6px] px-2 text-left text-[13.5px] transition-colors', active ? 'bg-surface-2 font-medium text-fg' : 'text-muted hover:text-fg')}
      >
        {children}
      </button>
    </li>
  )
}
