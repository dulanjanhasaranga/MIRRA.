// Generates the storefront artwork: one illustration per product (plus an
// alternate colourway) and the editorial images used on the home and about
// pages. Run with `bun scripts/generate-product-images.ts`.
//
// Everything is drawn as SVG so the store has no stock-photo licensing and the
// palette stays consistent with the catalogue in src/data/products.ts.

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

import { products, type Category, type Shape, type Swatch } from '../src/data/products'

const OUT = join(import.meta.dir, '..', 'public', 'images')
const W = 600
const H = 800

const BACKGROUNDS: Record<Category, string> = {
  dresses: '#f2eae5',
  tops: '#eef0ea',
  bottoms: '#edece8',
  denim: '#e9eff4',
  outerwear: '#ede9e3',
  knitwear: '#f3ede3',
  shoes: '#f0ede8',
  bags: '#f2ece4',
  accessories: '#f0ede8',
}

function mix(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16))
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16))
  const out = pa.map((v, i) => Math.round(v + (pb[i] - v) * t))
  return `#${out.map((v) => v.toString(16).padStart(2, '0')).join('')}`
}

interface Ink {
  base: string
  light: string
  dark: string
  stroke: string
  grad: string
}

let gradSeq = 0

const ink = (hex: string): Ink => {
  gradSeq += 1
  return {
    base: hex,
    light: mix(hex, '#ffffff', 0.26),
    dark: mix(hex, '#000000', 0.22),
    stroke: mix(hex, '#000000', 0.46),
    grad: `fabric-${gradSeq}`,
  }
}

const gradDef = (c: Ink) => `<linearGradient id="${c.grad}" x1="0.12" y1="0" x2="0.88" y2="1">
      <stop offset="0" stop-color="${c.light}" />
      <stop offset="0.52" stop-color="${c.base}" />
      <stop offset="1" stop-color="${c.dark}" />
    </linearGradient>`

const seam = (c: Ink, extra = '') =>
  `fill="none" stroke="${c.dark}" ${extra.includes('stroke-opacity') ? '' : 'stroke-opacity=".45"'} stroke-width="1.7" stroke-linecap="round" ${extra}`
const stitch = `fill="none" stroke="#fffdf8" stroke-opacity=".38" stroke-width="1.3" stroke-dasharray="6 6"`
const metal = `fill="none" stroke="#c9a961" stroke-width="3" stroke-linecap="round"`

