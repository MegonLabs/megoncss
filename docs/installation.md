# Installation

Get started with MegonCSS in seconds.

## CDN (Quickest)

Add the script tag to your HTML:

```html
<script src="https://cdn.megon.org"></script>
```

That's it. Start using classes immediately:

```html
<div class="pad-16 bg-blue text-white round-8">Hello MegonCSS</div>
```

## npm Install

```bash
npm install @megoncss/megoncss
```

### PostCSS Plugin

```bash
npm install @megoncss/postcss
```

Add to `postcss.config.js`:

```js
module.exports = {
  plugins: {
    "@megoncss/postcss": {},
  },
};
```

### Vite Plugin

```bash
npm install @megoncss/vite
```

Add to `vite.config.js`:

```js
import megcss from "@megoncss/vite";

export default {
  plugins: [megcss()],
};
```

## CLI

```bash
npm install -g @megoncss/cli

megoncss init
megoncss build
megoncss watch
```

## React Components

```bash
npm install @megoncss/react
```

```jsx
import { Button, Card, Badge } from "@megoncss/react";

function App() {
  return (
    <Card>
      <Badge variant="success">New</Badge>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

## CDN Usage Options

### Auto (Recommended)

```html
<!-- Always loads latest version -->
<script src="https://cdn.megon.org"></script>
```

### Specific Version

```html
<script src="https://cdn.megon.org@0.1.0"></script>
```

### Local File

```html
<script src="./node_modules/@megoncss/browser/dist/megon.js"></script>
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Framework Integration

### Next.js

```bash
npm install @megoncss/postcss
```

Add to `postcss.config.js` (create if not exists):

```js
module.exports = {
  plugins: {
    "@megoncss/postcss": {},
  },
};
```

### Vite

```bash
npm install @megoncss/vite
```

```js
// vite.config.js
import megcss from "@megoncss/vite";

export default {
  plugins: [megcss()],
};
```

### Vue

```bash
npm install @megoncss/postcss
```

```js
// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [require("@megoncss/postcss")],
        },
      },
    },
  },
};
```

### Svelte

Already works with SvelteKit's default PostCSS setup. Just add:

```bash
npm install @megoncss/postcss
```

Create `postcss.config.js`:

```js
export default {
  plugins: {
    "@megoncss/postcss": {},
  },
};
```

## VS Code Extension

Install from VS Code Marketplace:

1. Open VS Code
2. Extensions (Ctrl+Shift+X)
3. Search "MegonCSS"
4. Install

Features:

- Autocomplete for all classes
- Hover documentation
- Color swatches
- Sort classes

## Verification

After installation, verify it works:

```html
<!DOCTYPE html>
<html>
  <head>
    <script src="https://cdn.megon.org"></script>
  </head>
  <body>
    <div class="pad-32 bg-blue text-white fs-24 fw-700 round-8">
      MegonCSS is working!
    </div>
  </body>
</html>
```

You should see a blue card with white text, padded 32px, with rounded corners.
