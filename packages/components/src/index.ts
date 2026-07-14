export interface ModalOptions {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  onClose?: () => void;
}

export interface ToastOptions {
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
}

export interface DropdownOptions {
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
  offset?: number;
}

// ─── Modal ───
export function createModal(
  content: string | HTMLElement,
  options: ModalOptions = {},
): {
  open: () => void;
  close: () => void;
  destroy: () => void;
} {
  const {
    size = "md",
    closeOnOverlay = true,
    closeOnEscape = true,
    onClose,
  } = options;

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.style.display = "none";

  const contentEl = document.createElement("div");
  contentEl.className = `modal-content modal-${size}`;

  if (typeof content === "string") {
    contentEl.innerHTML = content;
  } else {
    contentEl.appendChild(content);
  }

  overlay.appendChild(contentEl);
  document.body.appendChild(overlay);

  function open() {
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.add("closing");
    setTimeout(() => {
      overlay.style.display = "none";
      overlay.classList.remove("closing");
      document.body.style.overflow = "";
      onClose?.();
    }, 200);
  }

  function destroy() {
    overlay.remove();
  }

  if (closeOnOverlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });
  }

  if (closeOnEscape) {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && overlay.style.display === "flex") {
        close();
      }
    };
    document.addEventListener("keydown", handler);
  }

  // Close button
  const closeBtn = contentEl.querySelector(".modal-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", close);
  }

  return { open, close, destroy };
}

// ─── Toast ───
let toastContainer: HTMLDivElement | null = null;

function getToastContainer(position: string): HTMLDivElement {
  const posClass = position.replace("-", "-");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = `toast-container toast-container-${posClass}`;
    document.body.appendChild(toastContainer);
  }
  return toastContainer;
}

export function showToast(
  title: string,
  description?: string,
  options: ToastOptions = {},
): {
  dismiss: () => void;
} {
  const { type = "info", duration = 5000, position = "top-right" } = options;

  const container = getToastContainer(position);

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <p class="toast-title">${title}</p>
      ${description ? `<p class="toast-desc">${description}</p>` : ""}
    </div>
    <button class="toast-close">&times;</button>
  `;

  const closeBtn = toast.querySelector(".toast-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", dismiss);
  }

  container.appendChild(toast);

  if (duration > 0) {
    setTimeout(dismiss, duration);
  }

  function dismiss() {
    toast.classList.add("toast-removing");
    setTimeout(() => toast.remove(), 250);
  }

  return { dismiss };
}

// ─── Dropdown ───
export function createDropdown(
  trigger: HTMLElement,
  content: string | HTMLElement,
  options: DropdownOptions = {},
): {
  open: () => void;
  close: () => void;
  destroy: () => void;
} {
  const { placement = "bottom-start", offset = 4 } = options;

  const dropdown = document.createElement("div");
  dropdown.className = "dropdown";
  dropdown.style.position = "absolute";
  dropdown.style.zIndex = "50";
  dropdown.style.display = "none";

  if (typeof content === "string") {
    dropdown.innerHTML = content;
  } else {
    dropdown.appendChild(content);
  }

  document.body.appendChild(dropdown);

  function positionDropdown() {
    const triggerRect = trigger.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;

    let top = triggerRect.bottom + scrollTop + offset;
    let left = triggerRect.left + scrollLeft;

    if (placement.includes("end")) {
      left = triggerRect.right + scrollLeft - dropdown.offsetWidth;
    }
    if (placement.includes("top")) {
      top = triggerRect.top + scrollTop - dropdown.offsetHeight - offset;
    }

    dropdown.style.top = `${top}px`;
    dropdown.style.left = `${left}px`;
  }

  function open() {
    dropdown.style.display = "block";
    positionDropdown();
  }

  function close() {
    dropdown.style.display = "none";
  }

  function destroy() {
    dropdown.remove();
  }

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (dropdown.style.display === "block") {
      close();
    } else {
      open();
    }
  });

  document.addEventListener("click", () => close());

  return { open, close, destroy };
}

// ─── Tabs ───
export function createTabs(
  container: HTMLElement,
  options: { onChange?: (index: number) => void } = {},
): {
  setActive: (index: number) => void;
  getActive: () => number;
} {
  const headers = container.querySelectorAll(".tab");
  const panels = container.querySelectorAll(".tab-panel");
  let activeIndex = 0;

  function setActive(index: number) {
    headers.forEach((h, i) => {
      h.classList.toggle("active", i === index);
    });
    panels.forEach((p, i) => {
      (p as HTMLElement).style.display = i === index ? "block" : "none";
    });
    activeIndex = index;
    options.onChange?.(index);
  }

  function getActive() {
    return activeIndex;
  }

  headers.forEach((header, index) => {
    header.addEventListener("click", () => setActive(index));
  });

  // Initialize
  setActive(0);

  return { setActive, getActive };
}

// ─── Accordion ───
export function createAccordion(container: HTMLElement): void {
  const items = container.querySelectorAll(".accordion-item");

  items.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    const body = item.querySelector(".accordion-body") as HTMLElement;

    if (header && body) {
      header.addEventListener("click", () => {
        const isOpen = body.style.display === "block";
        body.style.display = isOpen ? "none" : "block";
        header.classList.toggle("active", !isOpen);
      });
    }
  });
}

// ─── Export all ───
export {
  createModal as Modal,
  showToast as Toast,
  createDropdown as Dropdown,
  createTabs as Tabs,
  createAccordion as Accordion,
};
