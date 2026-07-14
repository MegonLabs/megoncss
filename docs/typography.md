# Typography

Font size, weight, line height, and text utilities.

## Font Size

```
fs-{value}  → font-size: {value}px
```

```html
<div class="fs-12">font-size: 12px</div>
<div class="fs-14">font-size: 14px</div>
<div class="fs-16">font-size: 16px</div>
<div class="fs-18">font-size: 18px</div>
<div class="fs-20">font-size: 20px</div>
<div class="fs-24">font-size: 24px</div>
<div class="fs-30">font-size: 30px</div>
<div class="fs-36">font-size: 36px</div>
<div class="fs-48">font-size: 48px</div>
<div class="fs-60">font-size: 60px</div>
<div class="fs-72">font-size: 72px</div>
```

### Available Sizes

| Class   | Value | Use Case           |
| ------- | ----- | ------------------ |
| `fs-10` | 10px  | Fine print         |
| `fs-12` | 12px  | Small text, labels |
| `fs-14` | 14px  | Body small         |
| `fs-16` | 16px  | Body default       |
| `fs-18` | 18px  | Body large         |
| `fs-20` | 20px  | Subheadings        |
| `fs-24` | 24px  | H4                 |
| `fs-30` | 30px  | H3                 |
| `fs-36` | 36px  | H2                 |
| `fs-48` | 48px  | H1                 |
| `fs-60` | 60px  | Display            |
| `fs-72` | 72px  | Hero               |

## Font Weight

```
fw-{value}  → font-weight: {value}
```

```html
<div class="fw-100">font-weight: 100 (Thin)</div>
<div class="fw-200">font-weight: 200 (Extra Light)</div>
<div class="fw-300">font-weight: 300 (Light)</div>
<div class="fw-400">font-weight: 400 (Regular)</div>
<div class="fw-500">font-weight: 500 (Medium)</div>
<div class="fw-600">font-weight: 600 (Semi Bold)</div>
<div class="fw-700">font-weight: 700 (Bold)</div>
<div class="fw-800">font-weight: 800 (Extra Bold)</div>
<div class="fw-900">font-weight: 900 (Black)</div>
```

## Line Height

```
lh-{value}  → line-height: {value}px
```

```html
<div class="lh-16">line-height: 16px</div>
<div class="lh-20">line-height: 20px</div>
<div class="lh-24">line-height: 24px</div>
<div class="lh-28">line-height: 28px</div>
<div class="lh-32">line-height: 32px</div>
<div class="lh-40">line-height: 40px</div>
<div class="lh-48">line-height: 48px</div>
```

### Common Combinations

```html
<!-- Tight for headings -->
<h1 class="fs-36 fw-700 lh-40">Tight heading</h1>

<!-- Normal for body -->
<p class="fs-16 lh-24">Normal body text</p>

<!-- Relaxed for large text -->
<p class="fs-20 lh-32">Relaxed reading text</p>
```

## Letter Spacing

```
ls-{variant}  → letter-spacing: {value}
```

```html
<div class="ls-tight">letter-spacing: -0.025em</div>
<div class="ls-normal">letter-spacing: 0em</div>
<div class="ls-wide">letter-spacing: 0.025em</div>
```

## Text Alignment

```
ta-{value}  → text-align: {value}
```

```html
<div class="ta-left">text-align: left</div>
<div class="ta-center">text-align: center</div>
<div class="ta-right">text-align: right</div>
<div class="ta-justify">text-align: justify</div>
```

## Text Transform

```
tt-{value}  → text-transform: {value}
```

```html
<div class="tt-uppercase">text-transform: uppercase</div>
<div class="tt-lowercase">text-transform: lowercase</div>
<div class="tt-capitalize">text-transform: capitalize</div>
```

## Text Decoration

```
td-{value}  → text-decoration: {value}
```

```html
<div class="td-underline">text-decoration: underline</div>
<div class="td-line-through">text-decoration: line-through</div>
<div class="td-none">text-decoration: none</div>
```

## Text Colors

```
text-{color}  → color: {hex}
```

```html
<div class="text-white">White text</div>
<div class="text-black">Black text</div>
<div class="text-gray">Gray text</div>
<div class="text-red">Red text</div>
<div class="text-blue">Blue text</div>
<div class="text-green">Green text</div>
<div class="text-yellow">Yellow text</div>
<div class="text-purple">Purple text</div>
<div class="text-pink">Pink text</div>
<div class="text-indigo">Indigo text</div>
<div class="text-orange">Orange text</div>
<div class="text-teal">Teal text</div>
```

## Examples

### Article Typography

```html
<article class="pad-24" style="max-width: 700px; margin: 0 auto;">
  <h1 class="fs-36 fw-700 lh-40 mar-b-16">Article Title</h1>
  <p class="fs-14 text-gray mar-b-24">Published on January 1, 2024</p>
  <p class="fs-18 lh-28 mar-b-16">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
    tempor incididunt ut labore et dolore magna.
  </p>
  <h2 class="fs-24 fw-600 mar-b-8">Subheading</h2>
  <p class="fs-18 lh-28 mar-b-16">
    More content here with proper line height for readability.
  </p>
</article>
```

### Heading Hierarchy

```html
<h1 class="fs-48 fw-700 lh-56 mar-b-8">Heading 1</h1>
<h2 class="fs-36 fw-700 lh-40 mar-b-8">Heading 2</h2>
<h3 class="fs-30 fw-600 lh-36 mar-b-8">Heading 3</h3>
<h4 class="fs-24 fw-600 lh-32 mar-b-8">Heading 4</h4>
<h5 class="fs-20 fw-600 lh-28 mar-b-8">Heading 5</h5>
<h6 class="fs-16 fw-600 lh-24 mar-b-8">Heading 6</h6>
```

### Label and Caption

```html
<!-- Label -->
<label class="fs-14 fw-500 text-gray">Email Address</label>

<!-- Caption -->
<figcaption class="fs-12 text-gray mar-t-8">Figure 1: Example image</figcaption>

<!-- Fine print -->
<small class="fs-10 text-gray"> Terms and conditions apply </small>
```

### Responsive Typography

```html
<h1 class="fs-24 md:fs-36 lg:fs-48 fw-700">Responsive heading</h1>

<p class="fs-14 md:fs-16 lh-20 md:lh-24">Responsive body text</p>
```

## Tips

- Use `fs-16` as body default
- Use `lh-24` for 16px text (1.5 ratio)
- Use `lh-28` for 18px text
- Use `lh-32` for 20px+ text
- Use `fw-600` for semibold headings
- Use `fw-700` for bold headings
- Use `ta-center` for hero sections
- Use `ls-tight` for large headings
- Use `ls-wide` for uppercase labels
