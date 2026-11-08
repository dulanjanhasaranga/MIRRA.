import { ButtonLink, Container, Reveal } from '../components/ui'
import { categories, products } from '../../data/products'

export function About() {
  return (
    <Container className="pt-8 sm:pt-12">
      <div className="max-w-3xl">
        <p className="text-[12.5px] font-medium uppercase tracking-wider text-muted">About MIRRA</p>
        <h1 className="font-display mt-3 text-balance text-[40px] leading-[0.98] sm:text-[62px]">A clear way to find your next favourite.</h1>
        <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-muted">
          MIRRA is a sample fashion storefront with {products.length} pieces for women and men across {categories.length} categories. Browse by size, price or category, and check materials and care before you add anything to your bag.
        </p>
        <ButtonLink to="/shop" className="mt-7">Explore the collection</ButtonLink>
      </div>

      <Reveal className="image-frame mt-10 aspect-[16/9] overflow-hidden rounded-[16px] sm:mt-12">
        <img src="/images/home/about-hero.webp" alt="Boutique interior with racks of clothing" className="size-full object-cover" loading="lazy" />
      </Reveal>

      <div className="mt-12 grid gap-8 border-t border-line pt-9 sm:grid-cols-3">
        {[
          { title: 'Useful details', body: 'Every listing includes product information, available sizes, colours and care guidance.' },
          { title: 'Easy browsing', body: 'Filter by category, size and price, or search for a specific piece.' },
          { title: 'Demo checkout', body: 'You can try the bag and checkout flow. No payment is collected and no order is shipped.' },
        ].map((item) => (
          <Reveal key={item.title}>
            <h2 className="text-[16px] font-semibold">{item.title}</h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{item.body}</p>
          </Reveal>
        ))}
      </div>
    </Container>
  )
}
