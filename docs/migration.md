# Migration Guide

Migrate from MegonCSS v1 to v2.

## Overview

v2 is a complete rewrite with:

- Exact Pixel naming (`pad-16` = 16px)
- TypeScript + Rust core
- Better performance
- More utilities
- React components
- VS Code extension
- MCP Server for AI

## Quick Migration

### 1. Update Installation

```bash
# Remove old
npm uninstall megoncss

# Install new
npm install @megoncss/megoncss
```

### 2. Update PostCSS Config

```js
// postcss.config.js
module.exports = {
  plugins: {
    "@megoncss/postcss": {},
  },
};
```

### 3. Update CSS Import

```html
<!-- Old -->
<link rel="stylesheet" href="megoncss.min.css" />

<!-- New -->
<script src="https://cdn.megon.org"></script>
```

## Class Name Changes

### Spacing

| v1     | v2        | Change          |
| ------ | --------- | --------------- |
| `p-4`  | `pad-4`   | `p` -> `pad`    |
| `px-4` | `pad-x-4` | `px` -> `pad-x` |
| `py-4` | `pad-y-4` | `py` -> `pad-y` |
| `pt-4` | `pad-t-4` | `pt` -> `pad-t` |
| `pb-4` | `pad-b-4` | `pb` -> `pad-b` |
| `pl-4` | `pad-l-4` | `pl` -> `pad-l` |
| `pr-4` | `pad-r-4` | `pr` -> `pad-r` |
| `m-4`  | `mar-4`   | `m` -> `mar`    |
| `mx-4` | `mar-x-4` | `mx` -> `mar-x` |
| `my-4` | `mar-y-4` | `my` -> `mar-y` |
| `mt-4` | `mar-t-4` | `mt` -> `mar-t` |
| `mb-4` | `mar-b-4` | `mb` -> `mar-b` |
| `ml-4` | `mar-l-4` | `ml` -> `mar-l` |
| `mr-4` | `mar-r-4` | `mr` -> `mar-r` |

### Typography

| v1                | v2                | Change                |
| ----------------- | ----------------- | --------------------- |
| `text-sm`         | `fs-12`           | Named -> pixel        |
| `text-base`       | `fs-16`           | Named -> pixel        |
| `text-lg`         | `fs-18`           | Named -> pixel        |
| `text-xl`         | `fs-20`           | Named -> pixel        |
| `text-2xl`        | `fs-24`           | Named -> pixel        |
| `font-bold`       | `fw-700`          | Named -> number       |
| `font-semibold`   | `fw-600`          | Named -> number       |
| `font-medium`     | `fw-500`          | Named -> number       |
| `leading-tight`   | `lh-20`           | Named -> pixel        |
| `leading-normal`  | `lh-24`           | Named -> pixel        |
| `leading-relaxed` | `lh-28`           | Named -> pixel        |
| `tracking-tight`  | `ls-tight`        | Named -> abbreviation |
| `tracking-wide`   | `ls-wide`         | Named -> abbreviation |
| `uppercase`       | `tt-uppercase`    | Named -> `tt-` prefix |
| `lowercase`       | `tt-lowercase`    | Named -> `tt-` prefix |
| `capitalize`      | `tt-capitalize`   | Named -> `tt-` prefix |
| `underline`       | `td-underline`    | Named -> `td-` prefix |
| `line-through`    | `td-line-through` | Named -> `td-` prefix |
| `no-underline`    | `td-none`         | Named -> `td-none`    |

### Colors

| v1              | v2            | Change        |
| --------------- | ------------- | ------------- |
| `text-blue-500` | `text-blue`   | Shade -> base |
| `bg-blue-500`   | `bg-blue`     | Shade -> base |
| `text-gray-600` | `text-gray`   | Shade -> base |
| `bg-gray-100`   | `bg-gray-100` | Same          |
| `text-white`    | `text-white`  | Same          |
| `text-black`    | `text-black`  | Same          |

### Display

