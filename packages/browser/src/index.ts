import { compile, classToCss } from "@megoncss/core";

interface MegonBrowser {
  init: () => void;
  scan: () => void;
  generate: (classes: string[]) => string;
  observe: (
    callback?: (mutations: MutationRecord[]) => void,
  ) => MutationObserver;
  stop: () => void;
}

declare global {
  interface Window {
    Megon: MegonBrowser;
  }
}

let observer: MutationObserver | null = null;
let styleElement: HTMLStyleElement | null = null;
let lastClasses = new Set<string>();

function getStyleElement(): HTMLStyleElement {
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.setAttribute("data-megon", "");
    document.head.appendChild(styleElement);
  }
  return styleElement;
}

function extractClassesFromElement(el: Element): string[] {
  const classes: string[] = [];
  if (el.classList) {
    for (const cls of el.classList) {
      classes.push(cls);
    }
  }
  return classes;
}

function scanDocument(): string[] {
  const allClasses = new Set<string>();

  // Scan all elements with class attributes
  const elements = document.querySelectorAll("[class]");
  for (const el of elements) {
    const classes = extractClassesFromElement(el);
    classes.forEach((cls) => allClasses.add(cls));
  }

  return Array.from(allClasses);
}

function generateCSS(classes: string[]): string {
  const result = compile(classes);
  return result.css;
}

function updateStyle(newClasses: Set<string>): void {
  const css = generateCSS(Array.from(newClasses));
  if (css) {
    const style = getStyleElement();
    style.textContent = css;
  }
}

function scan(): void {
  const classes = scanDocument();
  const classSet = new Set(classes);

  // Check if classes changed
  const newClassesArray = Array.from(classSet);
  const lastClassesArray = Array.from(lastClasses);

  if (
    newClassesArray.length !== lastClassesArray.length ||
    !newClassesArray.every((cls) => lastClasses.has(cls))
  ) {
    lastClasses = classSet;
    updateStyle(classSet);
  }
}

function observe(
  callback?: (mutations: MutationRecord[]) => void,
): MutationObserver {
  if (observer) {
    observer.disconnect();
  }

  observer = new MutationObserver((mutations) => {
    let shouldUpdate = false;

    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        // Check added nodes
        for (const node of Array.from(mutation.addedNodes)) {
          if (node instanceof Element) {
            if (node.hasAttribute("class")) {
              shouldUpdate = true;
              break;
            }
            // Check children
            if (node.querySelector("[class]")) {
              shouldUpdate = true;
              break;
            }
          }
        }
      } else if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        shouldUpdate = true;
      }

      if (shouldUpdate) break;
    }

    if (shouldUpdate) {
      scan();
    }

    if (callback) {
      callback(mutations);
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["class"],
  });

  return observer;
}

function stop(): void {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
}

function init(): void {
  // Initial scan
  scan();

  // Start observing for changes
  observe();
}

function generate(classes: string[]): string {
  const result = compile(classes);
  return result.css;
}

// Create Megon object
const Megon: MegonBrowser = {
  init,
  scan,
  generate,
  observe,
  stop,
};

// Export to window
if (typeof window !== "undefined") {
  window.Megon = Megon;
}

// Also export as module
export default Megon;
export { init, scan, generate, observe, stop };
export type { MegonBrowser };
