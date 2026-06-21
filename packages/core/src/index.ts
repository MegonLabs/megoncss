export interface MegonConfig {
  prefix?: string;
  screens?: Record<string, string>;
  colors?: Record<string, string>;
  spacing?: Record<string, string>;
}

export interface CssRule {
  selector: string;
  properties: Array<[string, string]>;
  atRule?: string;
  pseudo?: string;
}

export interface CompileResult {
  css: string;
  classes: string[];
  size: number;
}

export const defaultConfig: MegonConfig = {
  screens: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  colors: {
    white: "#ffffff",
    black: "#000000",
    blue: "#3b82f6",
    "blue-dark": "#1d4ed8",
    "blue-light": "#dbeafe",
    red: "#ef4444",
    "red-dark": "#dc2626",
    green: "#10b981",
    "green-dark": "#059669",
    gray: "#6b7280",
    "gray-light": "#f3f4f6",
  },
  spacing: {
    "0": "0px",
    "4": "4px",
    "8": "8px",
    "12": "12px",
    "16": "16px",
    "20": "20px",
    "24": "24px",
    "32": "32px",
    "40": "40px",
    "48": "48px",
    "64": "64px",
  },
};

export function parseClass(cls: string): {
  variant?: string;
  state?: string;
  baseClass: string;
} {
  const darkMatch = cls.match(/^dark:(.+)$/);
  if (darkMatch) return { variant: "dark", baseClass: darkMatch[1] };

  const variantMatch = cls.match(/^(sm|md|lg|xl):(.+)$/);
  if (variantMatch)
    return { variant: variantMatch[1], baseClass: variantMatch[2] };

  const stateMatch = cls.match(/^(hover|focus|active|disabled):(.+)$/);
  if (stateMatch) return { state: stateMatch[1], baseClass: stateMatch[2] };

  return { baseClass: cls };
}

export function classToCss(class_: string): string | null {
  const { variant, state, baseClass } = parseClass(class_);
  const rule = generateRule(baseClass);
  if (!rule) return null;

  let selector = `.${escapeSelector(class_)}`;

  if (state) {
    const pseudoMap: Record<string, string> = {
      hover: ":hover",
      focus: ":focus",
      active: ":active",
      disabled: ":disabled",
    };
    const pseudo = pseudoMap[state] || `:${state}`;
    selector = `.${escapeSelector(baseClass)}${pseudo}`;
  }

  // Wrap in variant media query
  if (variant === "dark") {
    const inner = generateRuleOutput(`.${escapeSelector(baseClass)}`, rule);
    return `.dark ${inner}`;
  }

  if (variant) {
    const screenWidth = defaultConfig.screens?.[variant] || "768px";
    const inner = generateRuleOutput(selector, rule);
    return `@media (min-width: ${screenWidth}) { ${inner} }`;
  }

  return generateRuleOutput(selector, rule);
}

