export const classesData = {
  version: "0.1.0",
  framework: "MegonCSS",
  naming: "Exact Pixel",
  description:
    "MegonCSS utility classes with exact pixel values. No memorization needed - pad-16 = padding: 16px",
  classes: {
    spacing: {
      pad: {
        pattern: "pad-{0-96}",
        description: "Padding (all sides)",
        example: "pad-16 -> padding: 16px",
        categories: ["spacing"],
      },
      "pad-t": {
        pattern: "pad-t-{0-96}",
        description: "Padding top",
        example: "pad-t-8 -> padding-top: 8px",
        categories: ["spacing"],
      },
      "pad-b": {
        pattern: "pad-b-{0-96}",
        description: "Padding bottom",
        example: "pad-b-8 -> padding-bottom: 8px",
        categories: ["spacing"],
      },
      "pad-l": {
        pattern: "pad-l-{0-96}",
        description: "Padding left",
        example: "pad-l-8 -> padding-left: 8px",
        categories: ["spacing"],
      },
      "pad-r": {
        pattern: "pad-r-{0-96}",
        description: "Padding right",
        example: "pad-r-8 -> padding-right: 8px",
        categories: ["spacing"],
      },
      "pad-x": {
        pattern: "pad-x-{0-96}",
        description: "Padding left and right",
        example: "pad-x-16 -> padding-left: 16px; padding-right: 16px",
        categories: ["spacing"],
      },
      "pad-y": {
        pattern: "pad-y-{0-96}",
        description: "Padding top and bottom",
        example: "pad-y-16 -> padding-top: 16px; padding-bottom: 16px",
        categories: ["spacing"],
      },
      mar: {
        pattern: "mar-{0-96|auto}",
        description: "Margin (all sides)",
        example: "mar-16 -> margin: 16px",
        categories: ["spacing"],
      },
      "mar-t": {
        pattern: "mar-t-{0-96|auto}",
        description: "Margin top",
        example: "mar-t-8 -> margin-top: 8px",
        categories: ["spacing"],
      },
      "mar-b": {
        pattern: "mar-b-{0-96|auto}",
        description: "Margin bottom",
        example: "mar-b-8 -> margin-bottom: 8px",
        categories: ["spacing"],
      },
      "mar-l": {
        pattern: "mar-l-{0-96|auto}",
        description: "Margin left",
        example: "mar-l-8 -> margin-left: 8px",
        categories: ["spacing"],
      },
      "mar-r": {
        pattern: "mar-r-{0-96|auto}",
        description: "Margin right",
        example: "mar-r-8 -> margin-right: 8px",
        categories: ["spacing"],
      },
      "mar-x": {
        pattern: "mar-x-{0-96|auto}",
        description: "Margin left and right",
        example: "mar-x-auto -> margin-left: auto; margin-right: auto",
        categories: ["spacing"],
      },
      "mar-y": {
        pattern: "mar-y-{0-96|auto}",
        description: "Margin top and bottom",
        example: "mar-y-16 -> margin-top: 16px; margin-bottom: 16px",
        categories: ["spacing"],
      },
    },
    gap: {
      gap: {
        pattern: "gap-{0-96}",
        description: "Gap (all directions)",
        example: "gap-8 -> gap: 8px",
        categories: ["grid", "flexbox"],
      },
      "gap-x": {
        pattern: "gap-x-{0-96}",
        description: "Column gap",
        example: "gap-x-8 -> column-gap: 8px",
        categories: ["grid", "flexbox"],
      },
      "gap-y": {
        pattern: "gap-y-{0-96}",
        description: "Row gap",
        example: "gap-y-8 -> row-gap: 8px",
        categories: ["grid", "flexbox"],
      },
    },
    typography: {
      fs: {
        pattern: "fs-{8-96}",
        description: "Font size in pixels",
        example: "fs-18 -> font-size: 18px",
        categories: ["typography"],
      },
      fw: {
        pattern: "fw-{100-900}",
        description: "Font weight",
        example: "fw-700 -> font-weight: 700",
        categories: ["typography"],
      },
      lh: {
        pattern: "lh-{0-96}",
        description: "Line height in pixels",
        example: "lh-24 -> line-height: 24px",
        categories: ["typography"],
      },
      ls: {
        pattern: "ls-{tight|normal|wide}",
        description: "Letter spacing",
        example: "ls-tight -> letter-spacing: -0.025em",
        categories: ["typography"],
      },
      ta: {
        pattern: "ta-{left|center|right|justify}",
        description: "Text alignment",
        example: "ta-center -> text-align: center",
        categories: ["typography"],
      },
      tt: {
        pattern: "tt-{uppercase|lowercase|capitalize}",
        description: "Text transform",
        example: "tt-uppercase -> text-transform: uppercase",
        categories: ["typography"],
      },
      td: {
        pattern: "td-{underline|line-through|none}",
        description: "Text decoration",
        example: "td-underline -> text-decoration: underline",
        categories: ["typography"],
      },
    },
    colors: {
      bg: {
        pattern: "bg-{color}",
        description: "Background color",
        example: "bg-blue -> background-color: #3b82f6",
        colors: [
          "white",
          "black",
          "gray",
          "red",
          "orange",
          "yellow",
          "green",
          "teal",
          "blue",
          "purple",
          "pink",
          "indigo",
        ],
        categories: ["colors"],
      },
      text: {
        pattern: "text-{color}",
        description: "Text color",
        example: "text-blue -> color: #3b82f6",
        colors: [
          "white",
          "black",
          "gray",
          "red",
          "orange",
          "yellow",
          "green",
          "teal",
          "blue",
          "purple",
          "pink",
          "indigo",
        ],
        categories: ["colors"],
      },
      border: {
        pattern: "border-{color}",
        description: "Border color",
        example: "border-blue -> border-color: #3b82f6",
        categories: ["colors"],
      },
    },
    display: {
      hide: {
        description: "Display none",
        example: "hide -> display: none",
        categories: ["layout"],
      },
      block: {
        description: "Display block",
        example: "block -> display: block",
        categories: ["layout"],
      },
      inline: {
        description: "Display inline",
        example: "inline -> display: inline",
        categories: ["layout"],
      },
      "inline-block": {
        description: "Display inline-block",
        example: "inline-block -> display: inline-block",
        categories: ["layout"],
      },
      flex: {
        description: "Display flex",
        example: "flex -> display: flex",
        categories: ["layout", "flexbox"],
      },
      grid: {
        description: "Display grid",
        example: "grid -> display: grid",
        categories: ["layout", "grid"],
      },
    },
    flexbox: {
      "flex-row": {
        description: "Flex direction row",
        example: "flex-row -> flex-direction: row",
        categories: ["flexbox"],
      },
      "flex-col": {
        description: "Flex direction column",
        example: "flex-col -> flex-direction: column",
        categories: ["flexbox"],
      },
      "flex-wrap": {
        description: "Flex wrap wrap",
        example: "flex-wrap -> flex-wrap: wrap",
        categories: ["flexbox"],
      },
      "flex-nowrap": {
        description: "Flex wrap nowrap",
        example: "flex-nowrap -> flex-wrap: nowrap",
        categories: ["flexbox"],
      },
      "items-start": {
        description: "Align items flex-start",
        example: "items-start -> align-items: flex-start",
        categories: ["flexbox"],
      },
      "items-center": {
        description: "Align items center",
        example: "items-center -> align-items: center",
        categories: ["flexbox"],
      },
      "items-end": {
        description: "Align items flex-end",
        example: "items-end -> align-items: flex-end",
        categories: ["flexbox"],
      },
      "items-stretch": {
        description: "Align items stretch",
        example: "items-stretch -> align-items: stretch",
        categories: ["flexbox"],
      },
      "justify-start": {
        description: "Justify content flex-start",
        example: "justify-start -> justify-content: flex-start",
        categories: ["flexbox"],
      },
      "justify-center": {
        description: "Justify content center",
        example: "justify-center -> justify-content: center",
        categories: ["flexbox"],
      },
      "justify-end": {
        description: "Justify content flex-end",
        example: "justify-end -> justify-content: flex-end",
        categories: ["flexbox"],
      },
      "justify-between": {
        description: "Justify content space-between",
        example: "justify-between -> justify-content: space-between",
        categories: ["flexbox"],
      },
      "justify-around": {
        description: "Justify content space-around",
        example: "justify-around -> justify-content: space-around",
        categories: ["flexbox"],
      },
      grow: {
        description: "Flex grow 1",
        example: "grow -> flex-grow: 1",
        categories: ["flexbox"],
      },
      shrink: {
        description: "Flex shrink 1",
        example: "shrink -> flex-shrink: 1",
        categories: ["flexbox"],
      },
    },
    grid: {
      "grid-2": {
        description: "Grid template columns repeat 2",
        example: "grid-2 -> grid-template-columns: repeat(2, minmax(0, 1fr))",
        categories: ["grid"],
      },
      "grid-3": {
        description: "Grid template columns repeat 3",
        example: "grid-3 -> grid-template-columns: repeat(3, minmax(0, 1fr))",
        categories: ["grid"],
      },
      "grid-4": {
        description: "Grid template columns repeat 4",
        example: "grid-4 -> grid-template-columns: repeat(4, minmax(0, 1fr))",
        categories: ["grid"],
      },
      "grid-5": {
        description: "Grid template columns repeat 5",
        example: "grid-5 -> grid-template-columns: repeat(5, minmax(0, 1fr))",
        categories: ["grid"],
      },
      "grid-6": {
        description: "Grid template columns repeat 6",
        example: "grid-6 -> grid-template-columns: repeat(6, minmax(0, 1fr))",
        categories: ["grid"],
      },
      "grid-cols-1": {
        description: "Grid template columns 1",
        example:
          "grid-cols-1 -> grid-template-columns: repeat(1, minmax(0, 1fr))",
        categories: ["grid"],
      },
      "grid-cols-2": {
        description: "Grid template columns 2",
        example:
          "grid-cols-2 -> grid-template-columns: repeat(2, minmax(0, 1fr))",
        categories: ["grid"],
      },
      "grid-cols-3": {
        description: "Grid template columns 3",
        example:
          "grid-cols-3 -> grid-template-columns: repeat(3, minmax(0, 1fr))",
        categories: ["grid"],
      },
      "grid-rows-1": {
        description: "Grid template rows 1",
        example: "grid-rows-1 -> grid-template-rows: repeat(1, minmax(0, 1fr))",
        categories: ["grid"],
      },
      "grid-rows-2": {
        description: "Grid template rows 2",
        example: "grid-rows-2 -> grid-template-rows: repeat(2, minmax(0, 1fr))",
        categories: ["grid"],
      },
      "grid-rows-3": {
        description: "Grid template rows 3",
        example: "grid-rows-3 -> grid-template-rows: repeat(3, minmax(0, 1fr))",
        categories: ["grid"],
      },
      "col-span-2": {
        description: "Column span 2",
        example: "col-span-2 -> grid-column: span 2 / span 2",
        categories: ["grid"],
      },
      "col-span-3": {
        description: "Column span 3",
        example: "col-span-3 -> grid-column: span 3 / span 3",
        categories: ["grid"],
      },
      "row-span-2": {
        description: "Row span 2",
        example: "row-span-2 -> grid-row: span 2 / span 2",
        categories: ["grid"],
      },
    },
    position: {
      relative: {
        description: "Position relative",
        example: "relative -> position: relative",
        categories: ["layout"],
      },
      absolute: {
        description: "Position absolute",
        example: "absolute -> position: absolute",
        categories: ["layout"],
      },
      fixed: {
        description: "Position fixed",
        example: "fixed -> position: fixed",
        categories: ["layout"],
      },
      sticky: {
        description: "Position sticky",
        example: "sticky -> position: sticky",
        categories: ["layout"],
      },
      "inset-0": {
        description: "Inset 0 (top, right, bottom, left)",
        example: "inset-0 -> inset: 0px",
        categories: ["layout"],
      },
    },
    sizing: {
      "w-full": {
        description: "Width 100%",
        example: "w-full -> width: 100%",
        categories: ["layout"],
      },
      "w-auto": {
        description: "Width auto",
        example: "w-auto -> width: auto",
        categories: ["layout"],
      },
      "w-screen": {
        description: "Width 100vw",
        example: "w-screen -> width: 100vw",
        categories: ["layout"],
      },
      "h-full": {
        description: "Height 100%",
        example: "h-full -> height: 100%",
        categories: ["layout"],
      },
      "h-auto": {
        description: "Height auto",
        example: "h-auto -> height: auto",
        categories: ["layout"],
      },
      "h-screen": {
        description: "Height 100vh",
        example: "h-screen -> height: 100vh",
        categories: ["layout"],
      },
      "max-w-sm": {
        description: "Max width small (384px)",
        example: "max-w-sm -> max-width: 384px",
        categories: ["layout"],
      },
      "max-w-md": {
        description: "Max width medium (448px)",
        example: "max-w-md -> max-width: 448px",
        categories: ["layout"],
      },
      "max-w-lg": {
        description: "Max width large (512px)",
        example: "max-w-lg -> max-width: 512px",
        categories: ["layout"],
      },
      "max-w-xl": {
        description: "Max width extra large (576px)",
        example: "max-w-xl -> max-width: 576px",
        categories: ["layout"],
      },
      "max-w-2xl": {
        description: "Max width 2XL (672px)",
        example: "max-w-2xl -> max-width: 672px",
        categories: ["layout"],
      },
      "max-w-full": {
        description: "Max width 100%",
        example: "max-w-full -> max-width: 100%",
        categories: ["layout"],
      },
      "min-w-0": {
        description: "Min width 0",
        example: "min-w-0 -> min-width: 0px",
        categories: ["layout"],
      },
      "min-h-0": {
        description: "Min height 0",
        example: "min-h-0 -> min-height: 0px",
        categories: ["layout"],
      },
    },
    border: {
      round: {
        pattern: "round-{0-96|full}",
        description: "Border radius in pixels",
        example: "round-8 -> border-radius: 8px",
        categories: ["border"],
      },
      border: {
        description: "Border width 1px",
        example: "border -> border-width: 1px",
        categories: ["border"],
      },
      "border-t": {
        description: "Border top 1px",
        example: "border-t -> border-top-width: 1px",
        categories: ["border"],
      },
      "border-b": {
        description: "Border bottom 1px",
        example: "border-b -> border-bottom-width: 1px",
        categories: ["border"],
      },
      "border-l": {
        description: "Border left 1px",
        example: "border-l -> border-left-width: 1px",
        categories: ["border"],
      },
      "border-r": {
        description: "Border right 1px",
        example: "border-r -> border-right-width: 1px",
        categories: ["border"],
      },
    },
    effects: {
      "shadow-sm": {
        description: "Small shadow",
        example: "shadow-sm -> box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)",
        categories: ["effects"],
      },
      "shadow-md": {
        description: "Medium shadow",
        example: "shadow-md -> box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)",
        categories: ["effects"],
      },
      "shadow-lg": {
        description: "Large shadow",
        example: "shadow-lg -> box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1)",
        categories: ["effects"],
      },
      "shadow-xl": {
        description: "Extra large shadow",
        example: "shadow-xl -> box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1)",
        categories: ["effects"],
      },
      "shadow-2xl": {
        description: "2XL shadow",
        example:
          "shadow-2xl -> box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25)",
        categories: ["effects"],
      },
      "shadow-inner": {
        description: "Inner shadow",
        example:
          "shadow-inner -> box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
        categories: ["effects"],
      },
      "shadow-none": {
        description: "No shadow",
        example: "shadow-none -> box-shadow: none",
        categories: ["effects"],
      },
      "opacity-0": {
        description: "Opacity 0",
        example: "opacity-0 -> opacity: 0",
        categories: ["effects"],
      },
      "opacity-25": {
        description: "Opacity 0.25",
        example: "opacity-25 -> opacity: 0.25",
        categories: ["effects"],
      },
      "opacity-50": {
        description: "Opacity 0.5",
        example: "opacity-50 -> opacity: 0.5",
        categories: ["effects"],
      },
      "opacity-75": {
        description: "Opacity 0.75",
        example: "opacity-75 -> opacity: 0.75",
        categories: ["effects"],
      },
      "opacity-100": {
        description: "Opacity 1",
        example: "opacity-100 -> opacity: 1",
        categories: ["effects"],
      },
    },
    visibility: {
      visible: {
        description: "Visibility visible",
        example: "visible -> visibility: visible",
        categories: ["layout"],
      },
      invisible: {
        description: "Visibility invisible",
        example: "invisible -> visibility: invisible",
        categories: ["layout"],
      },
    },
    overflow: {
      "overflow-hidden": {
        description: "Overflow hidden",
        example: "overflow-hidden -> overflow: hidden",
        categories: ["layout"],
      },
      "overflow-auto": {
        description: "Overflow auto",
        example: "overflow-auto -> overflow: auto",
        categories: ["layout"],
      },
      "overflow-scroll": {
        description: "Overflow scroll",
        example: "overflow-scroll -> overflow: scroll",
        categories: ["layout"],
      },
      "overflow-x-auto": {
        description: "Overflow X auto",
        example: "overflow-x-auto -> overflow-x: auto",
        categories: ["layout"],
      },
      "overflow-y-auto": {
        description: "Overflow Y auto",
        example: "overflow-y-auto -> overflow-y: auto",
        categories: ["layout"],
      },
    },
    cursor: {
      "cursor-pointer": {
        description: "Cursor pointer",
        example: "cursor-pointer -> cursor: pointer",
        categories: ["interactivity"],
      },
      "cursor-default": {
        description: "Cursor default",
        example: "cursor-default -> cursor: default",
        categories: ["interactivity"],
      },
      "cursor-not-allowed": {
        description: "Cursor not-allowed",
        example: "cursor-not-allowed -> cursor: not-allowed",
        categories: ["interactivity"],
      },
      "cursor-grab": {
        description: "Cursor grab",
        example: "cursor-grab -> cursor: grab",
        categories: ["interactivity"],
      },
      "cursor-grabbing": {
        description: "Cursor grabbing",
        example: "cursor-grabbing -> cursor: grabbing",
        categories: ["interactivity"],
      },
    },
    transition: {
      transition: {
        description: "Transition all properties 150ms ease",
        example: "transition -> transition: all 150ms ease",
        categories: ["effects"],
      },
    },
    components: {
      btn: {
        description: "Base button styles",
        categories: ["components"],
      },
      "btn-primary": {
        description: "Primary button (blue background)",
        categories: ["components"],
      },
      "btn-secondary": {
        description: "Secondary button (gray background)",
        categories: ["components"],
      },
      "btn-outline": {
        description: "Outline button",
        categories: ["components"],
      },
      "btn-ghost": {
        description: "Ghost button (transparent)",
        categories: ["components"],
      },
      "btn-danger": {
        description: "Danger button (red background)",
        categories: ["components"],
      },
      "btn-sm": {
        description: "Small button",
        categories: ["components"],
      },
      "btn-md": {
        description: "Medium button",
        categories: ["components"],
      },
      "btn-lg": {
        description: "Large button",
        categories: ["components"],
      },
      input: {
        description: "Text input field",
        categories: ["components"],
      },
      select: {
        description: "Select dropdown",
        categories: ["components"],
      },
      textarea: {
        description: "Textarea field",
        categories: ["components"],
      },
      card: {
        description: "Card container",
        categories: ["components"],
      },
      badge: {
        description: "Badge component",
        categories: ["components"],
      },
      alert: {
        description: "Alert component",
        categories: ["components"],
      },
      modal: {
        description: "Modal dialog",
        categories: ["components"],
      },
      "modal-overlay": {
        description: "Modal overlay backdrop",
        categories: ["components"],
      },
      toast: {
        description: "Toast notification",
        categories: ["components"],
      },
      table: {
        description: "Table component",
        categories: ["components"],
      },
      dropdown: {
        description: "Dropdown menu",
        categories: ["components"],
      },
      tabs: {
        description: "Tab navigation",
        categories: ["components"],
      },
      accordion: {
        description: "Accordion component",
        categories: ["components"],
      },
      skeleton: {
        description: "Skeleton loading",
        categories: ["components"],
      },
      avatar: {
        description: "Avatar component",
        categories: ["components"],
      },
      divider: {
        description: "Divider/separator",
        categories: ["components"],
      },
      tooltip: {
        description: "Tooltip component",
        categories: ["components"],
      },
      switch: {
        description: "Toggle switch",
        categories: ["components"],
      },
    },
  },
};

