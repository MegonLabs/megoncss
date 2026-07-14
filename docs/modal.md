# Modal Component

Dialog component for focused interactions.

## Classes

| Class           | Description            |
| --------------- | ---------------------- |
| `modal-overlay` | Modal backdrop overlay |
| `modal`         | Modal container        |
| `modal-sm`      | Small modal            |
| `modal-md`      | Medium modal           |
| `modal-lg`      | Large modal            |

## Basic Usage

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

## Different Sizes

```html
<!-- Small Modal -->
<div class="modal-overlay">
  <div class="modal modal-sm">
    <div class="card">
      <div class="card-body">
        <p>Small modal content</p>
      </div>
    </div>
  </div>
</div>

<!-- Large Modal -->
<div class="modal-overlay">
  <div class="modal modal-lg">
    <div class="card">
      <div class="card-body">
        <p>Large modal content</p>
      </div>
    </div>
  </div>
</div>
```
