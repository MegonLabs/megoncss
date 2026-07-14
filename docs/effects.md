# Effects

Shadows, opacity, transitions, borders, and cursor utilities.

## Shadows

```html
<div class="shadow-none">No shadow</div>
<div class="shadow-sm">Small shadow</div>
<div class="shadow-md">Medium shadow</div>
<div class="shadow-lg">Large shadow</div>
<div class="shadow-xl">Extra large shadow</div>
<div class="shadow-2xl">2XL shadow</div>
<div class="shadow-inner">Inner shadow</div>
```

### Shadow Values

| Class          | CSS                                                                               |
| -------------- | --------------------------------------------------------------------------------- |
| `shadow-none`  | `box-shadow: none`                                                                |
| `shadow-sm`    | `box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`                                       |
| `shadow-md`    | `box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)`    |
| `shadow-lg`    | `box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`  |
| `shadow-xl`    | `box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| `shadow-2xl`   | `box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)`                                 |
| `shadow-inner` | `box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)`                                 |

## Opacity

```html
<div class="opacity-0">opacity: 0</div>
<div class="opacity-5">opacity: 0.05</div>
<div class="opacity-10">opacity: 0.1</div>
<div class="opacity-25">opacity: 0.25</div>
<div class="opacity-50">opacity: 0.5</div>
<div class="opacity-75">opacity: 0.75</div>
<div class="opacity-100">opacity: 1</div>
```

### Opacity Values

| Class         | Value |
| ------------- | ----- |
| `opacity-0`   | 0     |
| `opacity-5`   | 0.05  |
| `opacity-10`  | 0.1   |
| `opacity-20`  | 0.2   |
| `opacity-25`  | 0.25  |
| `opacity-30`  | 0.3   |
| `opacity-40`  | 0.4   |
| `opacity-50`  | 0.5   |
| `opacity-60`  | 0.6   |
| `opacity-70`  | 0.7   |
| `opacity-75`  | 0.75  |
| `opacity-80`  | 0.8   |
| `opacity-90`  | 0.9   |
| `opacity-95`  | 0.95  |
| `opacity-100` | 1     |

## Transitions

```html
<div class="transition">transition: all 150ms ease</div>
```

### Hover Effects

```html
<button class="transition hover:opacity-75">Fade on hover</button>
<button class="transition hover:shadow-lg">Shadow on hover</button>
<button class="transition hover:scale-105">Scale on hover</button>
```

## Border Radius

```html
<div class="round-none">border-radius: 0</div>
<div class="round-sm">border-radius: 2px</div>
<div class="round">border-radius: 4px</div>
<div class="round-md">border-radius: 6px</div>
<div class="round-lg">border-radius: 8px</div>
<div class="round-xl">border-radius: 12px</div>
<div class="round-2xl">border-radius: 16px</div>
<div class="round-3xl">border-radius: 24px</div>
<div class="round-full">border-radius: 9999px</div>
```

### Pixel Values

```html
<div class="round-0">border-radius: 0px</div>
<div class="round-2">border-radius: 2px</div>
<div class="round-4">border-radius: 4px</div>
<div class="round-8">border-radius: 8px</div>
<div class="round-12">border-radius: 12px</div>
<div class="round-16">border-radius: 16px</div>
<div class="round-24">border-radius: 24px</div>
<div class="round-32">border-radius: 32px</div>
```

## Borders

```html
<div class="border">border-width: 1px</div>
<div class="border-0">border-width: 0</div>
<div class="border-2">border-width: 2px</div>
<div class="border-4">border-width: 4px</div>
<div class="border-8">border-width: 8px</div>
```

### Directional Borders

```html
<div class="border-t">border-top-width: 1px</div>
<div class="border-b">border-bottom-width: 1px</div>
<div class="border-l">border-left-width: 1px</div>
<div class="border-r">border-right-width: 1px</div>
<div class="border-x">border-left: 1px; border-right: 1px</div>
<div class="border-y">border-top: 1px; border-bottom: 1px</div>
```

### Border Style

```html
<div class="border-solid">border-style: solid</div>
<div class="border-dashed">border-style: dashed</div>
<div class="border-dotted">border-style: dotted</div>
<div class="border-double">border-style: double</div>
<div class="border-none">border-style: none</div>
```

### Border Color

```html
<div class="border border-gray">Gray border</div>
<div class="border border-blue">Blue border</div>
<div class="border border-red">Red border</div>
<div class="border border-green">Green border</div>
<div class="border border-black">Black border</div>
<div class="border border-white">White border</div>
```

## Cursor

```html
<button class="cursor-pointer">pointer</button>
<button class="cursor-default">default</button>
<button class="cursor-not-allowed">not-allowed</button>
<button class="cursor-grab">grab</button>
<button class="cursor-grabbing">grabbing</button>
<button class="cursor-text">text</button>
<button class="cursor-wait">wait</button>
<button class="cursor-crosshair">crosshair</button>
<button class="cursor-zoom-in">zoom-in</button>
<button class="cursor-zoom-out">zoom-out</button>
```

## Examples

### Card with Effects

```html
<div class="card shadow-md round-lg transition hover:shadow-xl">
  <div class="card-body">Hover for shadow effect</div>
</div>
```

### Button Styles

```html
<!-- Outline button -->
<button
  class="border border-blue text-blue round-md transition hover:bg-blue hover:text-white"
>
  Outline
</button>

<!-- Ghost button -->
<button class="text-gray round-md transition hover:bg-gray-100">Ghost</button>

<!-- Pill button -->
<button
  class="bg-blue text-white round-full pad-x-24 pad-y-8 transition hover:bg-blue-700"
>
  Pill
</button>
```

### Overlay

```html
<div class="relative">
  <img src="image.jpg" alt="Image" />
  <div class="absolute inset-0 bg-black opacity-50"></div>
  <div class="absolute inset-0 flex items-center justify-center text-white">
    Overlay Text
  </div>
</div>
```

### Loading Skeleton

```html
<div class="animate-pulse">
  <div class="h-4 bg-gray-200 round mb-2"></div>
  <div class="h-4 bg-gray-200 round mb-2" style="width: 80%"></div>
  <div class="h-4 bg-gray-200 round" style="width: 60%"></div>
</div>
```

### Modal Backdrop

```html
<div class="fixed inset-0 bg-black opacity-50 z-40"></div>
<div class="fixed inset-0 flex items-center justify-center z-50">
  <div class="card shadow-2xl round-xl">Modal content</div>
</div>
```

## Tips

- Use `shadow-sm` for subtle elevation
- Use `shadow-md` for cards
- Use `shadow-lg` for dropdowns
- Use `shadow-xl` for modals
- Use `transition` with hover states for smooth effects
- Use `round-full` for pill shapes and avatars
- Use `opacity-50` for disabled states
- Use `cursor-not-allowed` for disabled buttons
