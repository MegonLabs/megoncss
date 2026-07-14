# Spacing

Exact pixel spacing utilities. No memorization needed.

## Core Concept

```
pad-{value}    → padding: {value}px
mar-{value}    → margin: {value}px
gap-{value}    → gap: {value}px
```

## Padding

### All Sides

```html
<div class="pad-0">padding: 0px</div>
<div class="pad-4">padding: 4px</div>
<div class="pad-8">padding: 8px</div>
<div class="pad-12">padding: 12px</div>
<div class="pad-16">padding: 16px</div>
<div class="pad-24">padding: 24px</div>
<div class="pad-32">padding: 32px</div>
<div class="pad-48">padding: 48px</div>
<div class="pad-64">padding: 64px</div>
<div class="pad-96">padding: 96px</div>
```

### Directional

```html
<!-- Top -->
<div class="pad-t-16">padding-top: 16px</div>

<!-- Bottom -->
<div class="pad-b-16">padding-bottom: 16px</div>

<!-- Left -->
<div class="pad-l-16">padding-left: 16px</div>

<!-- Right -->
<div class="pad-r-16">padding-right: 16px</div>

<!-- Horizontal (left + right) -->
<div class="pad-x-16">padding-left: 16px; padding-right: 16px</div>

<!-- Vertical (top + bottom) -->
<div class="pad-y-16">padding-top: 16px; padding-bottom: 16px</div>
```

### Available Values

| Class    | Value |
| -------- | ----- |
| `pad-0`  | 0px   |
| `pad-1`  | 1px   |
| `pad-2`  | 2px   |
| `pad-4`  | 4px   |
| `pad-6`  | 6px   |
| `pad-8`  | 8px   |
| `pad-10` | 10px  |
| `pad-12` | 12px  |
| `pad-16` | 16px  |
| `pad-20` | 20px  |
| `pad-24` | 24px  |
| `pad-32` | 32px  |
| `pad-40` | 40px  |
| `pad-48` | 48px  |
| `pad-56` | 56px  |
| `pad-64` | 64px  |
| `pad-80` | 80px  |
| `pad-96` | 96px  |

## Margin

### All Sides

```html
<div class="mar-16">margin: 16px</div>
<div class="mar-auto">margin: auto</div>
```

### Directional

```html
<!-- Top -->
<div class="mar-t-16">margin-top: 16px</div>

<!-- Bottom -->
<div class="mar-b-16">margin-bottom: 16px</div>

<!-- Left -->
<div class="mar-l-16">margin-left: 16px</div>

<!-- Right -->
<div class="mar-r-16">margin-right: 16px</div>

<!-- Horizontal -->
<div class="mar-x-16">margin-left: 16px; margin-right: 16px</div>
<div class="mar-x-auto">margin-left: auto; margin-right: auto</div>

<!-- Vertical -->
<div class="mar-y-16">margin-top: 16px; margin-bottom: 16px</div>
<div class="mar-y-auto">margin-top: auto; margin-bottom: auto</div>
```

### Auto Centering

```html
<!-- Center block horizontally -->
<div class="mar-x-auto" style="width: 200px;">Centered block</div>

<!-- Center flex item -->
<div class="flex">
  <div class="mar-l-auto">Pushed to right</div>
</div>
```

## Gap

### Flexbox Gap

```html
<div class="flex gap-16">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Grid Gap

```html
<div class="grid grid-3 gap-24">
  <div>Cell 1</div>
  <div>Cell 2</div>
  <div>Cell 3</div>
</div>
```

### Directional Gap

```html
<!-- Column gap only -->
<div class="flex gap-x-16">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<!-- Row gap only -->
<div class="flex flex-col gap-y-8">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## Examples

### Card with Padding

```html
<div class="card">
  <div class="card-body pad-24">
    <h3 class="fs-18 fw-600 mar-b-16">Card Title</h3>
    <p class="text-gray">Card content with 24px padding</p>
  </div>
</div>
```

### Section Spacing

```html
<section class="pad-y-64">
  <div class="pad-x-24">
    <h2 class="fs-32 fw-700 mar-b-32">Section Title</h2>
    <div class="grid grid-3 gap-24">
      <!-- Content -->
    </div>
  </div>
</section>
```

### Centered Content

```html
<div class="flex items-center justify-center" style="min-height: 100vh;">
  <div class="card" style="width: 400px;">
    <div class="card-body pad-32">Centered card</div>
  </div>
</div>
```

### Responsive Spacing

```html
<div class="pad-16 sm:pad-24 md:pad-32 lg:pad-48">Responsive padding</div>
```

## Tips

- Use `pad-y` for vertical spacing between sections
- Use `pad-x` for horizontal content containers
- Use `mar-b` for spacing between elements
- Use `mar-x-auto` for centering blocks
- Use `gap` instead of margin on flex/grid children
