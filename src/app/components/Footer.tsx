import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'

import { Container } from './ui'
import { Logo } from './Nav'

const columns = [
  {
    title: 'Explore',
    links: [
      ['All products', '/shop'], ['Women', '/shop?department=women'], ['Men', '/shop?department=men'], ['New in', '/shop?sort=new'], ['Dresses', '/shop?category=dresses'],
      ['Denim', '/shop?category=denim'], ['Shoes', '/shop?category=shoes'], ['Sale', '/shop?sale=1'],
    ],
  },
  {
    title: 'More',
    links: [['About MIRRA', '/about'], ['Bags', '/shop?category=bags'], ['Accessories', '/shop?category=accessories']],
  },
]

export function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-surface sm:mt-24">
      <Container className="py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="max-w-md">
            <Logo />
            <h2 className="mt-5 text-[22px] font-semibold tracking-tight sm:text-[26px]">Find pieces that fit your day.</h2>
            <p className="mt-2 text-[14px] leading-relaxed text-muted">Browse clothing, shoes and accessories with clear pricing and useful product details.</p>
            <Link to="/shop" className="mt-5 inline-flex items-center gap-2 text-[14px] font-medium underline underline-offset-4">Shop the collection <ArrowRight className="size-4" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-[12.5px] font-semibold uppercase tracking-wider text-muted">{col.title}</p>
                <ul className="mt-3.5 flex flex-col gap-2.5">
                  {col.links.map(([label, to]) => (
                    <li key={label}><Link to={to} className="text-[13.5px] text-fg/80 transition-colors hover:text-fg">{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-line pt-6 text-[12.5px] text-muted sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} MIRRA</p>
          <p>Sample storefront · checkout does not collect payment</p>
        </div>
      </Container>
    </footer>
  )
}
