// The catalogue. Reviewed Pexels styling photos are stored locally for every
// item. SVG paths remain as a fallback for future products without a photo.

import photoSlugs from './product-photo-slugs.json'

export type Category =
  | 'dresses'
  | 'tops'
  | 'bottoms'
  | 'denim'
  | 'outerwear'
  | 'knitwear'
  | 'shoes'
  | 'bags'
  | 'accessories'

export type Shape =
  | 'dress-aline'
  | 'dress-slip'
  | 'dress-mini'
  | 'top-tee'
  | 'top-cami'
  | 'top-blouse'
  | 'top-corset'
  | 'bottom-wide'
  | 'shorts'
  | 'skirt-mini'
  | 'skirt-midi'
  | 'jeans'
  | 'denim-jacket'
  | 'blazer'
  | 'coat'
  | 'cardigan'
  | 'sweater'
  | 'heel'
  | 'sneaker'
  | 'boot'
  | 'tote'
  | 'shoulder-bag'
  | 'sunglasses'
  | 'necklace'
  | 'belt'
  | 'scarf'
  | 'cap'

export interface Swatch {
  name: string
  hex: string
}

export interface Product {
  slug: string
  name: string
  price: number
  compareAt?: number
  category: Category
  department?: 'men'
  shape: Shape
  image: string
  hoverImage: string
  badge?: 'New' | 'Bestseller' | 'Low stock' | 'Trending'
  short: string
  description: string
  details: string[]
  materials: string
  sizes: string[]
  colors: Swatch[]
  featured?: boolean
  newIn?: boolean
}

type Draft = Omit<Product, 'image' | 'hoverImage'>

const APPAREL = ['XS', 'S', 'M', 'L', 'XL']
const SHOES = ['36', '37', '38', '39', '40', '41']
const ONE_SIZE = ['One size']
const MEN_APPAREL = ['S', 'M', 'L', 'XL', 'XXL']
const MEN_WAIST = ['30', '32', '34', '36', '38']
const MEN_SHOES = ['40', '41', '42', '43', '44', '45']

const black: Swatch = { name: 'Black', hex: '#22201f' }
const ivory: Swatch = { name: 'Ivory', hex: '#efe9df' }
const cream: Swatch = { name: 'Cream', hex: '#e8ddca' }
const sand: Swatch = { name: 'Sand', hex: '#cbb79c' }
const cocoa: Swatch = { name: 'Cocoa', hex: '#7d5f4c' }
const olive: Swatch = { name: 'Olive', hex: '#77795a' }
const sage: Swatch = { name: 'Sage', hex: '#a9b39b' }
const slate: Swatch = { name: 'Slate', hex: '#5c6672' }
const navy: Swatch = { name: 'Navy', hex: '#2c3548' }
const denimBlue: Swatch = { name: 'Mid blue', hex: '#6b90b4' }
const blueWash: Swatch = { name: 'Light wash', hex: '#9cb8cf' }
const rose: Swatch = { name: 'Rose', hex: '#d3a0a2' }
const burgundy: Swatch = { name: 'Burgundy', hex: '#6d2b36' }
const butter: Swatch = { name: 'Butter', hex: '#e6cf9b' }
const chocolate: Swatch = { name: 'Chocolate', hex: '#4a372c' }
const silver: Swatch = { name: 'Silver', hex: '#b9bdc4' }
const natural: Swatch = { name: 'Natural', hex: '#d8c39b' }