function garment(shape: Shape, c: Ink) {
  const fill = `fill="url(#${c.grad})" stroke="${c.stroke}" stroke-width="2" stroke-linejoin="round"`
  const soft = `fill="${c.dark}" fill-opacity=".16"`

  switch (shape) {
    case 'dress-slip':
      return `
        <path d="M 258 174 L 268 244" stroke="${c.base}" stroke-width="8" stroke-linecap="round" />
        <path d="M 342 174 L 332 244" stroke="${c.base}" stroke-width="8" stroke-linecap="round" />
        <path d="M 266 238 C 288 226 312 226 334 238 C 340 336 352 470 372 626 C 330 644 270 644 228 626 C 250 470 262 336 266 238 Z" ${fill} />
        <path d="M 266 238 C 288 258 312 258 334 238" ${seam(c)} />
        <path d="M 300 300 C 294 400 296 520 302 632" ${seam(c, 'stroke-opacity=".22"')} />
        <path d="M 258 330 C 248 430 246 530 252 618" ${seam(c, 'stroke-opacity=".18"')} />
        <path d="M 342 336 C 352 430 354 528 350 616" ${seam(c, 'stroke-opacity=".18"')} />
        <path d="M 232 620 C 270 632 330 632 368 620" ${soft} stroke="none" />
      `

    case 'dress-aline':
      return `
        <path d="M 252 168 C 276 156 324 156 348 168 L 386 198 L 366 252 L 342 240 L 336 302 C 356 420 384 540 398 650 C 340 668 260 668 202 650 C 216 540 244 420 264 302 L 258 240 L 234 252 L 214 198 Z" ${fill} />
        <path d="M 268 168 C 282 196 318 196 332 168" ${seam(c)} />
        <path d="M 266 304 C 288 316 312 316 334 304" ${seam(c)} />
        <path d="M 288 320 C 280 430 272 540 268 642" ${seam(c, 'stroke-opacity=".2"')} />
        <path d="M 312 320 C 320 430 328 540 332 642" ${seam(c, 'stroke-opacity=".2"')} />
        <path d="M 300 320 L 300 652" ${seam(c, 'stroke-opacity=".14"')} />
        <path d="M 216 646 C 260 660 340 660 386 646" ${soft} stroke="none" />
      `

    case 'dress-mini':
      return `
        <path d="M 250 170 C 276 158 324 158 350 170 L 400 202 L 380 260 L 348 246 L 350 300 C 360 380 372 440 382 508 C 340 524 260 524 218 508 C 228 440 240 380 250 300 L 252 246 L 220 260 L 200 202 Z" ${fill} />
        <path d="M 268 172 C 282 198 318 198 332 172" ${seam(c)} />
        <path d="M 254 302 C 276 314 324 314 346 302" ${seam(c)} />
        <path d="M 282 316 C 276 380 272 440 270 500" ${seam(c, 'stroke-opacity=".2"')} />
        <path d="M 318 316 C 324 380 328 440 330 500" ${seam(c, 'stroke-opacity=".2"')} />
        <path d="M 300 314 L 300 502" ${seam(c, 'stroke-opacity=".14"')} />
        <path d="M 228 504 C 270 518 330 518 374 504" ${soft} stroke="none" />
      `

    case 'top-tee':
      return `
        <path d="M 240 158 C 270 148 330 148 360 158 L 446 202 L 418 276 L 372 252 L 380 522 C 332 536 268 536 220 522 L 228 252 L 182 276 L 154 202 Z" ${fill} />
        <path d="M 264 160 C 278 194 322 194 336 160" ${seam(c)} />
        <path d="M 228 252 C 204 264 188 270 170 274" ${seam(c, 'stroke-opacity=".3"')} />
        <path d="M 372 252 C 396 264 412 270 430 274" ${seam(c, 'stroke-opacity=".3"')} />
        <path d="M 224 512 C 272 526 328 526 376 512" ${soft} stroke="none" />
      `

    case 'top-cami':
      return `
        <path d="M 264 212 L 274 158" stroke="${c.base}" stroke-width="7" stroke-linecap="round" />
        <path d="M 336 212 L 326 158" stroke="${c.base}" stroke-width="7" stroke-linecap="round" />
        <path d="M 258 214 C 282 248 318 248 342 214 L 352 254 C 346 342 352 440 360 524 C 320 538 280 538 240 524 C 248 440 254 342 250 254 Z" ${fill} />
        <path d="M 258 216 C 282 250 318 250 342 216" ${seam(c)} />
        <path d="M 300 260 L 300 522" ${seam(c, 'stroke-opacity=".16"')} />
        <path d="M 256 300 C 250 380 252 450 256 512" ${seam(c, 'stroke-opacity=".2"')} />
        <path d="M 344 300 C 350 380 348 450 344 512" ${seam(c, 'stroke-opacity=".2"')} />
      `

    case 'top-blouse':
      return `
        <path d="M 238 166 C 270 154 330 154 362 166 L 430 210 L 404 282 L 366 258 L 388 544 C 336 560 264 560 212 544 L 234 258 L 196 282 L 170 210 Z" ${fill} />
        <path d="M 266 168 L 300 216 L 334 168" ${seam(c)} />
        <path d="M 300 216 C 286 238 268 242 258 230 C 250 220 262 208 278 212 Z" ${fill} />
        <path d="M 300 216 C 314 238 332 242 342 230 C 350 220 338 208 322 212 Z" ${fill} />
        <path d="M 300 220 L 300 540" ${seam(c, 'stroke-opacity=".22"')} />
        <path d="M 260 300 C 252 380 254 460 260 528" ${seam(c, 'stroke-opacity=".16"')} />
        <path d="M 340 300 C 348 380 346 460 340 528" ${seam(c, 'stroke-opacity=".16"')} />
        <circle cx="300" cy="340" r="2.6" fill="${c.dark}" fill-opacity=".5" />
        <circle cx="300" cy="420" r="2.6" fill="${c.dark}" fill-opacity=".5" />
      `

    case 'top-corset':
      return `
        <path d="M 248 204 C 280 192 320 192 352 204 L 372 262 L 366 404 C 334 420 266 420 234 404 L 228 262 Z" ${fill} />
        <path d="M 248 204 C 280 220 320 220 352 204" ${seam(c)} />
        <path d="M 262 262 L 260 402" ${seam(c, 'stroke-opacity=".35"')} />
        <path d="M 280 258 L 279 410" ${seam(c, 'stroke-opacity=".35"')} />
        <path d="M 300 256 L 300 414" ${seam(c, 'stroke-opacity=".35"')} />
        <path d="M 320 258 L 321 410" ${seam(c, 'stroke-opacity=".35"')} />
        <path d="M 338 262 L 340 402" ${seam(c, 'stroke-opacity=".35"')} />
        <circle cx="300" cy="300" r="3" fill="${c.light}" fill-opacity=".8" />
        <circle cx="300" cy="340" r="3" fill="${c.light}" fill-opacity=".8" />
        <circle cx="300" cy="380" r="3" fill="${c.light}" fill-opacity=".8" />
      `

    case 'bottom-wide':
      return `
        <path d="M 232 186 L 368 186 L 374 226 L 392 662 L 322 662 L 300 372 L 278 662 L 208 662 L 226 226 Z" ${fill} />
        <path d="M 232 186 L 368 186 L 371 224 L 229 224 Z" fill="${c.dark}" fill-opacity=".22" />
        <path d="M 268 232 C 262 380 258 520 256 650" ${seam(c, 'stroke-opacity=".22"')} />
        <path d="M 334 232 C 340 380 344 520 346 650" ${seam(c, 'stroke-opacity=".22"')} />
        <path d="M 240 230 L 240 650" ${seam(c, 'stroke-opacity=".1"')} />
        <path d="M 360 230 L 360 650" ${seam(c, 'stroke-opacity=".1"')} />
        <rect x="278" y="196" width="18" height="26" rx="3" ${soft} stroke="none" />
      `

    case 'shorts':
      return `
        <path d="M 232 186 L 368 186 L 374 226 L 384 434 L 322 434 L 300 330 L 278 434 L 216 434 L 226 226 Z" ${fill} />
        <path d="M 232 186 L 368 186 L 371 224 L 229 224 Z" fill="${c.dark}" fill-opacity=".22" />
        <path d="M 272 232 C 268 300 266 370 266 424" ${seam(c, 'stroke-opacity=".22"')} />
        <path d="M 330 232 C 334 300 336 370 336 424" ${seam(c, 'stroke-opacity=".22"')} />
        <path d="M 222 428 L 276 428" ${seam(c)} />
        <path d="M 326 428 L 380 428" ${seam(c)} />
        <rect x="278" y="196" width="18" height="26" rx="3" ${soft} stroke="none" />
      `

    case 'skirt-mini':
      return `
        <path d="M 236 208 C 270 198 330 198 364 208 L 388 506 C 338 522 262 522 212 506 Z" ${fill} />
        <path d="M 236 208 C 270 198 330 198 364 208 L 367 244 C 332 254 268 254 233 244 Z" fill="${c.dark}" fill-opacity=".2" />
        <path d="M 246 248 L 228 506" ${seam(c, 'stroke-opacity=".26"')} />
        <path d="M 274 252 L 264 512" ${seam(c, 'stroke-opacity=".26"')} />
        <path d="M 300 252 L 300 516" ${seam(c, 'stroke-opacity=".26"')} />
        <path d="M 326 252 L 336 512" ${seam(c, 'stroke-opacity=".26"')} />
        <path d="M 354 248 L 372 506" ${seam(c, 'stroke-opacity=".26"')} />
      `

    case 'skirt-midi':
      return `
        <path d="M 238 208 C 270 198 330 198 362 208 L 402 622 C 340 642 260 642 198 622 Z" ${fill} />
        <path d="M 238 208 C 270 198 330 198 362 208 L 364 244 C 332 254 268 254 236 244 Z" fill="${c.dark}" fill-opacity=".2" />
        <path d="M 248 250 C 232 400 220 520 214 618" ${seam(c, 'stroke-opacity=".2"')} />
        <path d="M 276 254 C 268 400 262 520 260 626" ${seam(c, 'stroke-opacity=".2"')} />
        <path d="M 324 254 C 332 400 338 520 340 626" ${seam(c, 'stroke-opacity=".2"')} />
        <path d="M 352 250 C 368 400 380 520 386 618" ${seam(c, 'stroke-opacity=".2"')} />
      `

    case 'jeans':
      return `
        <path d="M 230 190 L 370 190 L 376 230 L 382 626 L 322 626 L 300 356 L 278 626 L 218 626 L 224 230 Z" ${fill} />
        <path d="M 230 190 L 370 190 L 373 228 L 227 228 Z" fill="${c.dark}" fill-opacity=".26" />
        <path d="M 296 230 L 296 300 C 288 320 278 340 268 350" ${seam(c, 'stroke-opacity=".5"')} />
        <path d="M 228 268 C 250 280 276 282 296 276" ${seam(c, 'stroke-opacity=".5"')} />
        <path d="M 372 268 C 350 280 324 282 304 276" ${seam(c, 'stroke-opacity=".5"')} />
        <circle cx="300" cy="238" r="3.4" fill="${c.light}" fill-opacity=".7" />
        <path d="M 240 236 L 242 618" stroke="#d9b77a" stroke-opacity=".55" stroke-width="1.4" stroke-dasharray="5 5" fill="none" />
        <path d="M 360 236 L 358 618" stroke="#d9b77a" stroke-opacity=".55" stroke-width="1.4" stroke-dasharray="5 5" fill="none" />
        <path d="M 226 300 L 258 300" ${seam(c, 'stroke-opacity=".35"')} />
        <path d="M 374 300 L 342 300" ${seam(c, 'stroke-opacity=".35"')} />
      `

    case 'denim-jacket':
      return `
        <path d="M 238 166 C 268 156 300 152 300 152 C 300 152 332 156 362 166 L 442 206 L 414 276 L 374 252 L 384 562 L 300 574 L 216 562 L 226 252 L 186 276 L 158 206 Z" ${fill} />
        <path d="M 268 164 L 300 206 L 332 164 L 300 152 Z" fill="${c.light}" fill-opacity=".55" stroke="${c.stroke}" stroke-width="2" />
        <path d="M 300 206 L 300 570" ${seam(c, 'stroke-opacity=".55"')} />
        <path d="M 232 396 L 286 396 L 286 442 L 232 442 Z" ${seam(c, 'stroke-opacity=".4"')} />
        <path d="M 368 396 L 314 396 L 314 442 L 368 442 Z" ${seam(c, 'stroke-opacity=".4"')} />
        <path d="M 224 252 L 226 300" ${stitch} />
        <path d="M 376 252 L 374 300" ${stitch} />
        <circle cx="300" cy="300" r="3.6" fill="${c.light}" fill-opacity=".8" />
        <circle cx="300" cy="370" r="3.6" fill="${c.light}" fill-opacity=".8" />
        <circle cx="300" cy="440" r="3.6" fill="${c.light}" fill-opacity=".8" />
        <circle cx="300" cy="510" r="3.6" fill="${c.light}" fill-opacity=".8" />
      `

    case 'blazer':
      return `
        <path d="M 240 166 C 272 154 328 154 360 166 L 450 210 L 420 288 L 378 260 L 392 584 L 300 602 L 208 584 L 222 260 L 180 288 L 150 210 Z" ${fill} />
        <path d="M 262 168 L 300 246 L 338 168 L 322 160 L 300 196 L 278 160 Z" fill="${c.light}" fill-opacity=".5" stroke="${c.stroke}" stroke-width="2" />
        <path d="M 300 246 L 300 596" ${seam(c, 'stroke-opacity=".4"')} />
        <path d="M 222 380 L 290 380" ${seam(c, 'stroke-opacity=".35"')} />
        <path d="M 378 380 L 310 380" ${seam(c, 'stroke-opacity=".35"')} />
        <circle cx="300" cy="330" r="4" fill="${c.dark}" fill-opacity=".55" />
        <circle cx="300" cy="400" r="4" fill="${c.dark}" fill-opacity=".55" />
        <path d="M 226 252 L 220 580" ${stitch} />
        <path d="M 374 252 L 380 580" ${stitch} />
      `

    case 'coat':
      return `
        <path d="M 238 164 C 270 152 330 152 362 164 L 452 214 L 424 294 L 382 266 L 402 694 C 340 710 260 710 198 694 L 218 266 L 176 294 L 148 214 Z" ${fill} />
        <path d="M 262 166 L 300 258 L 338 166 L 320 158 L 300 204 L 280 158 Z" fill="${c.light}" fill-opacity=".45" stroke="${c.stroke}" stroke-width="2" />
        <path d="M 300 258 L 300 700" ${seam(c, 'stroke-opacity=".45"')} />
        <path d="M 214 372 L 386 372 L 386 402 L 214 402 Z" fill="${c.dark}" fill-opacity=".3" />
        <rect x="286" y="366" width="30" height="42" rx="5" fill="none" stroke="#c9a961" stroke-width="3" />
        <circle cx="266" cy="300" r="3.6" fill="${c.light}" fill-opacity=".8" />
        <circle cx="334" cy="300" r="3.6" fill="${c.light}" fill-opacity=".8" />
        <circle cx="266" cy="340" r="3.6" fill="${c.light}" fill-opacity=".8" />
        <circle cx="334" cy="340" r="3.6" fill="${c.light}" fill-opacity=".8" />
        <path d="M 226 452 L 296 452" ${seam(c, 'stroke-opacity=".4"')} />
        <path d="M 374 452 L 304 452" ${seam(c, 'stroke-opacity=".4"')} />
      `

    case 'cardigan':
      return `
        <path d="M 236 170 C 266 158 300 156 300 156 L 300 566 L 214 552 L 224 300 L 180 278 L 152 208 Z" ${fill} />
        <path d="M 364 170 C 334 158 300 156 300 156 L 300 566 L 386 552 L 376 300 L 420 278 L 448 208 Z" ${fill} />
        <path d="M 300 156 L 300 566" ${seam(c, 'stroke-opacity=".5"')} />
        <path d="M 264 162 C 278 196 322 196 336 162" ${seam(c)} />
        <path d="M 240 500 L 296 508" ${seam(c, 'stroke-opacity=".28"')} />
        <path d="M 360 500 L 304 508" ${seam(c, 'stroke-opacity=".28"')} />
        <circle cx="302" cy="250" r="4" fill="${c.light}" fill-opacity=".8" />
        <circle cx="302" cy="330" r="4" fill="${c.light}" fill-opacity=".8" />
        <circle cx="302" cy="410" r="4" fill="${c.light}" fill-opacity=".8" />
        <circle cx="302" cy="490" r="4" fill="${c.light}" fill-opacity=".8" />
        <path d="M 236 470 C 238 500 238 530 236 552" ${seam(c, 'stroke-opacity=".2"')} />
        <path d="M 364 470 C 362 500 362 530 364 552" ${seam(c, 'stroke-opacity=".2"')} />
      `

    case 'sweater':
      return `
        <path d="M 238 166 C 270 152 330 152 362 166 L 442 200 L 452 402 L 396 412 L 372 272 L 380 548 C 334 562 266 562 220 548 L 228 272 L 204 412 L 148 402 L 158 200 Z" ${fill} />
        <path d="M 266 162 C 280 196 320 196 334 162" ${seam(c)} />
        <path d="M 224 530 C 272 546 328 546 376 530" ${seam(c, 'stroke-opacity=".3"')} />
        <path d="M 158 392 C 176 400 196 406 206 406" ${seam(c, 'stroke-opacity=".3"')} />
        <path d="M 442 392 C 424 400 404 406 394 406" ${seam(c, 'stroke-opacity=".3"')} />
        <path d="M 300 210 L 300 540" ${seam(c, 'stroke-opacity=".16"')} />
        <path d="M 262 220 C 256 320 254 430 258 520" ${seam(c, 'stroke-opacity=".14"')} />
        <path d="M 338 220 C 344 320 346 430 342 520" ${seam(c, 'stroke-opacity=".14"')} />
      `

    case 'heel':
      return `
        <path d="M 418 614 L 432 726 L 450 726 L 440 610 Z" fill="${c.dark}" stroke="${c.stroke}" stroke-width="2" stroke-linejoin="round" />
        <path d="M 168 592 C 216 590 268 578 306 554 C 338 534 372 522 400 536 C 424 548 438 568 444 590 L 442 606 C 400 620 330 632 254 636 L 210 638 C 184 638 168 628 164 614 C 160 602 160 594 168 592 Z" ${fill} />
        <path d="M 168 606 C 230 606 320 594 402 566" ${seam(c, 'stroke-opacity=".55"')} />
        <path d="M 300 558 C 330 584 372 588 410 572" ${seam(c, 'stroke-opacity=".3"')} />
        <path d="M 236 620 C 306 610 366 596 420 574" ${metal} stroke-opacity=".5" />
        <path d="M 246 596 C 306 590 366 578 414 556" ${stitch} />
      `

    case 'sneaker':
      return `
        <path d="M 158 576 C 158 566 170 560 186 562 L 462 574 C 482 584 484 624 462 632 L 178 632 C 154 630 144 600 158 576 Z" fill="#f7f5f0" stroke="${c.stroke}" stroke-width="2" />
        <path d="M 168 596 L 470 604" stroke="#d8d2c6" stroke-width="2" stroke-dasharray="12 9" />
        <path d="M 176 572 C 190 540 206 506 226 474 C 234 460 252 454 268 462 C 282 470 290 486 296 504 C 304 528 316 552 336 566 C 366 586 410 588 450 580 L 462 574 L 178 562 Z" ${fill} />
        <path d="M 226 474 C 236 462 250 456 264 460" ${seam(c, 'stroke-opacity=".4"')} />
        <path d="M 296 504 C 330 508 366 512 392 528" ${seam(c, 'stroke-opacity=".35"')} />
        <path d="M 336 566 C 366 586 410 588 450 580" ${seam(c, 'stroke-opacity=".3"')} />
        <path d="M 250 486 L 320 498" stroke="${c.light}" stroke-width="5" stroke-linecap="round" />
        <path d="M 244 508 L 314 520" stroke="${c.light}" stroke-width="5" stroke-linecap="round" />
        <path d="M 240 530 L 310 542" stroke="${c.light}" stroke-width="5" stroke-linecap="round" />
        <path d="M 252 474 L 258 486" stroke="${c.stroke}" stroke-width="2" />
        <path d="M 246 496 L 252 508" stroke="${c.stroke}" stroke-width="2" />
        <path d="M 242 518 L 248 530" stroke="${c.stroke}" stroke-width="2" />
      `

    case 'boot':
      return `
        <path d="M 406 650 L 452 650 L 452 700 L 412 700 Z" fill="${c.dark}" stroke="${c.stroke}" stroke-width="2" />
        <path d="M 214 396 C 244 386 304 386 332 396 L 340 530 C 386 540 424 556 438 582 C 446 598 444 612 432 616 L 338 624 L 338 652 L 206 652 C 196 624 200 586 206 550 Z" ${fill} />
        <path d="M 332 408 L 340 526" ${seam(c, 'stroke-opacity=".45"')} stroke-dasharray="7 5" />
        <path d="M 214 398 C 248 388 300 388 332 398" ${seam(c)} />
        <path d="M 204 648 L 456 648 C 466 658 462 674 446 674 L 210 674 C 194 674 192 658 204 648 Z" fill="#2b2724" fill-opacity=".85" stroke="${c.stroke}" stroke-width="2" />
        <path d="M 344 560 C 386 570 420 582 434 596" ${seam(c, 'stroke-opacity=".3"')} />
        <path d="M 220 612 L 320 612" ${seam(c, 'stroke-opacity=".18"')} />
      `

    case 'tote':
      return `
        <path d="M 240 300 C 240 212 360 212 360 300" fill="none" stroke="${c.dark}" stroke-width="10" stroke-linecap="round" />
        <path d="M 178 300 L 422 300 L 440 620 C 380 638 220 638 160 620 Z" ${fill} />
        <path d="M 190 316 L 410 316" ${seam(c, 'stroke-opacity=".5"')} />
        <path d="M 174 596 C 240 614 360 614 428 596" ${seam(c, 'stroke-opacity=".3"')} />
        <path d="M 226 300 L 226 590" ${stitch} />
        <path d="M 374 300 L 374 590" ${stitch} />
        <circle cx="196" cy="336" r="4" fill="none" stroke="#c9a961" stroke-width="2.4" />
        <circle cx="404" cy="336" r="4" fill="none" stroke="#c9a961" stroke-width="2.4" />
      `

    case 'shoulder-bag':
      return `
        <path d="M 214 334 C 214 198 386 198 386 334" fill="none" stroke="#c9a961" stroke-width="5" stroke-dasharray="3 7" stroke-linecap="round" />
        <path d="M 196 350 C 196 328 214 318 240 318 L 360 318 C 386 318 404 328 404 350 L 396 594 C 370 610 230 610 204 594 Z" ${fill} />
        <path d="M 196 350 C 246 384 354 384 404 350 L 400 428 C 350 460 250 460 200 428 Z" fill="${c.dark}" fill-opacity=".22" stroke="${c.stroke}" stroke-width="2" />
        <path d="M 196 350 C 246 384 354 384 404 350" ${seam(c, 'stroke-opacity=".55"')} />
        <circle cx="300" cy="404" r="11" fill="none" stroke="#c9a961" stroke-width="3.4" />
        <path d="M 300 414 L 300 428" stroke="#c9a961" stroke-width="3.4" stroke-linecap="round" />
        <path d="M 208 570 C 260 584 340 584 392 570" ${seam(c, 'stroke-opacity=".25"')} />
      `

    case 'sunglasses':
      return `
        <path d="M 156 336 C 156 300 212 288 250 306 L 262 358 C 262 404 212 424 178 406 C 156 394 152 362 156 336 Z" ${fill} />
        <path d="M 444 336 C 444 300 388 288 350 306 L 338 358 C 338 404 388 424 422 406 C 444 394 448 362 444 336 Z" ${fill} />
        <path d="M 262 344 C 280 332 320 332 338 344" fill="none" stroke="${c.stroke}" stroke-width="8" stroke-linecap="round" />
        <path d="M 156 336 L 118 320" stroke="${c.stroke}" stroke-width="7" stroke-linecap="round" />
        <path d="M 444 336 L 482 320" stroke="${c.stroke}" stroke-width="7" stroke-linecap="round" />
        <path d="M 170 338 C 176 316 216 312 238 330" fill="none" stroke="#ffffff" stroke-opacity=".45" stroke-width="6" stroke-linecap="round" />
        <path d="M 362 330 C 384 312 424 316 430 338" fill="none" stroke="#ffffff" stroke-opacity=".45" stroke-width="6" stroke-linecap="round" />
      `

    case 'necklace':
      return `
        <path d="M 170 258 C 210 500 390 500 430 258" fill="none" stroke="${c.base}" stroke-width="4" stroke-linecap="round" />
        <path d="M 194 258 C 232 430 368 430 406 258" fill="none" stroke="${c.dark}" stroke-width="3" stroke-linecap="round" />
        <circle cx="300" cy="436" r="17" fill="${c.light}" stroke="${c.stroke}" stroke-width="2.4" />
        <circle cx="300" cy="436" r="6" fill="${c.dark}" fill-opacity=".5" />
        <circle cx="170" cy="258" r="5" fill="none" stroke="${c.stroke}" stroke-width="2.4" />
        <circle cx="430" cy="258" r="5" fill="none" stroke="${c.stroke}" stroke-width="2.4" />
      `

    case 'belt':
      return `
        <path d="M 176 372 L 452 372 C 462 372 468 380 468 390 L 468 418 C 468 428 462 436 452 436 L 176 436 Z" ${fill} />
        <rect x="112" y="356" width="66" height="96" rx="12" fill="none" stroke="#c9a961" stroke-width="7" />
        <path d="M 145 356 L 145 452" stroke="#c9a961" stroke-width="5" stroke-linecap="round" />
        <circle cx="330" cy="404" r="5.5" fill="${c.dark}" fill-opacity=".55" />
        <circle cx="366" cy="404" r="5.5" fill="${c.dark}" fill-opacity=".55" />
        <circle cx="402" cy="404" r="5.5" fill="${c.dark}" fill-opacity=".55" />
        <circle cx="438" cy="404" r="5.5" fill="${c.dark}" fill-opacity=".55" />
        <path d="M 330 378 L 456 378" stroke="#fffdf8" stroke-opacity=".35" stroke-width="1.4" stroke-dasharray="6 6" />
      `

    case 'scarf':
      return `
        <path d="M 176 288 L 424 288 L 300 612 Z" ${fill} />
        <path d="M 176 288 L 300 612 L 244 288 Z" fill="${c.light}" fill-opacity=".35" stroke="none" />
        <path d="M 300 288 L 424 288 L 300 612 Z" fill="${c.dark}" fill-opacity=".12" stroke="none" />
        <path d="M 176 288 L 424 288" ${seam(c, 'stroke-opacity=".5"')} />
        <path d="M 214 306 C 258 380 282 492 294 586" ${seam(c, 'stroke-opacity=".26"')} />
        <path d="M 300 306 L 300 604" ${seam(c, 'stroke-opacity=".22"')} />
        <path d="M 386 306 C 342 380 318 492 306 586" ${seam(c, 'stroke-opacity=".26"')} />
        <path d="M 300 612 L 286 660 L 300 650 L 314 660 Z" fill="${c.dark}" fill-opacity=".2" />
      `

    case 'cap':
      return `
        <path d="M 196 412 C 196 302 404 302 404 412 Z" ${fill} />
        <path d="M 300 306 C 280 340 276 380 276 412" ${seam(c, 'stroke-opacity=".3"')} />
        <path d="M 300 306 C 320 340 324 380 324 412" ${seam(c, 'stroke-opacity=".3"')} />
        <path d="M 184 412 C 184 388 300 376 412 410 L 434 446 C 330 476 220 468 178 442 C 168 434 174 420 184 412 Z" ${fill} />
        <path d="M 184 412 C 240 400 340 400 410 412" ${seam(c, 'stroke-opacity=".5"')} />
        <path d="M 396 400 C 420 402 430 412 434 424" ${seam(c, 'stroke-opacity=".4"')} />
        <circle cx="300" cy="308" r="7" fill="${c.dark}" fill-opacity=".4" />
        <path d="M 272 430 L 328 430" stroke="#fffdf8" stroke-opacity=".3" stroke-width="1.4" stroke-dasharray="6 6" />
      `
  }
}