| v1             | v2             | Change             |
| -------------- | -------------- | ------------------ |
| `hidden`       | `hide`         | `hidden` -> `hide` |
| `block`        | `block`        | Same               |
| `inline-block` | `inline-block` | Same               |
| `flex`         | `flex`         | Same               |
| `grid`         | `grid`         | Same               |

### Flexbox

| v1                | v2                | Change |
| ----------------- | ----------------- | ------ |
| `flex-row`        | `flex-row`        | Same   |
| `flex-col`        | `flex-col`        | Same   |
| `items-center`    | `items-center`    | Same   |
| `justify-center`  | `justify-center`  | Same   |
| `justify-between` | `justify-between` | Same   |
| `grow`            | `grow`            | Same   |
| `shrink`          | `shrink`          | Same   |

### Grid

| v1            | v2            | Change          |
| ------------- | ------------- | --------------- |
| `grid-cols-3` | `grid-3`      | Shorthand added |
| `grid-cols-3` | `grid-cols-3` | Still works     |
| `grid-rows-2` | `grid-rows-2` | Same            |
| `col-span-2`  | `col-span-2`  | Same            |

### Border Radius

| v1             | v2           | Change               |
| -------------- | ------------ | -------------------- |
| `rounded`      | `round`      | `rounded` -> `round` |
| `rounded-sm`   | `round-sm`   | `rounded` -> `round` |
| `rounded-lg`   | `round-lg`   | `rounded` -> `round` |
| `rounded-xl`   | `round-xl`   | `rounded` -> `round` |
| `rounded-2xl`  | `round-2xl`  | `rounded` -> `round` |
| `rounded-full` | `round-full` | `rounded` -> `round` |

### Shadows

| v1             | v2             | Change        |
| -------------- | -------------- | ------------- |
| `shadow`       | `shadow-md`    | Explicit size |
| `shadow-sm`    | `shadow-sm`    | Same          |
| `shadow-lg`    | `shadow-lg`    | Same          |
| `shadow-xl`    | `shadow-xl`    | Same          |
| `shadow-2xl`   | `shadow-2xl`   | Same          |
| `shadow-inner` | `shadow-inner` | Same          |
| `shadow-none`  | `shadow-none`  | Same          |

### Opacity

| v1            | v2            | Change |
| ------------- | ------------- | ------ |
| `opacity-0`   | `opacity-0`   | Same   |
| `opacity-50`  | `opacity-50`  | Same   |
| `opacity-100` | `opacity-100` | Same   |

### Overflow

| v1                | v2                | Change |
| ----------------- | ----------------- | ------ |
| `overflow-hidden` | `overflow-hidden` | Same   |
| `overflow-auto`   | `overflow-auto`   | Same   |
| `overflow-scroll` | `overflow-scroll` | Same   |

### Visibility

| v1          | v2          | Change |
| ----------- | ----------- | ------ |
| `invisible` | `invisible` | Same   |
| `visible`   | `visible`   | Same   |

### Cursor

| v1                   | v2                   | Change |
| -------------------- | -------------------- | ------ |
| `cursor-pointer`     | `cursor-pointer`     | Same   |
| `cursor-not-allowed` | `cursor-not-allowed` | Same   |

### Position

| v1         | v2         | Change |
| ---------- | ---------- | ------ |
| `relative` | `relative` | Same   |
| `absolute` | `absolute` | Same   |
| `fixed`    | `fixed`    | Same   |
| `sticky`   | `sticky`   | Same   |
| `inset-0`  | `inset-0`  | Same   |

### Width/Height

| v1         | v2         | Change |
| ---------- | ---------- | ------ |
| `w-full`   | `w-full`   | Same   |
| `w-screen` | `w-screen` | Same   |
| `h-full`   | `h-full`   | Same   |
| `h-screen` | `h-screen` | Same   |
| `max-w-sm` | `max-w-sm` | Same   |
| `max-w-md` | `max-w-md` | Same   |
| `max-w-lg` | `max-w-lg` | Same   |
| `max-w-xl` | `max-w-xl` | Same   |

