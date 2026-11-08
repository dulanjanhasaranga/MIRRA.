import { BadgePercent, Home, Search, ShoppingBag, User } from 'lucide-react'
import { Link, useLocation } from 'react-router'

import { useCart } from '../lib/cart'
import { cx } from '../lib/cx'

const itemClass = (active: boolean) =>
  cx(
    'flex flex-col items-center justify-center gap-1 text-[10.5px] transition-colors',
    active ? 'text-fg' : 'text-muted hover:text-fg',
  )

export function MobileTabBar() {
  const cart = useCart()
  const { pathname, search } = useLocation()
  const onShop = pathname === '/shop'
  const saleActive = onShop && search.includes('sale=1')

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg/95 backdrop-blur lg:hidden"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="mx-auto grid h-14 max-w-[520px] grid-cols-5 items-stretch">
        <Link to="/" className={itemClass(pathname === '/')}>
          <Home className="size-5" />
          Home
        </Link>
        <Link to="/shop" className={itemClass(onShop && !saleActive)}>
          <Search className="size-5" />
          Shop
        </Link>
        <Link to="/shop?sale=1" className={itemClass(saleActive)}>
          <BadgePercent className="size-5" />
          Sale
        </Link>
        <button
          type="button"
          onClick={() => cart.setOpen(true)}
          aria-label={`Bag, ${cart.count} ${cart.count === 1 ? 'item' : 'items'}`}
          className={cx(itemClass(false), 'relative')}
        >
          <ShoppingBag className="size-5" />
          Bag
          {cart.count > 0 && (
            <span className="round absolute right-[18%] top-2 grid min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold tabular-nums text-white">
              {cart.count}
            </span>
          )}
        </button>
        <Link to="/about" className={itemClass(pathname === '/about')}>
          <User className="size-5" />
          About
        </Link>
      </div>
    </nav>
  )
}
