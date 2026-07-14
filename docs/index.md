# MegonCSS Documentation

The utility-first CSS framework with exact pixel naming.

## Quick Start

```html
<script src="https://cdn.megon.org"></script>
```

## Core Concept

Exact Pixel Naming - no memorization needed:

```html
<div class="pad-16">padding: 16px</div>
<div class="fs-18">font-size: 18px</div>
<div class="gap-24">gap: 24px</div>
<div class="round-8">border-radius: 8px</div>
```

## Installation

- [Installation Guide](installation.md)

## Utilities

### Spacing

- [Spacing](spacing.md) - Padding, margin, gap

### Typography

- [Typography](typography.md) - Font size, weight, line height, text alignment

### Colors

- [Colors](colors.md) - Complete color palette

### Layout

- [Layout](layout.md) - Flexbox, grid, display, position, sizing

### Effects

- [Effects](effects.md) - Shadows, opacity, transitions, borders, cursor

## Components

- [Components](components.md) - All UI components

### Component Files

- [Button](button.md)
- [Card](card.md)
- [Modal](modal.md)

## Customization

- [Customization](customization.md) - Theme, colors, spacing, dark mode

## Migration

- [Migration Guide](migration.md) - Migrate from v1 to v2

## Naming Convention

| Category      | Pattern         | Example      |
| ------------- | --------------- | ------------ |
| Padding       | `pad-{value}`   | `pad-16`     |
| Margin        | `mar-{value}`   | `mar-16`     |
| Gap           | `gap-{value}`   | `gap-16`     |
| Font Size     | `fs-{value}`    | `fs-18`      |
| Font Weight   | `fw-{value}`    | `fw-700`     |
| Line Height   | `lh-{value}`    | `lh-24`      |
| Border Radius | `round-{value}` | `round-8`    |
| Background    | `bg-{color}`    | `bg-blue`    |
| Text Color    | `text-{color}`  | `text-white` |

## Responsive Prefixes

| Prefix | Min Width |
| ------ | --------- |
| `sm:`  | 640px     |
| `md:`  | 768px     |
| `lg:`  | 1024px    |
| `xl:`  | 1280px    |
| `2xl:` | 1536px    |

```html
<div class="pad-16 sm:pad-24 md:pad-32 lg:pad-48">Responsive padding</div>
```

## Dark Mode

```html
<div class="bg-white dark:bg-gray-900">Auto dark mode</div>
```

## State Variants

```html
<button class="bg-blue hover:bg-blue-700">
  Hover effect
</button>

<input class="input focus:ring-2">
  Focus effect
</input>

<button class="btn" disabled>
  Disabled state
</button>
```

## Frameworks

### Next.js

```bash
npm install @megoncss/postcss
```

### Vite

```bash
npm install @megoncss/vite
```

### React

```bash
npm install @megoncss/react
```

## AI Integration

### MCP Server

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

## Resources

- [GitHub](https://github.com/megonlabs/megoncss)
- [NPM](https://www.npmjs.com/package/@megoncss/megoncss)
- [CDN](https://cdn.megon.org)
- [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=megoncss.megoncss)
