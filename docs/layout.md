# Layout

Display, flexbox, grid, and position utilities.

## Display

```html
<div class="hide">display: none</div>
<div class="block">display: block</div>
<div class="inline">display: inline</div>
<div class="inline-block">display: inline-block</div>
<div class="flex">display: flex</div>
<div class="grid">display: grid</div>
```

## Flexbox

### Direction

```html
<div class="flex flex-row">flex-direction: row (default)</div>
<div class="flex flex-col">flex-direction: column</div>
<div class="flex flex-row-reverse">flex-direction: row-reverse</div>
<div class="flex flex-col-reverse">flex-direction: column-reverse</div>
```

### Wrap

```html
<div class="flex flex-wrap">flex-wrap: wrap</div>
<div class="flex flex-nowrap">flex-wrap: nowrap</div>
<div class="flex flex-wrap-reverse">flex-wrap: wrap-reverse</div>
```

### Align Items

```html
<div class="flex items-start">align-items: flex-start</div>
<div class="flex items-center">align-items: center</div>
<div class="flex items-end">align-items: flex-end</div>
<div class="flex items-stretch">align-items: stretch</div>
<div class="flex items-baseline">align-items: baseline</div>
```

### Justify Content

```html
<div class="flex justify-start">justify-content: flex-start</div>
<div class="flex justify-center">justify-content: center</div>
<div class="flex justify-end">justify-content: flex-end</div>
<div class="flex justify-between">justify-content: space-between</div>
<div class="flex justify-around">justify-content: space-around</div>
<div class="flex justify-evenly">justify-content: space-evenly</div>
```

### Flex Grow/Shrink

```html
<div class="flex">
  <div class="grow">flex-grow: 1</div>
  <div class="grow-2">flex-grow: 2</div>
  <div class="shrink">flex-shrink: 1</div>
  <div class="shrink-0">flex-shrink: 0</div>
</div>
```

### Flex Basis

```html
<div class="flex">
  <div class="basis-0">flex-basis: 0px</div>
  <div class="basis-auto">flex-basis: auto</div>
  <div class="basis-1-2">flex-basis: 50%</div>
  <div class="basis-1-3">flex-basis: 33.333%</div>
</div>
```

## Grid

### Template Columns

```html
<!-- Shorthand -->
<div class="grid grid-2">2 columns</div>
<div class="grid grid-3">3 columns</div>
<div class="grid grid-4">4 columns</div>
<div class="grid grid-5">5 columns</div>
<div class="grid grid-6">6 columns</div>
<div class="grid grid-12">12 columns</div>

<!-- Explicit -->
<div class="grid grid-cols-1">1 column</div>
<div class="grid grid-cols-2">2 columns</div>
<div class="grid grid-cols-3">3 columns</div>
<div class="grid grid-cols-4">4 columns</div>
<div class="grid grid-cols-6">6 columns</div>
<div class="grid grid-cols-12">12 columns</div>
```

### Template Rows

```html
<div class="grid grid-rows-1">1 row</div>
<div class="grid grid-rows-2">2 rows</div>
<div class="grid grid-rows-3">3 rows</div>
<div class="grid grid-rows-4">4 rows</div>
```

### Column Span

```html
<div class="grid grid-cols-3">
  <div class="col-span-2">Spans 2 columns</div>
  <div>Spans 1 column</div>
</div>

<div class="grid grid-cols-4">
  <div class="col-span-4">Full width</div>
  <div class="col-span-2">Half width</div>
  <div class="col-span-2">Half width</div>
</div>
```

### Row Span

```html
<div class="grid grid-cols-3 grid-rows-2">
  <div class="row-span-2">Spans 2 rows</div>
  <div>Cell</div>
  <div>Cell</div>
  <div>Cell</div>
  <div>Cell</div>
</div>
```

### Gap

```html
<div class="grid grid-3 gap-8">Small gap</div>
<div class="grid grid-3 gap-16">Medium gap</div>
<div class="grid grid-3 gap-24">Large gap</div>
<div class="grid grid-3 gap-x-16 gap-y-8">Different x/y gaps</div>
```

## Position

```html
<div class="relative">position: relative</div>
<div class="absolute">position: absolute</div>
<div class="fixed">position: fixed</div>
<div class="sticky">position: sticky</div>
<div class="static">position: static</div>
```

### Inset

```html
<div class="relative">
  <div class="absolute inset-0">Covers parent</div>
</div>

<div class="relative">
  <div class="absolute top-0">top: 0px</div>
  <div class="absolute right-0">right: 0px</div>
  <div class="absolute bottom-0">bottom: 0px</div>
  <div class="absolute left-0">left: 0px</div>
</div>
```

