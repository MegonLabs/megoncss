# Card Component

Container component for grouping related content.

## Classes

| Class         | Description         |
| ------------- | ------------------- |
| `card`        | Card container      |
| `card-header` | Card header section |
| `card-body`   | Card body content   |
| `card-footer` | Card footer section |

## Basic Usage

```html
<div class="card">
  <div class="card-body">
    <h3 class="fs-18 fw-600">Card Title</h3>
    <p class="text-gray">Card content goes here</p>
  </div>
</div>
```

## With Header and Footer

```html
<div class="card">
  <div class="card-header">
    <h3 class="fs-18 fw-600">Header</h3>
  </div>
  <div class="card-body">
    <p>Main content</p>
  </div>
  <div class="card-footer">
    <button class="btn btn-primary">Save</button>
  </div>
</div>
```

## Interactive Card

```html
<div class="card cursor-pointer">
  <div class="card-body">
    <h3 class="fs-18 fw-600">Clickable Card</h3>
    <p class="text-gray">This card is clickable</p>
  </div>
</div>
```
