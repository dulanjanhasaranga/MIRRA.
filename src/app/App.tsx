import { AnimatePresence, motion } from 'motion/react'
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router'

import { CartDrawer } from './components/CartDrawer'
import { Footer } from './components/Footer'
import { MobileTabBar } from './components/MobileTabBar'
import { Nav } from './components/Nav'
import { CartProvider } from './lib/cart'
import { bySlug, categories } from '../data/products'

const About = lazy(() => import('./pages/About').then((page) => ({ default: page.About })))
const Checkout = lazy(() => import('./pages/Checkout').then((page) => ({ default: page.Checkout })))
const OrderConfirmed = lazy(() => import('./pages/Checkout').then((page) => ({ default: page.OrderConfirmed })))
const Home = lazy(() => import('./pages/Home').then((page) => ({ default: page.Home })))
const Product = lazy(() => import('./pages/Product').then((page) => ({ default: page.Product })))
const Shop = lazy(() => import('./pages/Shop').then((page) => ({ default: page.Shop })))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}

function PageMeta() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    let title = 'MIRRA — Clothing and accessories for everyday'
    let description = 'Explore sample styles for women and men across clothing, shoes, bags and accessories.'

    if (pathname === '/shop') {
      const params = new URLSearchParams(search)
      const query = params.get('q')?.trim()
      const department = params.get('department') === 'men' ? "Men's" : params.get('department') === 'women' ? "Women's" : ''
      const category = categories.find((item) => item.key === params.get('category'))?.label
      const section = query ? `Search: ${query}` : params.get('sale') === '1' ? `${department} sale`.trim() : department || category ? [department, category ?? 'collection'].filter(Boolean).join(' ') : 'All products'
      title = `${section} | MIRRA`
      description = query ? `Browse MIRRA search results for ${query}.` : `Browse ${section.toLowerCase()} at MIRRA.`
    } else if (pathname.startsWith('/product/')) {
      const product = bySlug(pathname.slice('/product/'.length))
      if (product) {
        title = `${product.name} | MIRRA`
        description = `${product.short}. ${product.description}`
      }
    } else if (pathname === '/about') {
      title = 'About MIRRA | MIRRA'
      description = 'Learn about the MIRRA sample fashion storefront and how to browse its collection.'
    } else if (pathname === '/checkout') {
      title = 'Demo checkout | MIRRA'
      description = 'Review your bag in MIRRA’s demo checkout. No payment is collected.'
    } else if (pathname.startsWith('/order/')) {
      title = 'Demo order confirmation | MIRRA'
      description = 'Your MIRRA demo order confirmation.'
    }

    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [pathname, search])
  return null
}

function Pages() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-[70vh]"
      >
        <Suspense fallback={<div className="min-h-[70vh]" aria-label="Loading page" />}>
          <Routes location={location}>
            <Route index element={<Home />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:slug" element={<Product />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="order/:reference" element={<OrderConfirmed />} />
            <Route path="about" element={<About />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </motion.main>
    </AnimatePresence>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <PageMeta />
        <Nav />
        <Pages />
        <Footer />
        <CartDrawer />
        <MobileTabBar />
      </CartProvider>
    </BrowserRouter>
  )
}
