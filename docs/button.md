# Button Component

Interactive button component with multiple sizes, colors, and states.

## Classes

| Class           | Description                        |
| --------------- | ---------------------------------- |
| `btn`           | Base button styles                 |
| `btn-primary`   | Primary button (blue background)   |
| `btn-secondary` | Secondary button (gray background) |
| `btn-outline`   | Outline button                     |
| `btn-ghost`     | Ghost button (transparent)         |
| `btn-danger`    | Danger button (red background)     |
| `btn-sm`        | Small button                       |
| `btn-md`        | Medium button                      |
| `btn-lg`        | Large button                       |

## Usage

```html
<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-primary btn-sm">Small Primary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-danger">Danger</button>
```

## States

```html
<button class="btn btn-primary" disabled>Disabled</button>
<button class="btn btn-primary btn-loading">Loading...</button>
```

## With Icons

```html
<button class="btn btn-primary">
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <path
      d="M8 1a1 1 0 011 1v5h5a1 1 0 110 2H9v5a1 1 0 11-2 0V9H2a1 1 0 010-2h5V2a1 1 0 011-1z"
    />
  </svg>
  Add Item
</button>
```
