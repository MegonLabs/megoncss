# Customization

Customize MegonCSS to match your brand.

## PostCSS Configuration

### Custom Colors

```js
// postcss.config.js
module.exports = {
  plugins: {
    "@megoncss/postcss": {
      colors: {
        brand: "#ff6b00",
        "brand-light": "#ff8533",
        "brand-dark": "#cc5500",
        primary: "#3b82f6",
        secondary: "#6b7280",
      },
    },
  },
};
```

### Custom Spacing

```js
module.exports = {
  plugins: {
    "@megoncss/postcss": {
      spacing: {
        128: "128px",
        144: "144px",
        160: "160px",
      },
    },
  },
};
```

### Custom Breakpoints

```js
module.exports = {
  plugins: {
    "@megoncss/postcss": {
      screens: {
        xs: "480px",
        "3xl": "1920px",
      },
    },
  },
};
```

## CLI Configuration

Create `megoncss.config.js`:

```js
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx,vue,svelte}"],
  theme: {
    colors: {
      brand: "#ff6b00",
      primary: "#3b82f6",
    },
    spacing: {
      128: "128px",
      144: "144px",
    },
    screens: {
      xs: "480px",
      "3xl": "1920px",
    },
  },
};
```

## CDN Configuration

Add config before the script:

```html
<script>
  window.MegonCSS = {
    colors: {
      brand: "#ff6b00",
      primary: "#3b82f6",
    },
  };
</script>
<script src="https://cdn.megon.org"></script>
```

## React Components

### Custom Theme Provider

```jsx
import { MegonProvider } from "@megoncss/react";

const theme = {
  colors: {
    brand: "#ff6b00",
    primary: "#3b82f6",
  },
};

function App() {
  return (
    <MegonProvider theme={theme}>
      <YourApp />
    </MegonProvider>
  );
}
```

## Adding Custom Classes

### Extend Existing

```js
module.exports = {
  plugins: {
    "@megoncss/postcss": {
      extend: {
        spacing: {
          128: "128px",
          144: "144px",
        },
        colors: {
          brand: "#ff6b00",
        },
      },
    },
  },
};
```

### Custom Utilities

Create `custom.css`:

```css
@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
}
```

## Dark Mode

### Automatic

```html
<div class="bg-white dark:bg-gray-900 text-black dark:text-white">
  Auto dark mode
</div>
```

### Manual Toggle

```js
// Toggle dark mode
document.documentElement.classList.toggle("dark");
```

### Custom Dark Colors

```js
module.exports = {
  plugins: {
    "@megoncss/postcss": {
      darkMode: "class",
      colors: {
        dark: {
          bg: "#0f172a",
          surface: "#1e293b",
          border: "#334155",
        },
      },
    },
  },
};
```

## Responsive Design

### Default Breakpoints

| Prefix | Min Width |
| ------ | --------- |
| `sm`   | 640px     |
| `md`   | 768px     |
| `lg`   | 1024px    |
| `xl`   | 1280px    |
| `2xl`  | 1536px    |

### Usage

```html
<div class="pad-16 sm:pad-24 md:pad-32 lg:pad-48">Responsive padding</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  Responsive grid
</div>
```

## Custom Components

### Button Variants

```css
@layer components {
  .btn-brand {
    background-color: var(--brand);
    color: white;
    padding: 8px 16px;
    border-radius: 6px;
    transition: background-color 150ms;
  }

  .btn-brand:hover {
    background-color: var(--brand-dark);
  }
}
```

### Card Variants

```css
@layer components {
  .card-elevated {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    transition: box-shadow 150ms;
  }

  .card-elevated:hover {
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  }
}
```

## CSS Variables

MegonCSS uses CSS variables for theming:

```css
:root {
  --megon-primary: #3b82f6;
  --megon-secondary: #6b7280;
  --megon-success: #10b981;
  --megon-warning: #f59e0b;
  --megon-danger: #ef4444;
  --megon-info: #3b82f6;
}
```

### Override Variables

```css
:root {
  --megon-primary: #ff6b00;
}
```

## Build Optimization

### Content Scanning

Only generate CSS for classes you use:

```js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
};
```

### Purge Unused

```bash
megoncss build --purge
```

### Minify

```bash
megoncss build --minify
```

## Examples

### Brand Theme

```js
module.exports = {
  plugins: {
    "@megoncss/postcss": {
      colors: {
        brand: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
      },
    },
  },
};
```

### Custom Spacing Scale

```js
module.exports = {
  plugins: {
    "@megoncss/postcss": {
      spacing: {
        0: "0px",
        px: "1px",
        0.5: "2px",
        1: "4px",
        1.5: "6px",
        2: "8px",
        2.5: "10px",
        3: "12px",
        3.5: "14px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
        11: "44px",
        12: "48px",
        14: "56px",
        16: "64px",
        20: "80px",
        24: "96px",
        28: "112px",
        32: "128px",
        36: "144px",
        40: "160px",
        44: "176px",
        48: "192px",
        52: "208px",
        56: "224px",
        60: "240px",
        64: "256px",
        72: "288px",
        80: "320px",
        96: "384px",
      },
    },
  },
};
```

## Tips

- Use CSS variables for easy theme switching
- Use content scanning to minimize CSS size
- Use dark mode classes for automatic theming
- Use custom components for consistent styling
- Use responsive prefixes for mobile-first design
- Use `@layer` for proper CSS specificity