## Component Changes

| v1            | v2            | Change |
| ------------- | ------------- | ------ |
| `btn`         | `btn`         | Same   |
| `btn-primary` | `btn-primary` | Same   |
| `input`       | `input`       | Same   |
| `card`        | `card`        | Same   |
| `badge`       | `badge`       | Same   |
| `alert`       | `alert`       | Same   |
| `modal`       | `modal`       | Same   |
| `toast`       | `toast`       | Same   |
| `table`       | `table`       | Same   |

## Migration Script

Run this script to auto-update class names:

```bash
npx @megoncss/migrate
```

### What it does:

1. Scans your files
2. Finds old class names
3. Replaces with new names
4. Reports changes

### Manual Migration

If you prefer manual updates:

1. Search and replace common patterns:
   - `p-` -> `pad-`
   - `px-` -> `pad-x-`
   - `py-` -> `pad-y-`
   - `pt-` -> `pad-t-`
   - `pb-` -> `pad-b-`
   - `pl-` -> `pad-l-`
   - `pr-` -> `pad-r-`
   - `m-` -> `mar-`
   - `mx-` -> `mar-x-`
   - `my-` -> `mar-y-`
   - `mt-` -> `mar-t-`
   - `mb-` -> `mar-b-`
   - `ml-` -> `mar-l-`
   - `mr-` -> `mar-r-`
   - `rounded` -> `round`
   - `hidden` -> `hide`
   - `text-` -> `fs-` (for sizes)
   - `font-` -> `fw-` (for weights)
   - `leading-` -> `lh-` (for line heights)
   - `tracking-` -> `ls-` (for letter spacing)

## Breaking Changes

### 1. Spacing Scale

v2 uses exact pixels, not arbitrary scale:

```html
<!-- v1 -->
<div class="p-4">4 units</div>

<!-- v2 -->
<div class="pad-16">16px</div>
```

### 2. Color Shades

v2 uses base colors by default:

```html
<!-- v1 -->
<div class="bg-blue-500">Blue</div>

<!-- v2 -->
<div class="bg-blue">Blue</div>
```

### 3. Typography

v2 uses pixel values:

```html
<!-- v1 -->
<div class="text-lg">Large</div>

<!-- v2 -->
<div class="fs-18">Large</div>
```

### 4. Border Radius

v2 uses `round` instead of `rounded`:

```html
<!-- v1 -->
<div class="rounded-lg">Rounded</div>

<!-- v2 -->
<div class="round-lg">Rounded</div>
```

## New Features

### 1. Pixel-Based Values

```html
<div class="pad-16">16px padding</div>
<div class="fs-18">18px font size</div>
<div class="round-8">8px border radius</div>
```

### 2. React Components

```jsx
import { Button, Card, Badge } from "@megoncss/react";

<Button variant="primary">Click</Button>
<Card>Content</Card>
<Badge variant="success">New</Badge>
```

### 3. VS Code Extension

- Autocomplete
- Hover docs
- Color swatches
- Class sorting

### 4. MCP Server

AI-powered documentation:

```json
{
  "mcpServers": {
    "megoncss": {
      "command": "npx",
      "args": ["-y", "@megoncss/mcp"]
    }
  }
}
```

### 5. More Utilities

- `gap-x-*` / `gap-y-*` for directional gaps
- `lh-{pixel}` for line height
- `ls-tight` / `ls-wide` for letter spacing
- `tt-uppercase` / `tt-lowercase` / `tt-capitalize`
- `td-underline` / `td-line-through` / `td-none`

## Troubleshooting

### Classes Not Working

1. Check import/installation
2. Clear cache
3. Rebuild

### Colors Not Showing

1. Check color names
2. Verify PostCSS config
3. Check for typos

### Components Not Styling

1. Import component CSS
2. Check class names
3. Verify version

## Need Help?

- [GitHub Issues](https://github.com/megonlabs/megoncss/issues)
- [Discord Community](https://discord.gg/megoncss)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/megoncss)