const catalogue: Draft[] = [
  // Dresses
  {
    slug: 'satin-slip-midi-dress',
    name: 'Satin slip midi dress',
    price: 28,
    compareAt: 46,
    category: 'dresses',
    shape: 'dress-slip',
    badge: 'Bestseller',
    short: 'Bias cut · Midi · 2 colours',
    description:
      'The dress that does the work for you. A fluid bias cut, delicate straps and a hem that moves with you — wear it with heels, or flat sandals and a knit over the top.',
    details: ['Bias-cut midi length', 'Adjustable straps', 'Fully lined'],
    materials: '95% polyester, 5% elastane satin. Hand wash cold, line dry.',
    sizes: APPAREL,
    colors: [cream, black, burgundy],
    featured: true,
    newIn: true,
  },
  {
    slug: 'floral-tiered-maxi-dress',
    name: 'Floral tiered maxi dress',
    price: 34,
    compareAt: 52,
    category: 'dresses',
    shape: 'dress-aline',
    badge: 'Trending',
    short: 'Tiered skirt · Maxi · 3 colours',
    description:
      'A breezy tiered maxi with a smocked bodice and a generous swish at the hem. The kind of dress you pack for a weekend and end up wearing every day.',
    details: ['Maxi length', 'Smocked stretch bodice', 'Side pockets'],
    materials: '100% viscose. Machine wash cold, hang dry.',
    sizes: APPAREL,
    colors: [sage, ivory, rose],
    featured: true,
  },
  {
    slug: 'ribbed-bodycon-mini-dress',
    name: 'Ribbed bodycon mini dress',
    price: 19,
    compareAt: 32,
    category: 'dresses',
    shape: 'dress-mini',
    short: 'Stretch rib · Mini · 3 colours',
    description:
      'Second-skin rib knit with a square neck and a length that stays put. Layer it under a blazer for dinner, or wear it alone when the sun is out.',
    details: ['Mini length', 'Square neckline', 'Thick stretch rib'],
    materials: '72% viscose, 24% nylon, 4% elastane. Machine wash cold.',
    sizes: APPAREL,
    colors: [black, cocoa, olive],
    newIn: true,
  },
  {
    slug: 'linen-shirt-dress',
    name: 'Linen-blend shirt dress',
    price: 36,
    category: 'dresses',
    shape: 'dress-aline',
    short: 'Linen blend · Belted · 2 colours',
    description:
      'A clean shirt dress in a breathable linen blend, with a self-tie belt to shape the waist. Buttons down the front so it doubles as a light layer.',
    details: ['Midi length', 'Removable self-tie belt', 'Side seam pockets'],
    materials: '55% linen, 45% viscose. Machine wash cold, warm iron.',
    sizes: APPAREL,
    colors: [ivory, sand, navy],
    featured: true,
  },
  {
    slug: 'crochet-knit-midi-dress',
    name: 'Crochet knit midi dress',
    price: 32,
    compareAt: 48,
    category: 'dresses',
    shape: 'dress-slip',
    badge: 'New',
    short: 'Open knit · Midi · 2 colours',
    description:
      'An airy open-knit dress with a soft lining and a straight neckline. Made for warm evenings and long lunches that turn into dinner.',
    details: ['Midi length', 'Fully lined', 'Stretch knit'],
    materials: '65% cotton, 35% acrylic. Hand wash cold, dry flat.',
    sizes: APPAREL,
    colors: [ivory, cocoa],
    newIn: true,
  },
  {
    slug: 'one-shoulder-ruched-dress',
    name: 'One-shoulder ruched dress',
    price: 26,
    compareAt: 40,
    category: 'dresses',
    shape: 'dress-mini',
    short: 'Ruched side · Mini · 3 colours',
    description:
      'A single shoulder, a lot of drape. The ruched side pulls in where you want it to and the asymmetric hem keeps the line long.',
    details: ['Mini length', 'Ruched side seam', 'Concealed side zip'],
    materials: '92% polyester, 8% elastane. Hand wash cold.',
    sizes: APPAREL,
    colors: [black, burgundy, slate],
    featured: true,
  },
  {
    slug: 'puff-sleeve-wrap-dress',
    name: 'Puff sleeve wrap dress',
    price: 38,
    compareAt: 58,
    category: 'dresses',
    shape: 'dress-aline',
    short: 'Wrap front · Midi · 2 colours',
    description:
      'A true wrap with a deep V and voluminous sleeves that stop just above the wrist. Ties at the side so you can set the neckline yourself.',
    details: ['Midi length', 'True wrap with side tie', 'Elasticated cuffs'],
    materials: '100% viscose crepe. Dry clean or hand wash cold.',
    sizes: APPAREL,
    colors: [butter, black, rose],
  },

  {
    slug: 'satin-column-maxi-dress',
    name: 'Satin column maxi dress',
    price: 39,
    compareAt: 56,
    category: 'dresses',
    shape: 'dress-slip',
    badge: 'New',
    short: 'Column cut · Maxi · 3 colours',
    description:
      'A floor-grazing column in fluid satin, cut on the bias so it moves without clinging. The neckline is high at the front and open at the back.',
    details: ['Maxi length', 'Bias cut', 'Open back with tie'],
    materials: '100% polyester satin, fully lined. Hand wash cold.',
    sizes: APPAREL,
    colors: [slate, black, cream],
    featured: true,
    newIn: true,
  },

  // Tops
  {
    slug: 'cropped-ribbed-tank',
    name: 'Cropped ribbed tank',
    price: 9,
    compareAt: 15,
    category: 'tops',
    shape: 'top-cami',
    badge: 'Bestseller',
    short: 'Rib knit · Cropped · 4 colours',
    description:
      'The layering piece you will buy in every colour. A close rib, a clean neckline and a cropped hem that sits at the waistband.',
    details: ['Cropped length', 'Scoop neck', 'Elasticated straps'],
    materials: '68% cotton, 27% polyester, 5% elastane. Machine wash cold.',
    sizes: APPAREL,
    colors: [ivory, black, sage, rose],
    featured: true,
  },
  {
    slug: 'oversized-cotton-tee',
    name: 'Oversized cotton tee',
    price: 12,
    category: 'tops',
    shape: 'top-tee',
    short: 'Heavy cotton · Relaxed · 3 colours',
    description:
      'A heavyweight cotton tee with dropped shoulders and a boxy body. Tuck the front, leave the back out, done.',
    details: ['Relaxed fit', 'Dropped shoulder', 'Ribbed crew neck'],
    materials: '100% combed cotton, 220 gsm. Machine wash cold.',
    sizes: APPAREL,
    colors: [ivory, black, sand],
    featured: true,
    newIn: true,
  },
  {
    slug: 'satin-corset-top',
    name: 'Satin corset top',
    price: 22,
    compareAt: 34,
    category: 'tops',
    shape: 'top-corset',
    badge: 'Trending',
    short: 'Boned · Satin · 3 colours',
    description:
      'A structured corset in fluid satin, with light boning and a straight neckline. Wear it on its own or over a fine knit.',
    details: ['Cropped length', 'Light boning at the front', 'Back zip'],
    materials: '97% polyester, 3% elastane satin. Hand wash cold.',
    sizes: APPAREL,
    colors: [chocolate, black, silver],
  },
  {
    slug: 'tie-front-blouse',
    name: 'Tie-front blouse',
    price: 24,
    category: 'tops',
    shape: 'top-blouse',
    short: 'Fluid drape · Relaxed · 2 colours',
    description:
      'A soft blouse that ties at the front, with a collar that stays put and sleeves you can roll. Office on Monday, dinner on Friday.',
    details: ['Relaxed fit', 'Front tie', 'Buttoned cuffs'],
    materials: '100% polyester georgette. Machine wash cold, hang dry.',
    sizes: APPAREL,
    colors: [ivory, navy],
  },
  {
    slug: 'sheer-mesh-long-sleeve',
    name: 'Sheer mesh long sleeve',
    price: 18,
    compareAt: 26,
    category: 'tops',
    shape: 'top-blouse',
    badge: 'New',
    short: 'Sheer mesh · Fitted · 3 colours',
    description:
      'A fine mesh top for layering over a tank or under a slip dress. Soft, stretchy and just sheer enough.',
    details: ['Fitted', 'Long sleeves', 'Stretch mesh'],
    materials: '90% nylon, 10% elastane. Hand wash cold.',
    sizes: APPAREL,
    colors: [black, cocoa, ivory],
    newIn: true,
  },
  {
    slug: 'ruched-crop-top',
    name: 'Ruched crop top',
    price: 14,
    compareAt: 22,
    category: 'tops',
    shape: 'top-corset',
    short: 'Ruched sides · Cropped · 2 colours',
    description:
      'A stretch jersey crop with adjustable ruching down both sides, so you can choose how much you show.',
    details: ['Cropped', 'Side ruching', 'Pull on'],
    materials: '95% polyester, 5% elastane jersey. Machine wash cold.',
    sizes: APPAREL,
    colors: [olive, black],
  },
  {
    slug: 'boxy-graphic-tee',
    name: 'Boxy graphic tee',
    price: 16,
    category: 'tops',
    shape: 'top-tee',
    short: 'Printed front · Boxy · 2 colours',
    description:
      'A boxy tee with a faded screen print across the chest. Cut a little shorter so it sits well with high-waisted denim.',
    details: ['Boxy fit', 'Water-based print', 'Crew neck'],
    materials: '100% cotton. Machine wash cold, inside out.',
    sizes: APPAREL,
    colors: [ivory, sand],
    newIn: true,
  },

  {
    slug: 'off-shoulder-knit-top',
    name: 'Off-shoulder knit top',
    price: 21,
    compareAt: 30,
    category: 'tops',
    shape: 'top-blouse',
    badge: 'New',
    short: 'Fold-over neckline · Fitted · 3 colours',
    description:
      'A fine-gauge knit with a fold-over neckline that sits off the shoulder and stays there. Long sleeves, close fit, no fuss.',
    details: ['Off-shoulder neckline', 'Fitted', 'Long sleeves'],
    materials: '62% viscose, 33% nylon, 5% elastane. Hand wash cold.',
    sizes: APPAREL,
    colors: [cream, black, sage],
    newIn: true,
  },

  // Bottoms
  {
    slug: 'high-waist-wide-leg-trousers',
    name: 'High-waist wide-leg trousers',
    price: 32,
    compareAt: 48,
    category: 'bottoms',
    shape: 'bottom-wide',
    badge: 'Bestseller',
    short: 'Wide leg · Full length · 3 colours',
    description:
      'A long, clean wide leg that skims rather than clings, with a high waist and a pressed crease down the front. The trouser that makes a t-shirt look considered.',
    details: ['High rise', 'Wide leg', 'Front crease, side pockets'],
    materials: '78% polyester, 18% viscose, 4% elastane. Machine wash cold.',
    sizes: APPAREL,
    colors: [black, sand, olive],
    featured: true,
  },
  {
    slug: 'pleated-mini-skirt',
    name: 'Pleated mini skirt',
    price: 18,
    compareAt: 28,
    category: 'bottoms',
    shape: 'skirt-mini',
    short: 'Knife pleats · Mini · 3 colours',
    description:
      'Crisp knife pleats with a flat waistband and a hidden zip. Holds its shape all day and swishes when you move.',
    details: ['Mini length', 'Knife pleats', 'Concealed back zip'],
    materials: '100% recycled polyester. Machine wash cold, hang dry.',
    sizes: APPAREL,
    colors: [black, navy, cream],
    featured: true,
    newIn: true,
  },
  {
    slug: 'satin-midi-skirt',
    name: 'Satin midi skirt',
    price: 26,
    category: 'bottoms',
    shape: 'skirt-midi',
    short: 'Bias cut · Midi · 3 colours',
    description:
      'A bias-cut satin skirt that falls in a single, liquid line. Elasticated at the back so it sits flat at the front.',
    details: ['Midi length', 'Bias cut', 'Part-elastic waist'],
    materials: '100% polyester satin. Hand wash cold.',
    sizes: APPAREL,
    colors: [chocolate, ivory, burgundy],
  },
  {
    slug: 'cargo-parachute-pants',
    name: 'Cargo parachute pants',
    price: 36,
    compareAt: 52,
    category: 'bottoms',
    shape: 'bottom-wide',
    badge: 'Trending',
    short: 'Cargo pockets · Relaxed · 2 colours',
    description:
      'A soft parachute pant with a drawcord waist, bellow pockets and a wide, tapered leg. Roomy without looking borrowed.',
    details: ['Mid rise', 'Drawcord waist', 'Six pockets'],
    materials: '100% nylon. Machine wash cold, line dry.',
    sizes: APPAREL,
    colors: [olive, black],
    newIn: true,
  },
  {
    slug: 'tailored-shorts',
    name: 'Tailored shorts',
    price: 20,
    category: 'bottoms',
    shape: 'shorts',
    short: 'Pressed crease · Mid thigh · 3 colours',
    description:
      'Tailored shorts with a high waist, a turned hem and just enough room through the leg. Wear them with the matching blazer.',
    details: ['High rise', 'Pressed crease', 'Belt loops'],
    materials: '70% polyester, 28% viscose, 2% elastane. Machine wash cold.',
    sizes: APPAREL,
    colors: [sand, black, navy],
  },
  {
    slug: 'faux-leather-mini-skirt',
    name: 'Faux leather mini skirt',
    price: 24,
    compareAt: 36,
    category: 'bottoms',
    shape: 'skirt-mini',
    short: 'Soft faux leather · Mini · 2 colours',
    description:
      'A straight-cut faux leather mini with a covered elastic waist at the back. Soft enough to sit in, sharp enough for a night out.',
    details: ['Mini length', 'Soft faux leather', 'Back zip'],
    materials: 'Polyurethane shell, polyester lining. Wipe clean.',
    sizes: APPAREL,
    colors: [black, cocoa],
  },

  {
    slug: 'wide-leg-linen-trousers',
    name: 'Wide-leg linen trousers',
    price: 30,
    compareAt: 44,
    category: 'bottoms',
    shape: 'bottom-wide',
    short: 'Linen blend · High waist · 3 colours',
    description:
      'Airy linen-blend trousers with a high waist, a soft drape and a full leg that covers the shoe. The easy answer to hot days.',
    details: ['High rise', 'Wide leg', 'Part-elastic back waist'],
    materials: '55% linen, 45% viscose. Machine wash cold, warm iron.',
    sizes: APPAREL,
    colors: [natural, black, olive],
    newIn: true,
  },
  {
    slug: 'pleated-satin-midi-skirt',
    name: 'Pleated satin midi skirt',
    price: 27,
    category: 'bottoms',
    shape: 'skirt-midi',
    short: 'Fine pleats · Midi · 2 colours',
    description:
      'Fine sunray pleats in a lightweight satin that catch every bit of light. Elasticated waist, no zip, endless swish.',
    details: ['Midi length', 'Sunray pleats', 'Elasticated waist'],
    materials: '100% recycled polyester satin. Hand wash cold.',
    sizes: APPAREL,
    colors: [chocolate, sage],
  },

  // Denim
  {
    slug: 'straight-leg-jeans',
    name: 'Straight-leg jeans',
    price: 38,
    compareAt: 56,
    category: 'denim',
    shape: 'jeans',
    badge: 'Bestseller',
    short: 'High waist · Straight · 3 washes',
    description:
      'The straight leg that goes with everything, cut from rigid cotton denim with a high waist and a full-length inseam. Softens with wear, keeps its shape.',
    details: ['High rise, 30 cm', 'Straight leg', '5-pocket construction'],
    materials: '99% cotton, 1% elastane. Machine wash cold, inside out.',
    sizes: APPAREL,
    colors: [denimBlue, blueWash, black],
    featured: true,
  },
  {
    slug: 'wide-leg-jeans',
    name: 'Wide-leg jeans',
    price: 42,
    category: 'denim',
    shape: 'jeans',
    short: 'High waist · Wide leg · 2 washes',
    description:
      'A wide, floor-skimming leg with a clean high waist. Cut long on purpose — wear them with a platform or a heel.',
    details: ['High rise', 'Wide leg', 'Long inseam, 81 cm'],
    materials: '100% cotton denim. Machine wash cold.',
    sizes: APPAREL,
    colors: [blueWash, navy],
    newIn: true,
  },
  {
    slug: 'denim-jacket',
    name: 'Oversized denim jacket',
    price: 48,
    compareAt: 68,
    category: 'denim',
    shape: 'denim-jacket',
    badge: 'Trending',
    short: 'Oversized · Rigid denim · 2 washes',
    description:
      'A boxy trucker jacket with dropped shoulders and room for a hoodie underneath. Rigid at first, then yours.',
    details: ['Oversized fit', 'Chest flap pockets', 'Adjustable waist tabs'],
    materials: '100% cotton denim. Machine wash cold, inside out.',
    sizes: APPAREL,
    colors: [denimBlue, black],
    featured: true,
  },
  {
    slug: 'denim-mini-skirt',
    name: 'Denim mini skirt',
    price: 26,
    category: 'denim',
    shape: 'skirt-mini',
    short: 'A-line · Mini · 2 washes',
    description:
      'A simple A-line mini in rigid denim, with a raw hem and a button front. Sits high on the waist and stays there.',
    details: ['High rise', 'Button front', 'Raw hem'],
    materials: '100% cotton denim. Machine wash cold.',
    sizes: APPAREL,
    colors: [blueWash, denimBlue],
    newIn: true,
  },
  {
    slug: 'low-rise-baggy-jeans',
    name: 'Low-rise baggy jeans',
    price: 44,
    compareAt: 62,
    category: 'denim',
    shape: 'jeans',
    short: 'Low waist · Baggy · 2 washes',
    description:
      'A low, easy waist with a leg that pools at the shoe. Washed to a soft, worn-in blue that only gets better.',
    details: ['Low rise', 'Baggy leg', 'Extra-long inseam'],
    materials: '100% cotton denim. Machine wash cold.',
    sizes: APPAREL,
    colors: [blueWash, denimBlue],
  },

  {
    slug: 'barrel-leg-jeans',
    name: 'Barrel-leg jeans',
    price: 46,
    compareAt: 64,
    category: 'denim',
    shape: 'jeans',
    badge: 'Trending',
    short: 'Curved leg · High waist · 2 washes',
    description:
      'A curved, barrel-shaped leg that tapers back in at the ankle. Cut from a mid-weight denim that holds the shape.',
    details: ['High rise', 'Curved barrel leg', 'Tapered ankle'],
    materials: '100% cotton denim. Machine wash cold, inside out.',
    sizes: APPAREL,
    colors: [blueWash, black],
    featured: true,
    newIn: true,
  },
  {
    slug: 'denim-cargo-jeans',
    name: 'Denim cargo jeans',
    price: 48,
    category: 'denim',
    shape: 'jeans',
    short: 'Cargo pockets · Relaxed · 2 washes',
    description:
      'Relaxed denim with bellow pockets down the leg and a drawcord hem you can cinch or leave wide.',
    details: ['Mid rise', 'Four cargo pockets', 'Drawcord hems'],
    materials: '100% cotton denim. Machine wash cold.',
    sizes: APPAREL,
    colors: [denimBlue, olive],
    newIn: true,
  },
  {
    slug: 'denim-chore-jacket',
    name: 'Denim chore jacket',
    price: 44,
    compareAt: 58,
    category: 'denim',
    shape: 'denim-jacket',
    short: 'Chore cut · Patch pockets · 2 washes',
    description:
      'A straight chore jacket with three patch pockets and a corduroy collar. Lighter than a trucker, easier to layer.',
    details: ['Relaxed fit', 'Three patch pockets', 'Corduroy collar'],
    materials: '100% cotton denim. Machine wash cold.',
    sizes: APPAREL,
    colors: [blueWash, navy],
    featured: true,
  },

  // Outerwear
  {
    slug: 'oversized-blazer',
    name: 'Oversized blazer',
    price: 52,
    compareAt: 78,
    category: 'outerwear',
    shape: 'blazer',
    badge: 'Trending',
    short: 'Relaxed shoulder · Lined · 3 colours',
    description:
      'A long, softly padded blazer with a single button and a straight hem. Sharp over a tee, easy over a dress.',
    details: ['Oversized fit', 'Single-button front', 'Full lining'],
    materials: '68% polyester, 30% viscose, 2% elastane. Dry clean.',
    sizes: APPAREL,
    colors: [black, sand, olive],
    featured: true,
  },
  {
    slug: 'belted-trench-coat',
    name: 'Belted trench coat',
    price: 68,
    compareAt: 98,
    category: 'outerwear',
    shape: 'coat',
    short: 'Belted · Mid calf · 2 colours',
    description:
      'A classic double-breasted trench with a storm flap, belted waist and a hem that covers a midi dress. Cut roomy for layering.',
    details: ['Mid-calf length', 'Removable belt', 'Storm flap and epaulettes'],
    materials: '100% cotton gabardine, polyester lining. Dry clean.',
    sizes: APPAREL,
    colors: [sand, black],
    featured: true,
  },
  {
    slug: 'cropped-puffer-jacket',
    name: 'Cropped puffer jacket',
    price: 46,
    category: 'outerwear',
    shape: 'coat',
    badge: 'New',
    short: 'Cropped · High collar · 3 colours',
    description:
      'Light, warm and cropped at the waist, with a high collar that does the job of a scarf. Packs down small.',
    details: ['Cropped fit', 'Recycled fill', 'Zip side pockets'],
    materials: 'Recycled polyester shell and fill. Machine wash cold.',
    sizes: APPAREL,
    colors: [black, olive, cream],
    newIn: true,
  },
  {
    slug: 'faux-leather-biker-jacket',
    name: 'Faux leather biker jacket',
    price: 58,
    compareAt: 84,
    category: 'outerwear',
    shape: 'denim-jacket',
    short: 'Asymmetric zip · Soft faux leather',
    description:
      'A biker cut in soft faux leather, with an asymmetric zip, notched lapels and a waist that sits just right. Lined for comfort.',
    details: ['Slim fit', 'Asymmetric zip', 'Zip cuffs'],
    materials: 'Polyurethane shell, polyester lining. Wipe clean.',
    sizes: APPAREL,
    colors: [black, chocolate],
  },
  {
    slug: 'wool-blend-overcoat',
    name: 'Wool-blend overcoat',
    price: 78,
    compareAt: 112,
    category: 'outerwear',
    shape: 'coat',
    short: 'Wool blend · Longline · 2 colours',
    description:
      'A longline coat in a wool-rich blend with a clean, concealed front and a collar that stands up against the wind.',
    details: ['Longline fit', 'Concealed button front', 'Two welt pockets'],
    materials: '60% wool, 35% polyester, 5% other fibres. Dry clean.',
    sizes: APPAREL,
    colors: [cocoa, navy],
    newIn: true,
  },

  {
    slug: 'utility-shacket',
    name: 'Utility shacket',
    price: 54,
    compareAt: 76,
    category: 'outerwear',
    shape: 'denim-jacket',
    badge: 'New',
    short: 'Overshirt · Brushed twill · 2 colours',
    description:
      'Part shirt, part jacket: a brushed cotton overshirt with big patch pockets and a boxy cut that sits over a hoodie.',
    details: ['Boxy fit', 'Two chest pockets', 'Horn-effect buttons'],
    materials: '100% brushed cotton twill. Machine wash cold.',
    sizes: APPAREL,
    colors: [sand, olive],
    newIn: true,
  },
  {
    slug: 'quilted-liner-jacket',
    name: 'Quilted liner jacket',
    price: 49,
    category: 'outerwear',
    shape: 'coat',
    short: 'Diamond quilt · Lightweight · 2 colours',
    description:
      'A thin diamond-quilted liner that works on its own in autumn and under a coat in winter. Packs flat into a bag.',
    details: ['Regular fit', 'Diamond quilting', 'Snap front'],
    materials: 'Recycled polyester shell and fill. Machine wash cold.',
    sizes: APPAREL,
    colors: [black, cocoa],
    featured: true,
  },
  {
    slug: 'tailored-wool-blazer',
    name: 'Tailored wool blazer',
    price: 66,
    compareAt: 92,
    category: 'outerwear',
    shape: 'blazer',
    short: 'Single breasted · Wool blend · 3 colours',
    description:
      'A sharper, shorter blazer than the oversized one: nipped at the waist, single breasted and fully lined.',
    details: ['Tailored fit', 'Two-button front', 'Double vent'],
    materials: '52% wool, 44% polyester, 4% elastane. Dry clean.',
    sizes: APPAREL,
    colors: [black, navy, sand],
  },

  // Knitwear
  {
    slug: 'chunky-cable-cardigan',
    name: 'Chunky cable cardigan',
    price: 42,
    compareAt: 60,
    category: 'knitwear',
    shape: 'cardigan',
    badge: 'Bestseller',
    short: 'Cable knit · Oversized · 2 colours',
    description:
      'A heavy cable knit with deep pockets and a relaxed, open front. The layer you keep on the back of the chair from October to March.',
    details: ['Oversized fit', 'Patch pockets', 'Horn-effect buttons'],
    materials: '50% acrylic, 30% wool, 20% nylon. Hand wash cold, dry flat.',
    sizes: APPAREL,
    colors: [cream, cocoa],
    featured: true,
  },
  {
    slug: 'cropped-knit-sweater',
    name: 'Cropped knit sweater',
    price: 28,
    category: 'knitwear',
    shape: 'sweater',
    short: 'Soft knit · Cropped · 3 colours',
    description:
      'A fine, soft knit with a slightly cropped hem and a wide crew neck. Made to sit on top of high-waisted everything.',
    details: ['Cropped', 'Wide crew neck', 'Ribbed hem and cuffs'],
    materials: '55% acrylic, 30% nylon, 15% wool. Hand wash cold.',
    sizes: APPAREL,
    colors: [sage, ivory, burgundy],
    newIn: true,
  },
  {
    slug: 'knit-midi-dress',
    name: 'Knit midi dress',
    price: 44,
    compareAt: 64,
    category: 'knitwear',
    shape: 'dress-aline',
    short: 'Rib knit · Midi · 2 colours',
    description:
      'A column of soft rib knit with long sleeves and a high neck. Heavy enough to hold its line, easy enough for all day.',
    details: ['Midi length', 'Mock neck', 'Stretch rib'],
    materials: '70% viscose, 30% nylon. Hand wash cold, dry flat.',
    sizes: APPAREL,
    colors: [olive, black],
    featured: true,
  },
  {
    slug: 'ribbed-knit-set',
    name: 'Ribbed knit set',
    price: 49,
    compareAt: 72,
    category: 'knitwear',
    shape: 'sweater',
    badge: 'Trending',
    short: 'Two piece · Knit · 2 colours',
    description:
      'A matched set: a fitted knit top and a midi skirt, sold together. Wear them as one, then split them across everything else.',
    details: ['Two-piece set', 'Stretch rib', 'Midi skirt included'],
    materials: '75% viscose, 25% nylon. Hand wash cold.',
    sizes: APPAREL,
    colors: [cream, slate],
  },
  {
    slug: 'mohair-blend-cardigan',
    name: 'Mohair-blend cardigan',
    price: 38,
    category: 'knitwear',
    shape: 'cardigan',
    short: 'Brushed mohair · Relaxed · 3 colours',
    description:
      'A brushed, cloud-soft cardigan with a V neck and small pearlescent buttons. Light as air, warmer than it looks.',
    details: ['Relaxed fit', 'V neck', 'Ribbed trims'],
    materials: '40% mohair, 30% acrylic, 30% nylon. Hand wash cold.',
    sizes: APPAREL,
    colors: [rose, ivory, slate],
  },

  {
    slug: 'ribbed-knit-tank',
    name: 'Ribbed knit tank',
    price: 17,
    compareAt: 25,
    category: 'knitwear',
    shape: 'sweater',
    short: 'Fine rib · Fitted · 3 colours',
    description:
      'A fine rib tank with a high neck and a hem that sits at the waistband. The base layer under everything else.',
    details: ['Fitted', 'High round neck', 'Ribbed trims'],
    materials: '70% viscose, 30% nylon. Hand wash cold.',
    sizes: APPAREL,
    colors: [ivory, black, burgundy],
    newIn: true,
  },
  {
    slug: 'oversized-v-neck-sweater',
    name: 'Oversized V-neck sweater',
    price: 36,
    category: 'knitwear',
    shape: 'sweater',
    short: 'Dropped shoulder · Oversized · 3 colours',
    description:
      'A soft, roomy V-neck with dropped shoulders and a long body. Sized to be worn over a shirt or a slip dress.',
    details: ['Oversized fit', 'Dropped shoulder', 'Side splits'],
    materials: '60% acrylic, 25% wool, 15% nylon. Hand wash cold.',
    sizes: APPAREL,
    colors: [cream, slate, olive],
    featured: true,
  },
  {
    slug: 'knit-polo-sweater',
    name: 'Knit polo sweater',
    price: 32,
    compareAt: 46,
    category: 'knitwear',
    shape: 'cardigan',
    short: 'Polo collar · Relaxed · 2 colours',
    description:
      'A short-sleeve knit polo with a soft open collar and a boxy body. Smart enough for work, easy enough for the weekend.',
    details: ['Relaxed fit', 'Short sleeves', 'Three-button placket'],
    materials: '55% cotton, 45% acrylic. Machine wash cold.',
    sizes: APPAREL,
    colors: [sage, cream],
  },

  // Shoes
  {
    slug: 'pointed-toe-stiletto',
    name: 'Pointed-toe stiletto',
    price: 42,
    compareAt: 62,
    category: 'shoes',
    shape: 'heel',
    badge: 'Bestseller',
    short: '9 cm heel · Pointed · 3 colours',
    description:
      'A clean pointed pump on a 9 cm stiletto, with a lightly cushioned footbed so you can actually stay in them.',
    details: ['9 cm heel', 'Pointed toe', 'Cushioned insole'],
    materials: 'Faux leather upper, synthetic sole. Wipe clean.',
    sizes: SHOES,
    colors: [black, cream, burgundy],
    featured: true,
  },
  {
    slug: 'chunky-retro-sneakers',
    name: 'Chunky retro sneakers',
    price: 39,
    category: 'shoes',
    shape: 'sneaker',
    short: 'Platform sole · Retro · 3 colours',
    description:
      'A low-profile retro runner on a chunky, lightweight sole. The pair that makes wide-leg trousers sit exactly right.',
    details: ['4 cm platform sole', 'Padded collar', 'Lace-up'],
    materials: 'Mesh and faux suede upper, rubber sole.',
    sizes: SHOES,
    colors: [ivory, silver, sage],
    featured: true,
    newIn: true,
  },
  {
    slug: 'square-toe-ankle-boots',
    name: 'Square-toe ankle boots',
    price: 56,
    compareAt: 78,
    category: 'shoes',
    shape: 'boot',
    short: '6 cm block heel · Ankle · 2 colours',
    description:
      'A square-toe ankle boot on a low block heel, with an inside zip and a shaft that fits under a straight jean.',
    details: ['6 cm block heel', 'Inside zip', 'Square toe'],
    materials: 'Faux leather upper, synthetic sole. Wipe clean.',
    sizes: SHOES,
    colors: [black, chocolate],
  },
  {
    slug: 'strappy-heeled-sandals',
    name: 'Strappy heeled sandals',
    price: 34,
    category: 'shoes',
    shape: 'heel',
    short: 'Fine straps · 8 cm heel · 3 colours',
    description:
      'Barely-there straps on a slim heel, with an adjustable ankle buckle. Made for long evenings and short dresses.',
    details: ['8 cm heel', 'Adjustable ankle strap', 'Padded footbed'],
    materials: 'Faux leather straps, synthetic sole.',
    sizes: SHOES,
    colors: [black, cream, rose],
    newIn: true,
  },
  {
    slug: 'canvas-platform-sneakers',
    name: 'Canvas platform sneakers',
    price: 32,
    compareAt: 44,
    category: 'shoes',
    shape: 'sneaker',
    short: 'Canvas · 5 cm platform · 2 colours',
    description:
      'A canvas high-top on a chunky platform sole, with a padded ankle and a rubber toe cap. Easy height, zero effort.',
    details: ['5 cm platform', 'Canvas upper', 'Rubber toe cap'],
    materials: 'Cotton canvas upper, rubber sole.',
    sizes: SHOES,
    colors: [ivory, black],
  },

  {
    slug: 'slingback-kitten-heels',
    name: 'Slingback kitten heels',
    price: 36,
    compareAt: 52,
    category: 'shoes',
    shape: 'heel',
    badge: 'New',
    short: '5 cm kitten heel · Slingback · 3 colours',
    description:
      'A pointed slingback on a low kitten heel, with an elasticated back strap that holds without pinching.',
    details: ['5 cm kitten heel', 'Elastic slingback', 'Pointed toe'],
    materials: 'Faux leather upper, synthetic sole. Wipe clean.',
    sizes: SHOES,
    colors: [black, cream, burgundy],
    featured: true,
    newIn: true,
  },
  {
    slug: 'chunky-lug-boots',
    name: 'Chunky lug boots',
    price: 62,
    compareAt: 86,
    category: 'shoes',
    shape: 'boot',
    short: 'Lug sole · Mid calf · 2 colours',
    description:
      'A mid-calf boot on a deep lug sole, with a padded collar and a full-length inside zip. Built for weather.',
    details: ['4 cm lug sole', 'Mid-calf shaft', 'Inside zip'],
    materials: 'Faux leather upper, rubber lug sole. Wipe clean.',
    sizes: SHOES,
    colors: [black, chocolate],
    featured: true,
  },
  {
    slug: 'retro-court-sneakers',
    name: 'Retro court sneakers',
    price: 34,
    category: 'shoes',
    shape: 'sneaker',
    short: 'Low profile · Leather look · 3 colours',
    description:
      'A clean, low court sneaker with a slim rubber sole and a perforated toe. The pair that goes with a blazer.',
    details: ['Low profile', 'Padded footbed', 'Lace-up'],
    materials: 'Faux leather upper, rubber sole.',
    sizes: SHOES,
    colors: [ivory, black, sage],
    newIn: true,
  },

  // Bags
  {
    slug: 'structured-tote-bag',
    name: 'Structured tote bag',
    price: 38,
    compareAt: 54,
    category: 'bags',
    shape: 'tote',
    badge: 'Bestseller',
    short: 'Fits a laptop · Zip top · 3 colours',
    description:
      'A clean, structured tote with a zip top, an inside pocket and handles long enough for a shoulder. Fits a 14-inch laptop.',
    details: ['Fits a 14-inch laptop', 'Zip closure', 'Inside zip pocket'],
    materials: 'Faux leather, recycled polyester lining.',
    sizes: ONE_SIZE,
    colors: [cocoa, black, cream],
    featured: true,
  },
  {
    slug: 'quilted-shoulder-bag',
    name: 'Quilted shoulder bag',
    price: 34,
    category: 'bags',
    shape: 'shoulder-bag',
    short: 'Diamond quilt · Chain strap',
    description:
      'A compact quilted shoulder bag with a sliding chain strap so it can be worn short or long. Holds phone, cardholder and lipstick.',
    details: ['Diamond quilting', 'Convertible chain strap', 'Magnetic flap'],
    materials: 'Faux leather, textile lining.',
    sizes: ONE_SIZE,
    colors: [black, cream, burgundy],
    newIn: true,
  },
  {
    slug: 'mini-crescent-bag',
    name: 'Mini crescent bag',
    price: 26,
    compareAt: 38,
    category: 'bags',
    shape: 'shoulder-bag',
    badge: 'Trending',
    short: 'Curved silhouette · Adjustable strap',
    description:
      'The little crescent that goes everywhere — soft, curved and just big enough. Adjust the webbing strap and wear it crossbody.',
    details: ['Adjustable webbing strap', 'Zip top', 'Card slip inside'],
    materials: 'Recycled nylon, polyester lining.',
    sizes: ONE_SIZE,
    colors: [black, olive, silver],
    featured: true,
  },
  {
    slug: 'woven-raffia-tote',
    name: 'Woven raffia tote',
    price: 32,
    category: 'bags',
    shape: 'tote',
    short: 'Hand woven · Straw · Natural',
    description:
      'A hand-woven raffia tote with soft leather-look handles and an open top. The bag that makes a plain outfit look like a holiday.',
    details: ['Hand woven', 'Open top', 'Removable inner pouch'],
    materials: 'Natural raffia, faux leather handles.',
    sizes: ONE_SIZE,
    colors: [natural, black],
    newIn: true,
  },

  {
    slug: 'canvas-weekender-tote',
    name: 'Canvas weekender tote',
    price: 42,
    compareAt: 58,
    category: 'bags',
    shape: 'tote',
    short: 'Heavy canvas · Fits a change of clothes · 2 colours',
    description:
      'A big, soft canvas tote with reinforced handles and a zip pocket inside. Sized for a night away or a very full day.',
    details: ['Fits a change of clothes', 'Reinforced handles', 'Inside zip pocket'],
    materials: '18 oz cotton canvas, faux leather trim.',
    sizes: ONE_SIZE,
    colors: [natural, black],
    featured: true,
  },
  {
    slug: 'mini-top-handle-bag',
    name: 'Mini top-handle bag',
    price: 29,
    category: 'bags',
    shape: 'shoulder-bag',
    badge: 'New',
    short: 'Boxy shape · Detachable strap',
    description:
      'A little box bag with a rigid top handle and a detachable crossbody strap. Holds a phone, cards and keys, nothing more.',
    details: ['Structured box shape', 'Detachable strap', 'Magnetic closure'],
    materials: 'Faux leather, textile lining.',
    sizes: ONE_SIZE,
    colors: [cream, black, cocoa],
    newIn: true,
  },
  {
    slug: 'nylon-crossbody-bag',
    name: 'Nylon crossbody bag',
    price: 22,
    compareAt: 32,
    category: 'bags',
    shape: 'shoulder-bag',
    short: 'Water resistant · Adjustable strap',
    description:
      'A light, water-resistant crossbody with a wide adjustable strap and three separate zip sections. The everyday one.',
    details: ['Water-resistant shell', 'Three zip sections', 'Adjustable webbing strap'],
    materials: 'Recycled nylon, polyester lining.',
    sizes: ONE_SIZE,
    colors: [black, olive, slate],
    newIn: true,
  },
  {
    slug: 'crescent-hobo-bag',
    name: 'Crescent hobo bag',
    price: 36,
    compareAt: 50,
    category: 'bags',
    shape: 'shoulder-bag',
    short: 'Slouchy hobo · Shoulder strap',
    description:
      'A slouchy, oversized hobo that sits under the arm and holds everything. Soft shell, magnetic top, one big compartment.',
    details: ['Oversized hobo shape', 'Magnetic top', 'Inside slip pocket'],
    materials: 'Faux leather, recycled polyester lining.',
    sizes: ONE_SIZE,
    colors: [chocolate, black, sand],
    featured: true,
  },

  // Accessories
  {
    slug: 'oval-frame-sunglasses',
    name: 'Oval frame sunglasses',
    price: 14,
    compareAt: 22,
    category: 'accessories',
    shape: 'sunglasses',
    short: 'UV400 · Slim metal arms',
    description:
      'Slim oval frames with a slight cat-eye lift and full UV400 protection. Small, sharp and easy to wear with anything.',
    details: ['UV400 protection', 'Metal temples', 'Includes cloth pouch'],
    materials: 'Acetate front, metal temples, polycarbonate lenses.',
    sizes: ONE_SIZE,
    colors: [black, cocoa, silver],
    featured: true,
  },
  {
    slug: 'layered-gold-necklace',
    name: 'Layered gold necklace',
    price: 12,
    category: 'accessories',
    shape: 'necklace',
    short: 'Set of two · Gold tone',
    description:
      'Two chains, one clasp: a fine snake chain and a longer pendant, designed to sit apart. Adjustable at the back.',
    details: ['Set of two', 'Adjustable length', 'Lobster clasp'],
    materials: 'Gold-tone stainless steel, glass pendant.',
    sizes: ONE_SIZE,
    colors: [
      { name: 'Gold', hex: '#c9a961' },
      { name: 'Silver', hex: '#b9bdc4' },
    ],
    newIn: true,
  },
  {
    slug: 'slim-leather-belt',
    name: 'Slim leather belt',
    price: 16,
    category: 'accessories',
    shape: 'belt',
    short: '2 cm wide · Gold buckle · 3 colours',
    description:
      'A narrow belt with a small gold-tone buckle, made to sit at the waist of a blazer or the loops of a jean.',
    details: ['2 cm wide', 'Five holes', 'Gold-tone buckle'],
    materials: 'Split leather with polyurethane finish.',
    sizes: ['S/M', 'L/XL'],
    colors: [black, cocoa, cream],
  },
  {
    slug: 'printed-silk-scarf',
    name: 'Printed silk scarf',
    price: 18,
    compareAt: 26,
    category: 'accessories',
    shape: 'scarf',
    short: '90 cm square · Hand rolled',
    description:
      'A 90 cm square in washed silk with a hand-rolled edge. Tie it at the neck, in your hair, or on the handle of your bag.',
    details: ['90 by 90 cm', 'Hand-rolled edge', 'Printed in small batches'],
    materials: '100% mulberry silk. Dry clean.',
    sizes: ONE_SIZE,
    colors: [rose, sage, burgundy],
    featured: true,
  },
  {
    slug: 'washed-cotton-cap',
    name: 'Washed cotton cap',
    price: 15,
    category: 'accessories',
    shape: 'cap',
    short: 'Washed cotton · Adjustable',
    description:
      'A soft, unstructured six-panel cap in washed cotton, with a brass slider at the back and a slightly curved brim.',
    details: ['Six-panel', 'Adjustable metal slider', 'Curved brim'],
    materials: '100% cotton twill.',
    sizes: ONE_SIZE,
    colors: [sand, black, denimBlue],
    featured: true,
  },
  {
    slug: 'cat-eye-sunglasses',
    name: 'Cat-eye sunglasses',
    price: 15,
    compareAt: 24,
    category: 'accessories',
    shape: 'sunglasses',
    badge: 'New',
    short: 'UV400 · Angled frame',
    description:
      'A sharper cat-eye with a thick acetate frame and tinted UV400 lenses. The kind of shape that finishes a plain outfit.',
    details: ['UV400 protection', 'Acetate frame', 'Includes cloth pouch'],
    materials: 'Acetate frame, polycarbonate lenses.',
    sizes: ONE_SIZE,
    colors: [black, cocoa, cream],
    newIn: true,
  },
  {
    slug: 'woven-leather-belt',
    name: 'Woven leather belt',
    price: 19,
    category: 'accessories',
    shape: 'belt',
    short: '3 cm wide · Woven · 3 colours',
    description:
      'A woven belt you can fasten anywhere along the strap, with a brushed metal buckle. Works at the waist or on the hip.',
    details: ['3 cm wide', 'Fasten anywhere', 'Brushed buckle'],
    materials: 'Woven split leather, metal buckle.',
    sizes: ['S/M', 'L/XL'],
    colors: [cocoa, black, natural],
  },
  {
    slug: 'satin-headscarf',
    name: 'Satin headscarf',
    price: 11,
    compareAt: 18,
    category: 'accessories',
    shape: 'scarf',
    short: '55 cm square · Satin finish',
    description:
      'A small satin square for your hair, your neck or a bag handle. Hand-rolled edge, decent weight, easy knot.',
    details: ['55 by 55 cm', 'Hand-rolled edge', 'Printed in small batches'],
    materials: '100% polyester satin. Hand wash cold.',
    sizes: ONE_SIZE,
    colors: [butter, burgundy, sage],
  },
  {
    slug: 'cotton-poplin-shirt', name: 'Cotton poplin shirt', price: 34,
    category: 'tops', shape: 'top-blouse', badge: 'New',
    short: '100% cotton · Relaxed fit',
    description: 'A crisp everyday shirt with a relaxed cut, curved hem and room through the shoulders. Wear it tucked or open over a tank.',
    details: ['Relaxed fit', 'Button cuffs', 'Curved hem'],
    materials: '100% cotton poplin. Machine wash cold, hang dry.',
    sizes: APPAREL, colors: [ivory, blueWash, black], newIn: true,
  },
  {
    slug: 'fine-gauge-turtleneck', name: 'Fine-gauge turtleneck', price: 29,
    category: 'knitwear', shape: 'sweater', badge: 'New',
    short: 'Soft knit · Slim fit',
    description: 'A light, close-fitting layer with a fold-over neck and enough stretch to sit comfortably under a jacket.',
    details: ['Slim fit', 'Fold-over neck', 'Ribbed cuffs'],
    materials: '70% viscose, 30% nylon. Hand wash cold, dry flat.',
    sizes: APPAREL, colors: [cocoa, cream, black], newIn: true,
  },
  {
    slug: 'pleated-wide-leg-trousers', name: 'Pleated wide-leg trousers', price: 46,
    category: 'bottoms', shape: 'bottom-wide', badge: 'New',
    short: 'Front pleats · Full length',
    description: 'Easy tailoring with a high waist, clean front pleats and a full-length leg. The waistband has a little stretch at the back.',
    details: ['High rise', 'Side pockets', 'Elasticated back waistband'],
    materials: '76% polyester, 19% viscose, 5% elastane. Machine wash cold.',
    sizes: APPAREL, colors: [slate, black, sand], newIn: true, featured: true,
  },
  {
    slug: 'relaxed-straight-jeans', name: 'Relaxed straight jeans', price: 48,
    category: 'denim', shape: 'jeans', badge: 'New',
    short: 'Mid rise · Rigid denim',
    description: 'A straight leg with a little more room through the thigh, cut from sturdy cotton denim that softens with wear.',
    details: ['Mid rise', 'Five-pocket styling', 'Full length'],
    materials: '100% cotton denim. Machine wash inside out with similar colours.',
    sizes: APPAREL, colors: [denimBlue, blueWash, black], newIn: true,
  },
  {
    slug: 'longline-wool-blazer', name: 'Longline wool-blend blazer', price: 58,
    category: 'outerwear', shape: 'blazer', badge: 'New',
    short: 'Tailored blazer · Fully lined',
    description: 'A tailored layer with a clean lapel and a straight, longline shape. Wear it over shirting or a fine knit.',
    details: ['Longline fit', 'Single-button front', 'Fully lined'],
    materials: '52% wool, 48% polyester; polyester lining. Dry clean.',
    sizes: APPAREL, colors: [sand, black, cocoa], newIn: true,
  },
  {
    slug: 'square-neck-midi-dress', name: 'Square-neck midi dress', price: 42,
    category: 'dresses', shape: 'dress-aline', badge: 'New',
    short: 'Cotton blend · Midi length',
    description: 'A simple square-neck dress with a shaped waist and softly flared skirt. Wide straps cover a standard bra.',
    details: ['Midi length', 'Side pockets', 'Concealed back zip'],
    materials: '62% cotton, 35% polyester, 3% elastane. Machine wash cold.',
    sizes: APPAREL, colors: [navy, butter, black], newIn: true, featured: true,
  },
  {
    slug: 'everyday-block-heels', name: 'Everyday block heels', price: 64,
    category: 'shoes', shape: 'heel', badge: 'New',
    short: 'Leather upper · Block heel',
    description: 'A simple closed-toe heel with a cushioned footbed and stable block heel for long days on your feet.',
    details: ['5 cm block heel', 'Cushioned footbed', 'Slip-on style'],
    materials: 'Leather upper, synthetic lining and rubber outsole. Wipe clean.',
    sizes: SHOES, colors: [black, cocoa], newIn: true,
  },
  {
    slug: 'suede-effect-crossbody', name: 'Suede-effect crossbody bag', price: 38,
    category: 'bags', shape: 'shoulder-bag', badge: 'New',
    short: 'Adjustable strap · Zip closure',
    description: 'A compact everyday bag with a secure zip top, internal slip pocket and an adjustable strap that sits comfortably crossbody.',
    details: ['24 × 17 × 7 cm', 'Internal slip pocket', 'Adjustable strap'],
    materials: 'Polyester suede-effect outer; recycled polyester lining. Spot clean.',
    sizes: ONE_SIZE, colors: [chocolate, sand, black], newIn: true,
  },
  {
    slug: 'canvas-weekend-cap', name: 'Canvas weekend cap', price: 19,
    category: 'accessories', shape: 'cap', badge: 'New',
    short: 'Cotton canvas · Adjustable',
    description: 'An easy, unstructured cap with a curved brim and adjustable back strap.',
    details: ['Curved brim', 'Adjustable back strap', 'Cotton lining'],
    materials: '100% cotton canvas. Spot clean.',
    sizes: ONE_SIZE, colors: [natural, black, olive], newIn: true,
  },
  {
    slug: 'linen-blend-shorts', name: 'Linen-blend tailored shorts', price: 32,
    category: 'bottoms', shape: 'shorts', badge: 'New',
    short: 'Linen blend · Relaxed fit',
    description: 'Warm-weather shorts with a softly structured waistband, neat front pleats and practical side pockets.',
    details: ['Mid rise', 'Side pockets', 'Zip and button closure'],
    materials: '55% linen, 45% viscose. Machine wash cold, hang dry.',
    sizes: APPAREL, colors: [natural, black, olive], newIn: true,
  },
  {
    slug: 'lightweight-crewneck-tee', name: 'Lightweight crewneck tee', price: 18,
    category: 'tops', shape: 'top-tee', badge: 'New',
    short: 'Organic cotton · Regular fit',
    description: 'The simple tee that works with everything: soft cotton jersey, a classic crew neck and a straight hem.',
    details: ['Regular fit', 'Crew neck', 'Straight hem'],
    materials: '100% organic cotton jersey. Machine wash cold.',
    sizes: APPAREL, colors: [ivory, black, rose], newIn: true,
  },
  {
    slug: 'compact-zip-tote', name: 'Compact zip tote', price: 44,
    category: 'bags', shape: 'tote', badge: 'New',
    short: 'Zip top · Everyday carry',
    description: 'A smaller tote with a secure zip top, two interior pockets and handles long enough to sit on the shoulder.',
    details: ['31 × 25 × 12 cm', 'Zip closure', 'Two interior pockets'],
    materials: 'Cotton canvas outer, recycled polyester lining. Spot clean.',
    sizes: ONE_SIZE, colors: [natural, black, olive], newIn: true,
  },
  // Men's collection
  {
    slug: 'mens-oxford-shirt', name: "Men's Oxford shirt", price: 38,
    category: 'tops', department: 'men', shape: 'top-blouse', badge: 'New',
    short: 'Button-down · Regular fit',
    description: 'A clean button-down shirt that works with denim or tailoring. Cut for comfortable everyday wear.',
    details: ['Regular fit', 'Button-down collar', 'Long sleeves'],
    materials: 'Cotton-rich woven fabric. Machine wash cold.',
    sizes: MEN_APPAREL, colors: [ivory, blueWash, navy], newIn: true, featured: true,
  },
  {
    slug: 'mens-heavyweight-tee', name: "Men's heavyweight tee", price: 24,
    category: 'tops', department: 'men', shape: 'top-tee', badge: 'New',
    short: 'Crew neck · Relaxed fit',
    description: 'A substantial everyday T-shirt with a relaxed body and classic crew neck.',
    details: ['Relaxed fit', 'Crew neck', 'Straight hem'],
    materials: 'Cotton jersey. Machine wash cold.',
    sizes: MEN_APPAREL, colors: [ivory, navy, black], newIn: true, featured: true,
  },
  {
    slug: 'mens-linen-camp-shirt', name: "Men's camp-collar shirt", price: 36,
    category: 'tops', department: 'men', shape: 'top-blouse', badge: 'New',
    short: 'Open collar · Short sleeves',
    description: 'An easy warm-weather shirt with a relaxed open collar and short sleeves.',
    details: ['Relaxed fit', 'Open collar', 'Button front'],
    materials: 'Linen-blend woven fabric. Machine wash cold.',
    sizes: MEN_APPAREL, colors: [ivory, sand, black], newIn: true,
  },
  {
    slug: 'mens-relaxed-chinos', name: "Men's relaxed chinos", price: 44,
    category: 'bottoms', department: 'men', shape: 'bottom-wide', badge: 'New',
    short: 'Straight leg · Everyday fit',
    description: 'Versatile chinos with a relaxed straight leg and practical pockets.',
    details: ['Straight leg', 'Side pockets', 'Belt loops'],
    materials: 'Cotton-blend twill. Machine wash cold.',
    sizes: MEN_WAIST, colors: [sand, olive, navy], newIn: true, featured: true,
  },
  {
    slug: 'mens-straight-jeans', name: "Men's classic blue jeans", price: 48,
    category: 'denim', department: 'men', shape: 'jeans', badge: 'New',
    short: 'Blue denim · Five pockets',
    description: 'A classic pair of blue jeans with a familiar five-pocket construction and everyday fit.',
    details: ['Five-pocket styling', 'Belt loops', 'Zip fly'],
    materials: 'Cotton denim. Wash inside out with similar colours.',
    sizes: MEN_WAIST, colors: [denimBlue, blueWash, black], newIn: true, featured: true,
  },
  {
    slug: 'mens-pleated-trousers', name: "Men's pleated trousers", price: 52,
    category: 'bottoms', department: 'men', shape: 'bottom-wide', badge: 'New',
    short: 'Front pleats · Tailored fit',
    description: 'A tailored trouser with front pleats and an easy shape through the leg.',
    details: ['Front pleats', 'Side pockets', 'Belt loops'],
    materials: 'Woven suiting fabric. Dry clean or gentle wash.',
    sizes: MEN_WAIST, colors: [slate, sand, black], newIn: true,
  },
  {
    slug: 'mens-cotton-overshirt', name: "Men's check overshirt", price: 56,
    category: 'outerwear', department: 'men', shape: 'denim-jacket', badge: 'New',
    short: 'Button front · Easy layer',
    description: 'A relaxed check overshirt that layers easily over a tee or knit.',
    details: ['Relaxed fit', 'Button front', 'Chest pockets'],
    materials: 'Cotton-blend woven fabric. Machine wash cold.',
    sizes: MEN_APPAREL, colors: [cocoa, slate, black], newIn: true,
  },
  {
    slug: 'mens-bomber-jacket', name: "Men's bomber jacket", price: 68,
    category: 'outerwear', department: 'men', shape: 'denim-jacket', badge: 'New',
    short: 'Zip front · Everyday layer',
    description: 'A versatile zip-front jacket with a clean shape for everyday layering.',
    details: ['Zip front', 'Side pockets', 'Relaxed fit'],
    materials: 'Woven outer with synthetic lining. Spot clean.',
    sizes: MEN_APPAREL, colors: [black, olive, navy], newIn: true,
  },
  {
    slug: 'mens-merino-crewneck', name: "Men's crewneck sweater", price: 54,
    category: 'knitwear', department: 'men', shape: 'sweater', badge: 'New',
    short: 'Fine knit · Crew neck',
    description: 'A clean fine-gauge sweater to wear alone or under a jacket.',
    details: ['Regular fit', 'Crew neck', 'Ribbed trims'],
    materials: 'Soft knit blend. Hand wash cold, dry flat.',
    sizes: MEN_APPAREL, colors: [navy, cream, slate], newIn: true, featured: true,
  },
  {
    slug: 'mens-knit-polo', name: "Men's knit polo", price: 39,
    category: 'knitwear', department: 'men', shape: 'cardigan', badge: 'New',
    short: 'Polo collar · Short sleeves',
    description: 'A short-sleeve polo with a soft collar, suited to smart-casual days.',
    details: ['Regular fit', 'Polo collar', 'Short sleeves'],
    materials: 'Cotton-blend knit. Machine wash cold.',
    sizes: MEN_APPAREL, colors: [ivory, navy, black], newIn: true,
  },
  {
    slug: 'mens-leather-sneakers', name: "Men's low-top sneakers", price: 62,
    category: 'shoes', department: 'men', shape: 'sneaker', badge: 'New',
    short: 'Low top · Cushioned sole',
    description: 'An easy low-top sneaker with a cushioned sole for daily wear.',
    details: ['Low-top profile', 'Lace-up front', 'Cushioned sole'],
    materials: 'Mixed-material upper, rubber outsole. Wipe clean.',
    sizes: MEN_SHOES, colors: [ivory, black], newIn: true,
  },
  {
    slug: 'mens-canvas-weekender', name: "Men's weekender bag", price: 58,
    category: 'bags', department: 'men', shape: 'tote', badge: 'New',
    short: 'Duffel shape · Carry handles',
    description: 'A roomy duffel for short trips, with comfortable handles and a zip closure.',
    details: ['Zip closure', 'Carry handles', 'Room for a weekend'],
    materials: 'Durable woven outer with synthetic lining. Spot clean.',
    sizes: ONE_SIZE, colors: [black, cocoa], newIn: true,
  },
]