function wrap(width: number, height: number, bg: string, defs: string, inner: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  <defs>
    ${defs}
    <radialGradient id="glow" cx="0.5" cy="0.42" r="0.6">
      <stop offset="0" stop-color="#ffffff" />
      <stop offset="1" stop-color="#ffffff" stop-opacity="0" />
    </radialGradient>
    <filter id="shade" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="14" />
    </filter>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      <feColorMatrix type="saturate" values="0" />
    </filter>
  </defs>
  <rect width="${width}" height="${height}" fill="${bg}" />
  ${inner}
  <rect width="${width}" height="${height}" filter="url(#grain)" opacity=".055" style="mix-blend-mode:multiply" />
</svg>
`
}

function renderProduct(shape: Shape, base: string, bg: string) {
  const c = ink(base)
  const shadowY = shape === 'heel' || shape === 'sneaker' || shape === 'boot' ? 700 : 728
  const shadowX = shape === 'sunglasses' || shape === 'belt' || shape === 'necklace' ? 300 : 302
  const shadowRX = shape === 'sunglasses' || shape === 'belt' || shape === 'necklace' ? 150 : 128

  const inner = `
  <circle cx="300" cy="392" r="258" fill="url(#glow)" opacity=".9" />
  <circle cx="300" cy="392" r="258" fill="none" stroke="#ffffff" stroke-opacity=".55" />
  <ellipse cx="${shadowX}" cy="${shadowY}" rx="${shadowRX}" ry="20" fill="#1c1a17" fill-opacity=".16" filter="url(#shade)" />
  <g>${garment(shape, c)}</g>`

  return wrap(W, H, bg, gradDef(c), inner)
}

function scene(width: number, height: number, bg: string, inks: Ink[], inner: string) {
  return wrap(width, height, bg, inks.map(gradDef).join(''), inner)
}

async function write(path: string, contents: string) {
  const full = join(OUT, path)
  await mkdir(dirname(full), { recursive: true })
  await writeFile(full, contents)
  return full
}

function pick(swatches: Swatch[] | undefined, fallback: string) {
  return swatches?.[0]?.hex ?? fallback
}

async function main() {
  let n = 0
  for (const p of products) {
    const bg = BACKGROUNDS[p.category]
    const primary = pick(p.colors, '#cbb79c')
    const secondary = p.colors[1]?.hex ?? mix(primary, '#ffffff', 0.3)

    await write(`products/${p.slug}.svg`, renderProduct(p.shape, primary, bg))
    await write(`products/${p.slug}-alt.svg`, renderProduct(p.shape, secondary, mix(bg, secondary, 0.08)))
    n += 2
  }

  const dressInk = ink('#e4d2ba')
  const toteInk = ink('#6b4b3a')
  const heelInk = ink('#2b2724')
  const sweaterInk = ink('#cdb9a1')
  const sunglassesInk = ink('#332f2b')
  const sneakerInk = ink('#ded7ca')

  const dress = garment('dress-aline', dressInk)
  const tote = garment('tote', toteInk)
  const heel = garment('heel', heelInk)
  const sweater = garment('sweater', sweaterInk)
  const sunglasses = garment('sunglasses', sunglassesInk)
  const sneaker = garment('sneaker', sneakerInk)

  await write(
    'hero.svg',
    scene(
      1200,
      1400,
      '#f0e7de',
      [dressInk, toteInk, heelInk, sunglassesInk],
      `
      <rect x="56" y="56" width="1088" height="1288" rx="44" fill="#f7f1e9" />
      <circle cx="764" cy="446" r="330" fill="#e9d9c8" />
      <circle cx="352" cy="1050" r="230" fill="#e6ded2" />
      <path d="M 780 96 A 360 360 0 0 1 1140 456" fill="none" stroke="#c9a961" stroke-opacity=".5" stroke-width="2" />
      <g transform="translate(276 356) scale(1.08)">${dress}</g>
      <g transform="translate(120 906) scale(.48)">${tote}</g>
      <g transform="translate(806 940) scale(.52)">${heel}</g>
      <g transform="translate(790 128) scale(.4)">${sunglasses}</g>
      <ellipse cx="600" cy="1232" rx="270" ry="26" fill="#1c1a17" fill-opacity=".1" filter="url(#shade)" />
      `,
    ),
  )
  n += 1

  await write(
    'edit-layers.svg',
    scene(
      900,
      1100,
      '#ece6dd',
      [sweaterInk, sneakerInk],
      `
      <circle cx="450" cy="480" r="300" fill="#f6f1e8" />
      <g transform="translate(178 150) scale(.85)">${sweater}</g>
      <g transform="translate(430 640) scale(.42)">${sneaker}</g>
      <circle cx="700" cy="220" r="60" fill="#e2d3bf" />
      `,
    ),
  )
  n += 1

  await write(
    'edit-accessories.svg',
    scene(
      900,
      1100,
      '#eee8e0',
      [sneakerInk, toteInk, heelInk],
      `
      <rect x="40" y="40" width="820" height="1020" rx="36" fill="#f8f3ec" />
      <circle cx="620" cy="400" r="240" fill="#e7d9c6" />
      <g transform="translate(196 180) scale(.62)">${sneaker}</g>
      <g transform="translate(180 610) scale(.55)">${tote}</g>
      <g transform="translate(510 700) scale(.4)">${heel}</g>
      `,
    ),
  )
  n += 1

  console.log(`Wrote ${n} SVG files to public/images`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
