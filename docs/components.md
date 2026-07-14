# Components

Pre-built UI components for common patterns.

## Button

### Base

```html
<button class="btn">Default</button>
```

### Variants

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>
<button class="btn btn-danger">Danger</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-warning">Warning</button>
```

### Sizes

```html
<button class="btn btn-sm">Small</button>
<button class="btn btn-md">Medium</button>
<button class="btn btn-lg">Large</button>
```

### States

```html
<button class="btn btn-primary" disabled>Disabled</button>
<button class="btn btn-primary btn-loading">Loading...</button>
```

### Full Width

```html
<button class="btn btn-primary w-full">Full Width</button>
```

## Input

### Base

```html
<input class="input" type="text" placeholder="Enter text..." />
```

### Sizes

```html
<input class="input input-sm" type="text" placeholder="Small" />
<input class="input input-md" type="text" placeholder="Medium" />
<input class="input input-lg" type="text" placeholder="Large" />
```

### States

```html
<input class="input input-error" type="text" placeholder="Error" />
<input class="input input-success" type="text" placeholder="Success" />
```

### With Label

```html
<div class="field">
  <label class="field-label">Email</label>
  <input class="input" type="email" placeholder="you@example.com" />
  <span class="field-hint">We'll never share your email</span>
</div>
```

## Select

```html
<select class="select">
  <option>Select option</option>
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>
```

## Textarea

```html
<textarea class="textarea" rows="4" placeholder="Enter message..."></textarea>
```

## Card

### Base

```html
<div class="card">
  <div class="card-body">Card content</div>
</div>
```

### With Header/Footer

```html
<div class="card">
  <div class="card-header">
    <h3 class="fs-18 fw-600">Header</h3>
  </div>
  <div class="card-body">Body content</div>
  <div class="card-footer">
    <button class="btn btn-primary">Save</button>
  </div>
</div>
```

### Interactive

```html
<div class="card cursor-pointer transition hover:shadow-lg">
  <div class="card-body">Clickable card</div>
</div>
```

## Badge

### Variants

```html
<span class="badge">Default</span>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-danger">Danger</span>
<span class="badge badge-info">Info</span>
```

### Sizes

```html
<span class="badge badge-sm">Small</span>
<span class="badge badge-md">Medium</span>
<span class="badge badge-lg">Large</span>
```

### Styles

```html
<span class="badge badge-outline">Outline</span>
<span class="badge badge-pill">Pill</span>
```

## Alert

### Variants

```html
<div class="alert alert-info">Info message</div>
<div class="alert alert-success">Success message</div>
<div class="alert alert-warning">Warning message</div>
<div class="alert alert-danger">Danger message</div>
```

### Sizes

```html
<div class="alert alert-info alert-sm">Small alert</div>
<div class="alert alert-info alert-md">Medium alert</div>
<div class="alert alert-info alert-lg">Large alert</div>
```

### With Icon

```html
<div class="alert alert-success">
  <div class="flex items-center gap-12">
    <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
      <path
        fill-rule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      />
    </svg>
    <span>Success! Your changes were saved.</span>
  </div>
</div>
```

## Modal

### Basic

```html
<div class="modal-overlay">
  <div class="modal">
    <div class="card">
      <div class="card-body">
        <h3 class="fs-20 fw-600">Modal Title</h3>
        <p class="text-gray mar-y-16">Modal content goes here</p>
        <div class="flex justify-end gap-12">
          <button class="btn btn-ghost">Cancel</button>
          <button class="btn btn-primary">Confirm</button>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Sizes

```html
<div class="modal-overlay">
  <div class="modal modal-sm">Small modal</div>
</div>

<div class="modal-overlay">
  <div class="modal modal-md">Medium modal</div>
</div>

<div class="modal-overlay">
  <div class="modal modal-lg">Large modal</div>
</div>
```

## Toast

```html
<div class="toast toast-success">Success!</div>
<div class="toast toast-error">Error!</div>
<div class="toast toast-warning">Warning!</div>
<div class="toast toast-info">Info!</div>
```

### Positions

```html
<div class="toast toast-top-right">Top Right</div>
<div class="toast toast-top-left">Top Left</div>
<div class="toast toast-bottom-right">Bottom Right</div>
<div class="toast toast-bottom-left">Bottom Left</div>
```

## Table

### Basic

```html
<div class="table-wrapper">
  <table class="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John Doe</td>
        <td>john@example.com</td>
        <td>Admin</td>
      </tr>
      <tr>
        <td>Jane Smith</td>
        <td>jane@example.com</td>
        <td>User</td>
      </tr>
    </tbody>
  </table>
</div>
```

### With Sticky Header

```html
<div class="table-wrapper" style="max-height: 400px;">
  <table class="table table-sticky">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      <!-- Many rows -->
    </tbody>
  </table>
</div>
```

## Dropdown