const photoSlugSet = new Set(photoSlugs)

export const products: Product[] = catalogue.map((p) => ({
  ...p,
  image: photoSlugSet.has(p.slug) ? `/images/products/photos/${p.slug}.webp` : `/images/products/${p.slug}.svg`,
  hoverImage: photoSlugSet.has(p.slug) ? `/images/products/photos/${p.slug}.webp` : `/images/products/${p.slug}-alt.svg`,
}))

export const categories: { key: Category; label: string; blurb: string; image: string }[] = [
  { key: 'dresses', label: 'Dresses', blurb: 'Day to night', image: products.find((p) => p.slug === 'satin-slip-midi-dress')!.image },
  { key: 'tops', label: 'Tops', blurb: 'Everyday layers', image: products.find((p) => p.slug === 'cropped-ribbed-tank')!.image },
  { key: 'bottoms', label: 'Bottoms', blurb: 'Tailored to easy', image: products.find((p) => p.slug === 'high-waist-wide-leg-trousers')!.image },
  { key: 'denim', label: 'Denim', blurb: 'Washed and worn', image: products.find((p) => p.slug === 'straight-leg-jeans')!.image },
  { key: 'outerwear', label: 'Outerwear', blurb: 'Layers for now', image: products.find((p) => p.slug === 'oversized-blazer')!.image },
  { key: 'knitwear', label: 'Knitwear', blurb: 'Softly structured', image: products.find((p) => p.slug === 'chunky-cable-cardigan')!.image },
  { key: 'shoes', label: 'Shoes', blurb: 'Ground everything', image: products.find((p) => p.slug === 'pointed-toe-stiletto')!.image },
  { key: 'bags', label: 'Bags', blurb: 'Carry it all', image: products.find((p) => p.slug === 'structured-tote-bag')!.image },
  { key: 'accessories', label: 'Accessories', blurb: 'The finishing line', image: products.find((p) => p.slug === 'oval-frame-sunglasses')!.image },
]

export const bySlug = (slug: string) => products.find((p) => p.slug === slug)
export const featured = products.filter((p) => p.featured)
export const menProducts = products.filter((p) => p.department === 'men')
export const newArrivals = products.filter((p) => p.newIn)
export const onSale = products.filter((p) => p.compareAt)
export const discount = (p: Product) =>
  p.compareAt ? Math.round((1 - p.price / p.compareAt) * 100) : 0

export const allSizes = [...new Set(products.flatMap((p) => p.sizes))]

export const defaultOption = (p: Product) =>
  [p.sizes[0], p.colors[0]?.name].filter(Boolean).join(' / ')

export const FREE_SHIPPING_AT = 49
