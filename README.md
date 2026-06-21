# MegonCSS

**Exact Pixel CSS Framework** — `pad-16` = 16px. Zero guessing. Zero memorization.

A utility-first CSS framework with ready components. Bigger than TailwindCSS + shadcn/ui combined.

---

## 🚀 Quick Start

### CDN (development)

```html
<script src="https://cdn.megon.org"></script>
```

### npm

```bash
npm install megoncss
```

```css
@import "megoncss";
```

### PostCSS

```bash
npm install @megoncss/postcss
```

```js
// postcss.config.js
module.exports = {
  plugins: {
    "@megoncss/postcss": {
      content: ["./src/**/*.{html,js,tsx}"],
    },
  },
};
```

---

## 📖 Class Reference

### Spacing — Exact Pixel

| Class        | Output              |
| ------------ | ------------------- |
| `pad-16`     | `padding: 16px`     |
| `pad-x-24`   | `padding: 0 24px`   |
| `pad-y-8`    | `padding: 8px 0`    |
| `pad-t-16`   | `padding-top: 16px` |
| `mar-8`      | `margin: 8px`       |
| `mar-x-auto` | `margin: 0 auto`    |
| `gap-16`     | `gap: 16px`         |

### Typography

| Class       | Output               |
| ----------- | -------------------- |
| `fs-18`     | `font-size: 18px`    |
| `fw-700`    | `font-weight: 700`   |
| `ta-center` | `text-align: center` |

### Layout

| Class         | Output                   |
| ------------- | ------------------------ |
| `flex`        | `display: flex`          |
| `flex-col`    | `flex-direction: column` |
| `grid-3`      | 3 equal columns          |
| `grid-cols-3` | 3 columns (explicit)     |
| `grid-rows-2` | 2 rows                   |
| `hide`        | `display: none`          |
| `w-full`      | `width: 100%`            |

### Colors (Dual System)

| Exact Name      | Shade Equivalent |
| --------------- | ---------------- |
| `bg-blue`       | `bg-blue-500`    |
| `bg-blue-dark`  | `bg-blue-700`    |
| `bg-blue-light` | `bg-blue-100`    |

### Variants

```html
<div class="md:pad-16 hover:bg-blue-dark dark:text-white lg:grid-3"></div>
```

---

## 📦 Packages

| Package                | Purpose               |
| ---------------------- | --------------------- |
| `megoncss`             | Main CSS framework    |
| `@megoncss/core`       | TypeScript engine     |
| `@megoncss/postcss`    | PostCSS plugin        |
| `@megoncss/vite`       | Vite plugin           |
| `@megoncss/cli`        | CLI tool              |
| `@megoncss/browser`    | CDN browser build     |
| `@megoncss/components` | Vanilla JS components |
| `@megoncss/react`      | React components      |

---

## 🏗️ Architecture

```
megoncss/
├── crates/          # Rust (scanner, generator, Node NAPI)
├── packages/        # TypeScript (core, postcss, vite, cli, browser, components, react)
├── ext/             # VS Code extension
├── src/             # CSS source (base, utilities, components, themes)
└── docs/            # Documentation
```

---

## 📊 Comparison

| Feature            | **MegonCSS**       | TailwindCSS v6 | shadcn/ui     |
| ------------------ | ------------------ | -------------- | ------------- |
| Naming             | `pad-16` = 16px    | `p-4` = ?      | N/A           |
| Learning Curve     | **5 min**          | 30 min         | N/A           |
| Ready Components   | ✅ Vanilla + React | ❌             | ✅ React only |
| Zero Build         | ✅ CDN             | ⚠️ CDN only    | ❌            |
| Framework Agnostic | ✅                 | ✅             | ❌            |
| Engine             | Rust + TS          | Rust + TS      | TS            |
| Bundle (JIT)       | **~17KB**          | ~270KB         | N/A           |

---

## 🤝 Contributing

1. Fork the repo
2. Create your feature branch
3. Run `cargo test` and `pnpm test`
4. Submit a PR

---

## License

MIT © Niloy