export const componentsData = {
  version: "0.1.0",
  framework: "MegonCSS",
  components: {
    button: {
      name: "Button",
      description:
        "Interactive button component with multiple sizes, colors, and states",
      classes: {
        base: "btn",
        variants: {
          primary: "btn-primary",
          secondary: "btn-secondary",
          outline: "btn-outline",
          ghost: "btn-ghost",
          danger: "btn-danger",
        },
        sizes: {
          sm: "btn-sm",
          md: "btn-md",
          lg: "btn-lg",
        },
      },
      example: '<button class="btn btn-primary">Click me</button>',
      usage: "Use for all clickable actions",
    },
    input: {
      name: "Input",
      description: "Text input field with validation states",
      classes: {
        base: "input",
        sizes: {
          sm: "input-sm",
          md: "input-md",
          lg: "input-lg",
        },
        states: {
          error: "input-error",
          success: "input-success",
        },
      },
      example: '<input class="input" placeholder="Enter text...">',
      usage: "Use for form text inputs",
    },
    select: {
      name: "Select",
      description: "Dropdown select component",
      classes: {
        base: "select",
      },
      example: '<select class="select"><option>Option 1</option></select>',
      usage: "Use for dropdown selections",
    },
    textarea: {
      name: "Textarea",
      description: "Multi-line text input",
      classes: {
        base: "textarea",
      },
      example: '<textarea class="textarea"></textarea>',
      usage: "Use for long text inputs",
    },
    card: {
      name: "Card",
      description: "Container component for grouping content",
      classes: {
        base: "card",
        header: "card-header",
        body: "card-body",
        footer: "card-footer",
      },
      example: '<div class="card"><div class="card-body">Content</div></div>',
      usage: "Use for grouping related content",
    },
    badge: {
      name: "Badge",
      description: "Small label component for status or counts",
      classes: {
        base: "badge",
        variants: {
          primary: "badge-primary",
          success: "badge-success",
          warning: "badge-warning",
          danger: "badge-danger",
        },
        sizes: {
          sm: "badge-sm",
          md: "badge-md",
          lg: "badge-lg",
        },
        styles: {
          outline: "badge-outline",
          dot: "badge-dot",
          pill: "badge-pill",
        },
      },
      example: '<span class="badge badge-primary">New</span>',
      usage: "Use for status indicators or counts",
    },
    alert: {
      name: "Alert",
      description: "Feedback message component",
      classes: {
        base: "alert",
        variants: {
          success: "alert-success",
          warning: "alert-warning",
          danger: "alert-danger",
          info: "alert-info",
        },
        sizes: {
          sm: "alert-sm",
          md: "alert-md",
          lg: "alert-lg",
        },
      },
      example: '<div class="alert alert-success">Success!</div>',
      usage: "Use for user feedback messages",
    },
    modal: {
      name: "Modal",
      description: "Dialog component for focused interactions",
      classes: {
        overlay: "modal-overlay",
        base: "modal",
        sizes: {
          sm: "modal-sm",
          md: "modal-md",
          lg: "modal-lg",
        },
      },
      example: '<div class="modal-overlay"><div class="modal">...</div></div>',
      usage: "Use for dialogs, confirmations, forms",
    },
    toast: {
      name: "Toast",
      description: "Notification component that appears briefly",
      classes: {
        base: "toast",
        variants: {
          success: "toast-success",
          error: "toast-error",
          warning: "toast-warning",
          info: "toast-info",
        },
        positions: {
          "top-right": "toast-top-right",
          "top-left": "toast-top-left",
          "bottom-right": "toast-bottom-right",
          "bottom-left": "toast-bottom-left",
        },
      },
      example: '<div class="toast toast-success">Saved!</div>',
      usage: "Use for temporary notifications",
    },
    table: {
      name: "Table",
      description: "Data table component with responsive support",
      classes: {
        base: "table",
        wrapper: "table-wrapper",
        header: "table-header",
        sticky: "table-sticky",
      },
      example:
        '<div class="table-wrapper"><table class="table">...</table></div>',
      usage: "Use for tabular data display",
    },
    dropdown: {
      name: "Dropdown",
      description: "Floating menu component",
      classes: {
        base: "dropdown",
        trigger: "dropdown-trigger",
        menu: "dropdown-menu",
        item: "dropdown-item",
      },
      example:
        '<div class="dropdown"><button class="dropdown-trigger">Menu</button><div class="dropdown-menu">...</div></div>',
      usage: "Use for menus and action lists",
    },
    tabs: {
      name: "Tabs",
      description: "Tab navigation component",
      classes: {
        base: "tabs",
        list: "tabs-list",
        trigger: "tabs-trigger",
        content: "tabs-content",
      },
      example:
        '<div class="tabs"><div class="tabs-list"><button class="tabs-trigger">Tab 1</button></div></div>',
      usage: "Use for content switching",
    },
    accordion: {
      name: "Accordion",
      description: "Collapsible content component",
      classes: {
        base: "accordion",
        item: "accordion-item",
        trigger: "accordion-trigger",
        content: "accordion-content",
      },
      example:
        '<div class="accordion"><div class="accordion-item"><button class="accordion-trigger">Title</button><div class="accordion-content">Content</div></div></div>',
      usage: "Use for collapsible sections",
    },
    skeleton: {
      name: "Skeleton",
      description: "Loading placeholder component",
      classes: {
        base: "skeleton",
        variants: {
          text: "skeleton-text",
          circle: "skeleton-circle",
          rect: "skeleton-rect",
        },
      },
      example: '<div class="skeleton skeleton-text"></div>',
      usage: "Use for loading states",
    },
    avatar: {
      name: "Avatar",
      description: "User avatar component",
      classes: {
        base: "avatar",
        sizes: {
          sm: "avatar-sm",
          md: "avatar-md",
          lg: "avatar-lg",
        },
      },
      example: '<img class="avatar" src="user.jpg" alt="User">',
      usage: "Use for user profile images",
    },
    divider: {
      name: "Divider",
      description: "Visual separator component",
      classes: {
        base: "divider",
        variants: {
          horizontal: "divider-horizontal",
          vertical: "divider-vertical",
        },
      },
      example: '<div class="divider"></div>',
      usage: "Use for visual separation",
    },
    tooltip: {
      name: "Tooltip",
      description: "Hover information component",
      classes: {
        base: "tooltip",
        positions: {
          top: "tooltip-top",
          bottom: "tooltip-bottom",
          left: "tooltip-left",
          right: "tooltip-right",
        },
      },
      example:
        '<button class="tooltip" data-tooltip="Help text">Hover me</button>',
      usage: "Use for hints and help text",
    },
    switch: {
      name: "Switch",
      description: "Toggle switch component",
      classes: {
        base: "switch",
        input: "switch-input",
        slider: "switch-slider",
      },
      example:
        '<label class="switch"><input type="checkbox" class="switch-input"><span class="switch-slider"></span></label>',
      usage: "Use for boolean toggles",
    },
  },
};