```html
<div class="dropdown">
  <button class="btn dropdown-trigger">Menu</button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#">Action 1</a>
    <a class="dropdown-item" href="#">Action 2</a>
    <a class="dropdown-item" href="#">Action 3</a>
  </div>
</div>
```

## Tabs

```html
<div class="tabs">
  <div class="tabs-list">
    <button class="tabs-trigger active">Tab 1</button>
    <button class="tabs-trigger">Tab 2</button>
    <button class="tabs-trigger">Tab 3</button>
  </div>
  <div class="tabs-content">
    <div class="tab-panel">Content 1</div>
    <div class="tab-panel">Content 2</div>
    <div class="tab-panel">Content 3</div>
  </div>
</div>
```

## Accordion

```html
<div class="accordion">
  <div class="accordion-item">
    <button class="accordion-trigger">Section 1</button>
    <div class="accordion-content">Content for section 1</div>
  </div>
  <div class="accordion-item">
    <button class="accordion-trigger">Section 2</button>
    <div class="accordion-content">Content for section 2</div>
  </div>
</div>
```

## Skeleton

```html
<div class="skeleton skeleton-text"></div>
<div class="skeleton skeleton-circle"></div>
<div class="skeleton skeleton-rect"></div>
```

### Loading State

```html
<div class="card">
  <div class="card-body">
    <div class="flex items-center gap-16 mar-b-16">
      <div
        class="skeleton skeleton-circle"
        style="width: 48px; height: 48px;"
      ></div>
      <div class="flex-1">
        <div class="skeleton skeleton-text" style="width: 60%;"></div>
        <div class="skeleton skeleton-text" style="width: 40%;"></div>
      </div>
    </div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text" style="width: 80%;"></div>
  </div>
</div>
```

## Avatar

```html
<img class="avatar avatar-sm" src="user.jpg" alt="User" />
<img class="avatar avatar-md" src="user.jpg" alt="User" />
<img class="avatar avatar-lg" src="user.jpg" alt="User" />
```

## Divider

```html
<div class="divider"></div>
<div class="divider divider-vertical" style="height: 24px;"></div>
```

## Tooltip

```html
<button class="tooltip" data-tooltip="Help text">Hover me</button>
<button class="tooltip tooltip-top" data-tooltip="Top tooltip">Top</button>
<button class="tooltip tooltip-bottom" data-tooltip="Bottom tooltip">
  Bottom
</button>
<button class="tooltip tooltip-left" data-tooltip="Left tooltip">Left</button>
<button class="tooltip tooltip-right" data-tooltip="Right tooltip">
  Right
</button>
```

## Switch

```html
<label class="switch">
  <input type="checkbox" class="switch-input" />
  <span class="switch-slider"></span>
</label>
```

## Examples

### Login Form

```html
<div class="card" style="max-width: 400px; margin: 0 auto;">
  <div class="card-body">
    <h2 class="fs-24 fw-700 mar-b-16">Login</h2>
    <div class="field mar-b-16">
      <label class="field-label">Email</label>
      <input class="input" type="email" placeholder="you@example.com" />
    </div>
    <div class="field mar-b-24">
      <label class="field-label">Password</label>
      <input class="input" type="password" placeholder="••••••••" />
    </div>
    <button class="btn btn-primary w-full">Login</button>
  </div>
</div>
```

### Pricing Card

```html
<div class="card" style="max-width: 320px;">
  <div class="card-body" style="text-align: center;">
    <h3 class="fs-20 fw-600">Pro Plan</h3>
    <div class="fs-48 fw-700 mar-y-16">
      $29<span class="fs-16 text-gray">/mo</span>
    </div>
    <ul class="mar-y-24" style="list-style: none; padding: 0;">
      <li class="pad-y-8">Feature 1</li>
      <li class="pad-y-8">Feature 2</li>
      <li class="pad-y-8">Feature 3</li>
    </ul>
    <button class="btn btn-primary w-full">Get Started</button>
  </div>
</div>
```

### Dashboard Stats

```html
<div class="grid grid-4 gap-24">
  <div class="card">
    <div class="card-body">
      <div class="text-gray fs-14">Total Users</div>
      <div class="fs-32 fw-700">12,345</div>
      <div class="text-green fs-14">+12%</div>
    </div>
  </div>
  <!-- More stat cards -->
</div>
```

## Tips

- Use `btn-primary` for main actions
- Use `btn-ghost` for secondary actions
- Use `btn-danger` for destructive actions
- Use `input-error` for validation errors
- Use `input-success` for valid states
- Use `badge-success` for active status
- Use `badge-warning` for pending status
- Use `badge-danger` for inactive status
- Use `alert-info` for informational messages
- Use `alert-success` for success messages
- Use `shadow-lg` for modals and dropdowns
- Use `round-lg` for cards
- Use `round-full` for avatars and pills
