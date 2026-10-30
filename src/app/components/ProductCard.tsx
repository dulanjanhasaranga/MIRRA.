import { motion } from 'motion/react'
import { Link } from 'react-router'

import { discount, type Product } from '../../data/products'
import { money } from '../lib/cart'
import { cx } from '../lib/cx'

export function ProductCard({ product, index = 0, priority }: { product: Product; index?: number; priority?: boolean }) {
  const off = discount(product)

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.05, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <Link to={`/product/${product.slug}`} className="block">
        <div className="image-frame relative aspect-[3/4] rounded-image">
          <img
            src={product.image}
            alt={`${product.name} ${product.image.endsWith('.webp') ? 'styling photo' : 'illustration'}`}
            loading={priority ? 'eager' : 'lazy'}
            className={cx('size-full object-cover transition-opacity duration-500', product.hoverImage !== product.image && 'group-hover:opacity-0')}
          />
          {product.hoverImage !== product.image && (
            <img
              src={product.hoverImage}
              alt=""
              aria-hidden
              loading="lazy"
              className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          )}
          <div className="absolute left-2.5 top-2.5 flex flex-col items-start gap-1.5">
            {off > 0 && <span className="rounded-[6px] bg-accent px-2 py-1 text-[11.5px] font-semibold tracking-wide text-white">-{off}%</span>}
            {product.badge && (
              <span className={cx('rounded-[6px] px-2 py-1 text-[11.5px] font-medium', product.badge === 'New' ? 'bg-fg text-bg' : 'bg-bg/95 text-fg')}>
                {product.badge}
              </span>
            )}
          </div>
          <span className="absolute inset-x-2.5 bottom-2.5 hidden h-10 translate-y-2 place-items-center rounded-control bg-fg text-[13.5px] font-medium text-bg opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:grid">
            View details
          </span>
        </div>
        <div className="mt-2.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="min-w-0 truncate text-[14px] font-medium">{product.name}</h3>
            <p className="shrink-0 text-[14px] font-semibold tabular-nums">
              {money(product.price)}
              {product.compareAt && <span className="ml-1.5 text-[12.5px] font-normal text-faint line-through">{money(product.compareAt)}</span>}
            </p>
          </div>
          <p className="mt-1 truncate text-[12.5px] text-muted">{product.short}</p>
        </div>
      </Link>
    </motion.article>
  )
}