### Z-Index

```html
<div class="relative">
  <div class="z-0">z-index: 0</div>
  <div class="z-10">z-index: 10</div>
  <div class="z-20">z-index: 20</div>
  <div class="z-30">z-index: 30</div>
  <div class="z-40">z-index: 40</div>
  <div class="z-50">z-index: 50</div>
</div>
```

## Sizing

### Width

```html
<div class="w-0">width: 0px</div>
<div class="w-4">width: 4px</div>
<div class="w-8">width: 8px</div>
<div class="w-16">width: 16px</div>
<div class="w-24">width: 24px</div>
<div class="w-32">width: 32px</div>
<div class="w-48">width: 48px</div>
<div class="w-64">width: 64px</div>
<div class="w-auto">width: auto</div>
<div class="w-full">width: 100%</div>
<div class="w-screen">width: 100vw</div>
<div class="w-1-2">width: 50%</div>
<div class="w-1-3">width: 33.333%</div>
<div class="w-2-3">width: 66.666%</div>
<div class="w-1-4">width: 25%</div>
<div class="w-3-4">width: 75%</div>
```

### Height

```html
<div class="h-0">height: 0px</div>
<div class="h-4">height: 4px</div>
<div class="h-8">height: 8px</div>
<div class="h-16">height: 16px</div>
<div class="h-24">height: 24px</div>
<div class="h-32">height: 32px</div>
<div class="h-48">height: 48px</div>
<div class="h-64">height: 64px</div>
<div class="h-auto">height: auto</div>
<div class="h-full">height: 100%</div>
<div class="h-screen">height: 100vh</div>
```

### Max Width

```html
<div class="max-w-sm">max-width: 384px</div>
<div class="max-w-md">max-width: 448px</div>
<div class="max-w-lg">max-width: 512px</div>
<div class="max-w-xl">max-width: 576px</div>
<div class="max-w-2xl">max-width: 672px</div>
<div class="max-w-4xl">max-width: 896px</div>
<div class="max-w-6xl">max-width: 1152px</div>
<div class="max-w-full">max-width: 100%</div>
```

### Min/Max Height

```html
<div class="min-h-0">min-height: 0px</div>
<div class="min-h-screen">min-height: 100vh</div>
<div class="max-h-48">max-height: 48px</div>
<div class="max-h-screen">max-height: 100vh</div>
```

## Overflow

```html
<div class="overflow-hidden">overflow: hidden</div>
<div class="overflow-auto">overflow: auto</div>
<div class="overflow-scroll">overflow: scroll</div>
<div class="overflow-x-auto">overflow-x: auto</div>
<div class="overflow-y-auto">overflow-y: auto</div>
```

## Visibility

```html
<div class="visible">visibility: visible</div>
<div class="invisible">visibility: invisible</div>
<div class="hide">display: none</div>
```

## Examples

### Centered Content

```html
<div class="flex items-center justify-center" style="min-height: 100vh;">
  <div class="card">Centered</div>
</div>
```

### Holy Grail Layout

```html
<div class="flex" style="min-height: 100vh;">
  <aside class="w-64 bg-gray-100">Sidebar</aside>
  <div class="flex-1 flex flex-col">
    <header class="h-16 bg-white">Header</header>
    <main class="flex-1 pad-24">Content</main>
    <footer class="h-16 bg-gray-100">Footer</footer>
  </div>
</div>
```

### Dashboard Grid

```html
<div class="grid grid-cols-12 gap-24" style="min-height: 100vh;">
  <aside class="col-span-2 bg-gray-900">Nav</aside>
  <div class="col-span-10">
    <header class="h-16 bg-white">Header</header>
    <main class="pad-24">
      <div class="grid grid-4 gap-24">
        <!-- Stats -->
      </div>
    </main>
  </div>
</div>
```

### Sticky Header

```html
<div class="grid grid-rows-[auto_1fr_auto]" style="min-height: 100vh;">
  <header class="sticky top-0 bg-white">Header</header>
  <main>Content</main>
  <footer>Footer</footer>
</div>
```

## Tips

- Use `flex` for 1D layouts (rows or columns)
- Use `grid` for 2D layouts (rows and columns)
- Use `items-center justify-center` to center anything
- Use `gap` instead of margins on flex/grid children
- Use `sticky top-0` for sticky headers
- Use `overflow-hidden` to clip content
- Use `z-10` to `z-50` for stacking context