export const examplesData = {
  version: "0.1.0",
  framework: "MegonCSS",
  examples: {
    "login-form": {
      name: "Login Form",
      description: "Complete login form with email and password fields",
      category: "forms",
      html: '<div class="card" style="max-w: 400px; margin: 0 auto;">\n  <div class="card-body">\n    <h2 class="fs-24 fw-700 mar-b-16">Login</h2>\n    <div class="field mar-b-16">\n      <label class="field-label">Email</label>\n      <input class="input" type="email" placeholder="you@example.com">\n    </div>\n    <div class="field mar-b-16">\n      <label class="field-label">Password</label>\n      <input class="input" type="password" placeholder="••••••••">\n    </div>\n    <button class="btn btn-primary w-full">Login</button>\n  </div>\n</div>',
      classes_used: [
        "card",
        "card-body",
        "fs-24",
        "fw-700",
        "mar-b-16",
        "field",
        "field-label",
        "input",
        "btn",
        "btn-primary",
        "w-full",
      ],
    },
    "pricing-section": {
      name: "Pricing Section",
      description: "Three-column pricing cards",
      category: "sections",
      html: '<section class="pad-y-64">\n  <h2 class="fs-32 fw-700 ta-center mar-b-32">Pricing</h2>\n  <div class="grid grid-3 gap-24" style="max-w: 1024px; margin: 0 auto;">\n    <div class="card">\n      <div class="card-body">\n        <h3 class="fs-20 fw-600">Basic</h3>\n        <div class="fs-36 fw-700 mar-y-16">$9/mo</div>\n        <ul class="mar-b-24">\n          <li>Feature 1</li>\n          <li>Feature 2</li>\n        </ul>\n        <button class="btn w-full">Get Started</button>\n      </div>\n    </div>\n    <div class="card" style="border: 2px solid #3b82f6;">\n      <div class="card-body">\n        <h3 class="fs-20 fw-600">Pro</h3>\n        <div class="fs-36 fw-700 mar-y-16">$29/mo</div>\n        <ul class="mar-b-24">\n          <li>All Basic features</li>\n          <li>Feature 3</li>\n        </ul>\n        <button class="btn btn-primary w-full">Get Started</button>\n      </div>\n    </div>\n    <div class="card">\n      <div class="card-body">\n        <h3 class="fs-20 fw-600">Enterprise</h3>\n        <div class="fs-36 fw-700 mar-y-16">$99/mo</div>\n        <ul class="mar-b-24">\n          <li>All Pro features</li>\n          <li>Feature 4</li>\n        </ul>\n        <button class="btn w-full">Contact Us</button>\n      </div>\n    </div>\n  </div>\n</section>',
      classes_used: [
        "pad-y-64",
        "fs-32",
        "fw-700",
        "ta-center",
        "mar-b-32",
        "grid",
        "grid-3",
        "gap-24",
        "card",
        "card-body",
        "fs-20",
        "fs-36",
        "mar-y-16",
        "mar-b-24",
        "btn",
        "btn-primary",
        "w-full",
      ],
    },
    navbar: {
      name: "Navigation Bar",
      description: "Responsive navigation header",
      category: "navigation",
      html: '<nav class="flex items-center justify-between pad-x-24 pad-y-16 bg-white" style="box-shadow: 0 1px 3px rgb(0 0 0 / 0.1);">\n  <div class="flex items-center gap-24">\n    <a class="fs-20 fw-700 text-blue" href="/">Logo</a>\n    <div class="flex gap-16">\n      <a class="cursor-pointer" href="/">Home</a>\n      <a class="cursor-pointer" href="/about">About</a>\n      <a class="cursor-pointer" href="/contact">Contact</a>\n    </div>\n  </div>\n  <div class="flex items-center gap-16">\n    <button class="btn btn-ghost btn-sm">Login</button>\n    <button class="btn btn-primary btn-sm">Sign Up</button>\n  </div>\n</nav>',
      classes_used: [
        "flex",
        "items-center",
        "justify-between",
        "pad-x-24",
        "pad-y-16",
        "bg-white",
        "fs-20",
        "fw-700",
        "text-blue",
        "gap-24",
        "gap-16",
        "cursor-pointer",
        "btn",
        "btn-ghost",
        "btn-sm",
        "btn-primary",
      ],
    },
    "hero-section": {
      name: "Hero Section",
      description: "Full-width hero with call to action",
      category: "sections",
      html: '<section class="flex flex-col items-center justify-center" style="min-height: 60vh; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white;">\n  <h1 class="fs-48 fw-700 ta-center mar-b-16">Welcome to MegonCSS</h1>\n  <p class="fs-20 ta-center mar-b-32" style="max-width: 600px; opacity: 0.9;">The utility-first CSS framework with exact pixel naming</p>\n  <div class="flex gap-16">\n    <button class="btn" style="background: white; color: #3b82f6;">Get Started</button>\n    <button class="btn" style="border: 2px solid white; color: white;">Learn More</button>\n  </div>\n</section>',
      classes_used: [
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        "fs-48",
        "fw-700",
        "ta-center",
        "mar-b-16",
        "fs-20",
        "mar-b-32",
        "flex",
        "gap-16",
        "btn",
      ],
    },
    "dashboard-stats": {
      name: "Dashboard Stats",
      description: "Statistics cards for dashboard",
      category: "components",
      html: '<div class="grid grid-4 gap-24">\n  <div class="card">\n    <div class="card-body">\n      <div class="text-gray">Total Users</div>\n      <div class="fs-32 fw-700">12,345</div>\n      <div class="text-green" style="font-size: 14px;">+12%</div>\n    </div>\n  </div>\n  <div class="card">\n    <div class="card-body">\n      <div class="text-gray">Revenue</div>\n      <div class="fs-32 fw-700">$45,678</div>\n      <div class="text-green" style="font-size: 14px;">+8%</div>\n    </div>\n  </div>\n  <div class="card">\n    <div class="card-body">\n      <div class="text-gray">Orders</div>\n      <div class="fs-32 fw-700">1,234</div>\n      <div class="text-red" style="font-size: 14px;">-3%</div>\n    </div>\n  </div>\n  <div class="card">\n    <div class="card-body">\n      <div class="text-gray">Conversion</div>\n      <div class="fs-32 fw-700">3.2%</div>\n      <div class="text-green" style="font-size: 14px;">+0.5%</div>\n    </div>\n  </div>\n</div>',
      classes_used: [
        "grid",
        "grid-4",
        "gap-24",
        "card",
        "card-body",
        "text-gray",
        "fs-32",
        "fw-700",
        "text-green",
        "text-red",
      ],
    },
    "alert-banner": {
      name: "Alert Banner",
      description: "Informational alert message",
      category: "feedback",
      html: '<div class="alert alert-info">\n  <div class="flex items-center gap-12">\n    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">\n      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>\n    </svg>\n    <span>This is an informational message.</span>\n  </div>\n</div>',
      classes_used: ["alert", "alert-info", "flex", "items-center", "gap-12"],
    },
    "data-table": {
      name: "Data Table",
      description: "Responsive data table with sticky header",
      category: "components",
      html: '<div class="table-wrapper">\n  <table class="table table-sticky">\n    <thead>\n      <tr>\n        <th>Name</th>\n        <th>Email</th>\n        <th>Role</th>\n        <th>Status</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td>John Doe</td>\n        <td>john@example.com</td>\n        <td>Admin</td>\n        <td><span class="badge badge-success">Active</span></td>\n      </tr>\n      <tr>\n        <td>Jane Smith</td>\n        <td>jane@example.com</td>\n        <td>User</td>\n        <td><span class="badge badge-warning">Pending</span></td>\n      </tr>\n    </tbody>\n  </table>\n</div>',
      classes_used: [
        "table-wrapper",
        "table",
        "table-sticky",
        "badge",
        "badge-success",
        "badge-warning",
      ],
    },
    "modal-dialog": {
      name: "Modal Dialog",
      description: "Confirmation modal with actions",
      category: "feedback",
      html: '<div class="modal-overlay">\n  <div class="modal modal-sm">\n    <div class="card">\n      <div class="card-body">\n        <h3 class="fs-20 fw-600 mar-b-8">Delete Item?</h3>\n        <p class="text-gray mar-b-24">This action cannot be undone.</p>\n        <div class="flex justify-end gap-12">\n          <button class="btn btn-ghost">Cancel</button>\n          <button class="btn btn-danger">Delete</button>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>',
      classes_used: [
        "modal-overlay",
        "modal",
        "modal-sm",
        "card",
        "card-body",
        "fs-20",
        "fw-600",
        "mar-b-8",
        "text-gray",
        "mar-b-24",
        "flex",
        "justify-end",
        "gap-12",
        "btn",
        "btn-ghost",
        "btn-danger",
      ],
    },
    "user-profile": {
      name: "User Profile Card",
      description: "User profile information display",
      category: "components",
      html: '<div class="card" style="max-width: 320px;">\n  <div class="card-body" style="text-align: center;">\n    <img class="avatar avatar-lg" src="avatar.jpg" alt="User" style="margin: 0 auto 16px;">\n    <h3 class="fs-18 fw-600">John Doe</h3>\n    <p class="text-gray mar-b-16">john@example.com</p>\n    <div class="flex justify-center gap-16">\n      <button class="btn btn-primary btn-sm">Follow</button>\n      <button class="btn btn-ghost btn-sm">Message</button>\n    </div>\n  </div>\n</div>',
      classes_used: [
        "card",
        "card-body",
        "avatar",
        "avatar-lg",
        "fs-18",
        "fw-600",
        "text-gray",
        "mar-b-16",
        "flex",
        "justify-center",
        "gap-16",
        "btn",
        "btn-primary",
        "btn-sm",
        "btn-ghost",
      ],
    },
    "sidebar-layout": {
      name: "Sidebar Layout",
      description: "Dashboard layout with sidebar",
      category: "layout",
      html: '<div class="flex" style="min-height: 100vh;">\n  <aside class="bg-black text-white" style="width: 240px; padding: 24px;">\n    <div class="fs-20 fw-700 mar-b-32">Dashboard</div>\n    <nav class="flex flex-col gap-8">\n      <a class="pad-8 round-8 cursor-pointer" href="/">Home</a>\n      <a class="pad-8 round-8 cursor-pointer" href="/analytics">Analytics</a>\n      <a class="pad-8 round-8 cursor-pointer" href="/settings">Settings</a>\n    </nav>\n  </aside>\n  <main class="flex-1 pad-32">\n    <h1 class="fs-24 fw-600 mar-b-24">Dashboard</h1>\n  </main>\n</div>',
      classes_used: [
        "flex",
        "bg-black",
        "text-white",
        "fs-20",
        "fw-700",
        "mar-b-32",
        "flex",
        "flex-col",
        "gap-8",
        "pad-8",
        "round-8",
        "cursor-pointer",
        "flex-1",
        "pad-32",
        "fs-24",
        "fw-600",
        "mar-b-24",
      ],
    },
    "loading-skeleton": {
      name: "Loading Skeleton",
      description: "Content loading placeholder",
      category: "feedback",
      html: '<div class="card">\n  <div class="card-body">\n    <div class="flex items-center gap-16 mar-b-16">\n      <div class="skeleton skeleton-circle" style="width: 48px; height: 48px;"></div>\n      <div class="flex-1">\n        <div class="skeleton skeleton-text" style="width: 60%; height: 16px; margin-bottom: 8px;"></div>\n        <div class="skeleton skeleton-text" style="width: 40%; height: 12px;"></div>\n      </div>\n    </div>\n    <div class="skeleton skeleton-text" style="width: 100%; height: 12px; margin-bottom: 8px;"></div>\n    <div class="skeleton skeleton-text" style="width: 100%; height: 12px; margin-bottom: 8px;"></div>\n    <div class="skeleton skeleton-text" style="width: 70%; height: 12px;"></div>\n  </div>\n</div>',
      classes_used: [
        "card",
        "card-body",
        "flex",
        "items-center",
        "gap-16",
        "mar-b-16",
        "skeleton",
        "skeleton-circle",
        "skeleton-text",
        "flex-1",
      ],
    },
  },
};