function generateRule(class_: string): CssRule | null {
  // Spacing: pad-16, mar-8, gap-16
  const padMatch = class_.match(/^pad(-[xytblr])?-(\d+)$/);
  if (padMatch) {
    const dir = padMatch[1] || "";
    const val = `${padMatch[2]}px`;
    const propMap: Record<string, [string, string][]> = {
      "": [["padding", val]],
      "-x": [
        ["padding-left", val],
        ["padding-right", val],
      ],
      "-y": [
        ["padding-top", val],
        ["padding-bottom", val],
      ],
      "-t": [["padding-top", val]],
      "-b": [["padding-bottom", val]],
      "-l": [["padding-left", val]],
      "-r": [["padding-right", val]],
    };
    return {
      selector: `.${class_}`,
      properties: propMap[dir] || [["padding", val]],
    };
  }

  const marMatch = class_.match(/^mar(-[xytblr])?-(\d+)$/);
  if (marMatch) {
    const dir = marMatch[1] || "";
    const val = `${marMatch[2]}px`;
    const propMap: Record<string, [string, string][]> = {
      "": [["margin", val]],
      "-x": [
        ["margin-left", val],
        ["margin-right", val],
      ],
      "-y": [
        ["margin-top", val],
        ["margin-bottom", val],
      ],
      "-t": [["margin-top", val]],
      "-b": [["margin-bottom", val]],
      "-l": [["margin-left", val]],
      "-r": [["margin-right", val]],
    };
    return {
      selector: `.${class_}`,
      properties: propMap[dir] || [["margin", val]],
    };
  }

  if (class_ === "mar-x-auto") {
    return {
      selector: ".mar-x-auto",
      properties: [
        ["margin-left", "auto"],
        ["margin-right", "auto"],
      ],
    };
  }

  const gapMatch = class_.match(/^gap-(\d+)$/);
  if (gapMatch) {
    return {
      selector: `.${class_}`,
      properties: [["gap", `${gapMatch[1]}px`]],
    };
  }

  // Typography: fs-18, fw-700
  const fsMatch = class_.match(/^fs-(\d+)$/);
  if (fsMatch) {
    return {
      selector: `.${class_}`,
      properties: [["font-size", `${fsMatch[1]}px`]],
    };
  }

  const fwMatch = class_.match(/^fw-(\d+)$/);
  if (fwMatch) {
    return {
      selector: `.${class_}`,
      properties: [["font-weight", fwMatch[1]]],
    };
  }

  // Colors
  const bgMatch = class_.match(/^bg-(.+)$/);
  if (bgMatch) {
    const color = resolveColor(bgMatch[1]);
    if (color)
      return {
        selector: `.${class_}`,
        properties: [["background-color", color]],
      };
  }

  const textMatch = class_.match(/^text-(.+)$/);
  if (textMatch) {
    const color = resolveColor(textMatch[1]);
    if (color)
      return { selector: `.${class_}`, properties: [["color", color]] };
  }

  // Effects
  if (class_ === "round-full") {
    return {
      selector: ".round-full",
      properties: [["border-radius", "9999px"]],
    };
  }
  const roundMatch = class_.match(/^round-(\d+)$/);
  if (roundMatch) {
    return {
      selector: `.${class_}`,
      properties: [["border-radius", `${roundMatch[1]}px`]],
    };
  }

  return null;
}

function generateRuleOutput(selector: string, rule: CssRule): string {
  const props = rule.properties.map(([k, v]) => `${k}: ${v}`).join("; ");
  return `${selector} { ${props} }`;
}

function resolveColor(name: string): string | null {
  const colorMap: Record<string, string> = {
    white: "#ffffff",
    black: "#000000",
    blue: "#3b82f6",
    "blue-dark": "#1d4ed8",
    "blue-light": "#dbeafe",
    "blue-500": "#3b82f6",
    "blue-600": "#2563eb",
    "blue-700": "#1d4ed8",
    red: "#ef4444",
    "red-dark": "#dc2626",
    "red-light": "#fee2e2",
    "red-500": "#ef4444",
    "red-600": "#dc2626",
    green: "#10b981",
    "green-dark": "#059669",
    "green-light": "#d1fae5",
    "green-500": "#10b981",
    "green-600": "#059669",
    yellow: "#eab308",
    "yellow-light": "#fef9c3",
    purple: "#8b5cf6",
    gray: "#6b7280",
    "gray-light": "#f3f4f6",
    "gray-dark": "#374151",
    "gray-100": "#f3f4f6",
    "gray-200": "#e5e7eb",
    "gray-300": "#d1d5db",
    "gray-400": "#9ca3af",
    "gray-500": "#6b7280",
    "gray-600": "#4b5563",
    "gray-700": "#374151",
    "gray-800": "#1f2937",
    "gray-900": "#111827",
  };
  return colorMap[name] || null;
}

function escapeSelector(s: string): string {
  return s.replace(/[!\"#$%&'()*+,./:;<=>?@[\]^`{|}~]/g, "\\$&");
}

export function compile(classes: string[]): CompileResult {
  const lines: string[] = [];
  const found: string[] = [];

  for (const cls of classes) {
    const css = classToCss(cls);
    if (css) {
      lines.push(css);
      found.push(cls);
    }
  }

  return {
    css: lines.join("\n"),
    classes: found,
    size: lines.join("\n").length,
  };
}
