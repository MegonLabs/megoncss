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
  // ─── Spacing ───
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

  const gapMatch = class_.match(/^gap(-[xy])?-(\d+)$/);
  if (gapMatch) {
    const dir = gapMatch[1] || "";
    const val = `${gapMatch[2]}px`;
    const propMap: Record<string, [string, string][]> = {
      "": [["gap", val]],
      "-x": [["column-gap", val]],
      "-y": [["row-gap", val]],
    };
    return {
      selector: `.${class_}`,
      properties: propMap[dir] || [["gap", val]],
    };
  }

  // ─── Typography ───
  const fsMatch = class_.match(/^fs-(\d+)$/);
  if (fsMatch)
    return {
      selector: `.${class_}`,
      properties: [["font-size", `${fsMatch[1]}px`]],
    };

  const fwMatch = class_.match(/^fw-(\d+)$/);
  if (fwMatch)
    return {
      selector: `.${class_}`,
      properties: [["font-weight", fwMatch[1]]],
    };

  const lhMatch = class_.match(/^lh-(\d+)$/);
  if (lhMatch)
    return {
      selector: `.${class_}`,
      properties: [["line-height", `${lhMatch[1]}px`]],
    };

  const taMap: Record<string, string> = {
    "ta-left": "left",
    "ta-center": "center",
    "ta-right": "right",
    "ta-justify": "justify",
    "ta-start": "start",
    "ta-end": "end",
  };
  if (taMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["text-align", taMap[class_]]],
    };

  const ttMap: Record<string, string> = {
    "tt-none": "none",
    "tt-capitalize": "capitalize",
    "tt-uppercase": "uppercase",
    "tt-lowercase": "lowercase",
  };
  if (ttMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["text-transform", ttMap[class_]]],
    };

  const tdMap: Record<string, string> = {
    "td-none": "none",
    "td-underline": "underline",
    "td-overline": "overline",
    "td-line-through": "line-through",
  };
  if (tdMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["text-decoration", tdMap[class_]]],
    };

  if (class_ === "truncate")
    return {
      selector: ".truncate",
      properties: [
        ["overflow", "hidden"],
        ["text-overflow", "ellipsis"],
        ["white-space", "nowrap"],
      ],
    };
  if (class_ === "underline-offset")
    return {
      selector: ".underline-offset",
      properties: [["text-underline-offset", "4px"]],
    };

  const lsMap: Record<string, string> = {
    "ls-tighter": "-0.05em",
    "ls-tight": "-0.025em",
    "ls-normal": "0em",
    "ls-wide": "0.025em",
    "ls-wider": "0.05em",
    "ls-widest": "0.1em",
  };
  if (lsMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["letter-spacing", lsMap[class_]]],
    };

  // ─── Colors ───
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

  const borderColMatch = class_.match(/^border-(.+)$/);
  if (borderColMatch) {
    const color = resolveColor(borderColMatch[1]);
    if (color)
      return { selector: `.${class_}`, properties: [["border-color", color]] };
  }

  // ─── Display ───
  const displayMap: Record<string, string> = {
    hide: "none",
    show: "block",
    inline: "inline",
    "inline-block": "inline-block",
    "inline-flex": "inline-flex",
    "inline-grid": "inline-grid",
    block: "block",
    "flow-root": "flow-root",
  };
  if (displayMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["display", displayMap[class_]]],
    };

  // ─── Flexbox ───
  const flexDisplayMap: Record<string, string> = {
    flex: "flex",
    "flex-col": "column",
    "flex-col-reverse": "column-reverse",
    "flex-row": "row",
    "flex-row-reverse": "row-reverse",
  };
  if (flexDisplayMap[class_]) {
    const props: [string, string][] =
      class_ === "flex"
        ? [["display", "flex"]]
        : [["flex-direction", flexDisplayMap[class_]]];
    return { selector: `.${class_}`, properties: props };
  }

  const flexWrapMap: Record<string, string> = {
    "flex-wrap": "wrap",
    "flex-wrap-reverse": "wrap-reverse",
    "flex-nowrap": "nowrap",
  };
  if (flexWrapMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["flex-wrap", flexWrapMap[class_]]],
    };

  const flexGrowMap: Record<string, string> = {
    "flex-1": "1 1 0%",
    "flex-auto": "1 1 auto",
    "flex-initial": "0 1 auto",
    "flex-none": "none",
  };
  if (flexGrowMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["flex", flexGrowMap[class_]]],
    };

  if (class_ === "grow")
    return { selector: ".grow", properties: [["flex-grow", "1"]] };
  if (class_ === "grow-0")
    return { selector: ".grow-0", properties: [["flex-grow", "0"]] };
  if (class_ === "shrink")
    return { selector: ".shrink", properties: [["flex-shrink", "1"]] };
  if (class_ === "shrink-0")
    return { selector: ".shrink-0", properties: [["flex-shrink", "0"]] };

  // ─── Alignment ───
  const alignMap: Record<string, string> = {
    "items-start": "flex-start",
    "items-end": "flex-end",
    "items-center": "center",
    "items-baseline": "baseline",
    "items-stretch": "stretch",
  };
  if (alignMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["align-items", alignMap[class_]]],
    };

  const justifyMap: Record<string, string> = {
    "justify-start": "flex-start",
    "justify-end": "flex-end",
    "justify-center": "center",
    "justify-between": "space-between",
    "justify-around": "space-around",
    "justify-evenly": "space-evenly",
  };
  if (justifyMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["justify-content", justifyMap[class_]]],
    };

  const selfMap: Record<string, string> = {
    "self-start": "flex-start",
    "self-end": "flex-end",
    "self-center": "center",
    "self-stretch": "stretch",
    "self-auto": "auto",
  };
  if (selfMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["align-self", selfMap[class_]]],
    };

  // ─── Grid ───
  const gridColsMatch = class_.match(/^grid-cols-(\d+)$/);
  if (gridColsMatch)
    return {
      selector: `.${class_}`,
      properties: [
        ["grid-template-columns", `repeat(${gridColsMatch[1]}, 1fr)`],
      ],
    };

  const gridRowsMatch = class_.match(/^grid-rows-(\d+)$/);
  if (gridRowsMatch)
    return {
      selector: `.${class_}`,
      properties: [["grid-template-rows", `repeat(${gridRowsMatch[1]}, 1fr)`]],
    };

  const gridMatch = class_.match(/^grid-(\d+)$/);
  if (gridMatch)
    return {
      selector: `.${class_}`,
      properties: [
        ["display", "grid"],
        ["grid-template-columns", `repeat(${gridMatch[1]}, 1fr)`],
      ],
    };

  if (class_ === "grid")
    return { selector: ".grid", properties: [["display", "grid"]] };

  const colSpanMatch = class_.match(/^col-span-(\d+|full)$/);
  if (colSpanMatch) {
    const val =
      colSpanMatch[1] === "full" ? "1 / -1" : `span ${colSpanMatch[1]}`;
    return { selector: `.${class_}`, properties: [["grid-column", val]] };
  }

  const rowSpanMatch = class_.match(/^row-span-(\d+|full)$/);
  if (rowSpanMatch) {
    const val =
      rowSpanMatch[1] === "full" ? "1 / -1" : `span ${rowSpanMatch[1]}`;
    return { selector: `.${class_}`, properties: [["grid-row", val]] };
  }

  // ─── Position ───
  const posMap: Record<string, string> = {
    relative: "relative",
    absolute: "absolute",
    fixed: "fixed",
    sticky: "sticky",
    static: "static",
  };
  if (posMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["position", posMap[class_]]],
    };

  const insetMatch = class_.match(/^(inset|top|right|bottom|left)-(\d+|auto)$/);
  if (insetMatch) {
    const prop = insetMatch[1] === "inset" ? "inset" : insetMatch[1];
    const val = insetMatch[2] === "auto" ? "auto" : `${insetMatch[2]}px`;
    return { selector: `.${class_}`, properties: [[prop, val]] };
  }

  const zMatch = class_.match(/^z-(\d+)$/);
  if (zMatch)
    return { selector: `.${class_}`, properties: [["z-index", zMatch[1]]] };

  if (class_ === "z-auto")
    return { selector: ".z-auto", properties: [["z-index", "auto"]] };

  // ─── Width / Height ───
  const wMatch = class_.match(/^w-(\d+)$/);
  if (wMatch)
    return {
      selector: `.${class_}`,
      properties: [["width", `${wMatch[1]}px`]],
    };

  const wPercentMatch = class_.match(/^w-(\d+)\/(\d+)$/);
  if (wPercentMatch)
    return {
      selector: `.${class_}`,
      properties: [
        [
          "width",
          `${(parseInt(wPercentMatch[1]) / parseInt(wPercentMatch[2])) * 100}%`,
        ],
      ],
    };

  const wMap: Record<string, string> = {
    "w-auto": "auto",
    "w-full": "100%",
    "w-screen": "100vw",
    "w-fit": "fit-content",
    "w-min": "min-content",
    "w-max": "max-content",
  };
  if (wMap[class_])
    return { selector: `.${class_}`, properties: [["width", wMap[class_]]] };

  const hMatch = class_.match(/^h-(\d+)$/);
  if (hMatch)
    return {
      selector: `.${class_}`,
      properties: [["height", `${hMatch[1]}px`]],
    };

  const hMap: Record<string, string> = {
    "h-auto": "auto",
    "h-full": "100%",
    "h-screen": "100vh",
    "h-fit": "fit-content",
    "h-min": "min-content",
    "h-max": "max-content",
  };
  if (hMap[class_])
    return { selector: `.${class_}`, properties: [["height", hMap[class_]]] };

  // ─── Overflow ───
  const overflowMap: Record<string, string> = {
    "overflow-auto": "auto",
    "overflow-hidden": "hidden",
    "overflow-visible": "visible",
    "overflow-scroll": "scroll",
    "overflow-x-auto": "auto",
    "overflow-x-hidden": "hidden",
    "overflow-y-auto": "auto",
    "overflow-y-hidden": "hidden",
  };
  if (overflowMap[class_]) {
    const props: [string, string][] = class_.startsWith("overflow-x")
      ? [["overflow-x", overflowMap[class_]]]
      : class_.startsWith("overflow-y")
        ? [["overflow-y", overflowMap[class_]]]
        : [["overflow", overflowMap[class_]]];
    return { selector: `.${class_}`, properties: props };
  }

  // ─── Visibility ───
  if (class_ === "visible")
    return { selector: ".visible", properties: [["visibility", "visible"]] };
  if (class_ === "invisible")
    return {
      selector: ".invisible",
      properties: [["visibility", "invisible"]],
    };
  if (class_ === "collapse")
    return { selector: ".collapse", properties: [["visibility", "collapse"]] };

  // ─── Cursor ───
  const cursorMap: Record<string, string> = {
    "cursor-auto": "auto",
    "cursor-default": "default",
    "cursor-pointer": "pointer",
    "cursor-wait": "wait",
    "cursor-text": "text",
    "cursor-move": "move",
    "cursor-help": "help",
    "cursor-not-allowed": "not-allowed",
    "cursor-none": "none",
  };
  if (cursorMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["cursor", cursorMap[class_]]],
    };

  // ─── User Select ───
  const selectMap: Record<string, string> = {
    "select-none": "none",
    "select-text": "text",
    "select-all": "all",
    "select-auto": "auto",
  };
  if (selectMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["user-select", selectMap[class_]]],
    };

  // ─── Pointer Events ───
  if (class_ === "pointer-events-none")
    return {
      selector: ".pointer-events-none",
      properties: [["pointer-events", "none"]],
    };
  if (class_ === "pointer-events-auto")
    return {
      selector: ".pointer-events-auto",
      properties: [["pointer-events", "auto"]],
    };

  // ─── Shadows ───
  const shadowMap: Record<string, string> = {
    "shadow-none": "none",
    "shadow-xs": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    "shadow-sm":
      "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "shadow-md":
      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    "shadow-lg":
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    "shadow-xl":
      "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "shadow-2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    "shadow-inner": "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
  };
  if (shadowMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["box-shadow", shadowMap[class_]]],
    };

  // ─── Ring ───
  const ringMatch = class_.match(/^ring-(\d+)$/);
  if (ringMatch)
    return {
      selector: `.${class_}`,
      properties: [
        ["box-shadow", `0 0 0 ${ringMatch[1]}px var(--tw-ring-color, #3b82f6)`],
      ],
    };
  if (class_ === "ring")
    return {
      selector: ".ring",
      properties: [["box-shadow", "0 0 0 3px var(--tw-ring-color, #3b82f6)"]],
    };
  if (class_ === "ring-inset")
    return {
      selector: ".ring-inset",
      properties: [["--tw-ring-inset", "inset"]],
    };

  // ─── Opacity ───
  const opacityMatch = class_.match(/^opacity-(\d+)$/);
  if (opacityMatch)
    return {
      selector: `.${class_}`,
      properties: [["opacity", `${parseInt(opacityMatch[1]) / 100}`]],
    };

  // ─── Border Radius ───
  if (class_ === "round-none")
    return { selector: ".round-none", properties: [["border-radius", "0px"]] };
  if (class_ === "round-sm")
    return { selector: ".round-sm", properties: [["border-radius", "2px"]] };
  if (class_ === "round")
    return { selector: ".round", properties: [["border-radius", "4px"]] };
  if (class_ === "round-md")
    return { selector: ".round-md", properties: [["border-radius", "6px"]] };
  if (class_ === "round-lg")
    return { selector: ".round-lg", properties: [["border-radius", "8px"]] };
  if (class_ === "round-xl")
    return { selector: ".round-xl", properties: [["border-radius", "12px"]] };
  if (class_ === "round-2xl")
    return { selector: ".round-2xl", properties: [["border-radius", "16px"]] };
  if (class_ === "round-3xl")
    return { selector: ".round-3xl", properties: [["border-radius", "24px"]] };
  if (class_ === "round-full")
    return {
      selector: ".round-full",
      properties: [["border-radius", "9999px"]],
    };

  const roundNumMatch = class_.match(/^round-(\d+)$/);
  if (roundNumMatch)
    return {
      selector: `.${class_}`,
      properties: [["border-radius", `${roundNumMatch[1]}px`]],
    };

  // ─── Border Width ───
  const borderMatch = class_.match(/^border(-[xytblr])?$/);
  if (borderMatch) {
    const dir = borderMatch[1] || "";
    const propMap: Record<string, [string, string][]> = {
      "": [["border-width", "1px"]],
      "-x": [
        ["border-left-width", "1px"],
        ["border-right-width", "1px"],
      ],
      "-y": [
        ["border-top-width", "1px"],
        ["border-bottom-width", "1px"],
      ],
      "-t": [["border-top-width", "1px"]],
      "-b": [["border-bottom-width", "1px"]],
      "-l": [["border-left-width", "1px"]],
      "-r": [["border-right-width", "1px"]],
    };
    return {
      selector: `.${class_}`,
      properties: propMap[dir] || [["border-width", "1px"]],
    };
  }

  if (class_ === "border-0")
    return { selector: ".border-0", properties: [["border-width", "0px"]] };
  if (class_ === "border-2")
    return { selector: ".border-2", properties: [["border-width", "2px"]] };
  if (class_ === "border-4")
    return { selector: ".border-4", properties: [["border-width", "4px"]] };
  if (class_ === "border-8")
    return { selector: ".border-8", properties: [["border-width", "8px"]] };

  // ─── Transform ───
  if (class_ === "transform")
    return {
      selector: ".transform",
      properties: [
        [
          "transform",
          "translateX(0) translateY(0) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1)",
        ],
      ],
    };
  if (class_ === "transform-none")
    return { selector: ".transform-none", properties: [["transform", "none"]] };
  if (class_ === "transform-gpu")
    return {
      selector: ".transform-gpu",
      properties: [["transform", "translate3d(0, 0, 0)"]],
    };

  const scaleMatch = class_.match(/^scale-(\d+)$/);
  if (scaleMatch)
    return {
      selector: `.${class_}`,
      properties: [["transform", `scale(${parseInt(scaleMatch[1]) / 100})`]],
    };

  const rotateMatch = class_.match(/^rotate-(\d+)$/);
  if (rotateMatch)
    return {
      selector: `.${class_}`,
      properties: [["transform", `rotate(${rotateMatch[1]}deg)`]],
    };

  const rotateNegMatch = class_.match(/^rotate-(\d+)$/);
  if (rotateNegMatch)
    return {
      selector: `.${class_}`,
      properties: [["transform", `rotate(-${rotateNegMatch[1]}deg)`]],
    };

  // ─── Transition ───
  const transitionMap: Record<string, string> = {
    "transition-none": "none 0s ease 0s",
    "transition-all": "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
    transition:
      "color 150ms, background-color 150ms, border-color 150ms, box-shadow 150ms, opacity 150ms",
    "transition-colors":
      "color 150ms, background-color 150ms, border-color 150ms",
    "transition-opacity": "opacity 150ms",
    "transition-shadow": "box-shadow 150ms",
    "transition-transform": "transform 150ms",
  };
  if (transitionMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["transition", transitionMap[class_]]],
    };

  const durationMatch = class_.match(/^duration-(\d+)$/);
  if (durationMatch)
    return {
      selector: `.${class_}`,
      properties: [["transition-duration", `${durationMatch[1]}ms`]],
    };

  const delayMatch = class_.match(/^delay-(\d+)$/);
  if (delayMatch)
    return {
      selector: `.${class_}`,
      properties: [["transition-delay", `${delayMatch[1]}ms`]],
    };

  // ─── Blur ───
  const blurMap: Record<string, string> = {
    "blur-none": "none",
    "blur-sm": "4px",
    blur: "8px",
    "blur-md": "12px",
    "blur-lg": "16px",
    "blur-xl": "24px",
    "blur-2xl": "40px",
    "blur-3xl": "64px",
  };
  if (blurMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["filter", `blur(${blurMap[class_]})`]],
    };

  // ─── Brightness ───
  const brightnessMatch = class_.match(/^brightness-(\d+)$/);
  if (brightnessMatch)
    return {
      selector: `.${class_}`,
      properties: [["filter", `brightness(${brightnessMatch[1]}%)`]],
    };

  // ─── Contrast ───
  const contrastMatch = class_.match(/^contrast-(\d+)$/);
  if (contrastMatch)
    return {
      selector: `.${class_}`,
      properties: [["filter", `contrast(${contrastMatch[1]}%)`]],
    };

  // ─── Grayscale ───
  if (class_ === "grayscale")
    return {
      selector: ".grayscale",
      properties: [["filter", "grayscale(100%)"]],
    };
  if (class_ === "grayscale-0")
    return {
      selector: ".grayscale-0",
      properties: [["filter", "grayscale(0%)"]],
    };

  // ─── Invert ───
  if (class_ === "invert")
    return { selector: ".invert", properties: [["filter", "invert(100%)"]] };
  if (class_ === "invert-0")
    return { selector: ".invert-0", properties: [["filter", "invert(0%)"]] };

  // ─── Sepia ───
  if (class_ === "sepia")
    return { selector: ".sepia", properties: [["filter", "sepia(100%)"]] };
  if (class_ === "sepia-0")
    return { selector: ".sepia-0", properties: [["filter", "sepia(0%)"]] };

  // ─── Saturate ───
  const saturateMatch = class_.match(/^saturate-(\d+)$/);
  if (saturateMatch)
    return {
      selector: `.${class_}`,
      properties: [["filter", `saturate(${saturateMatch[1]}%)`]],
    };

  // ─── Backdrop ───
  const backdropBlurMap: Record<string, string> = {
    "backdrop-blur-none": "none",
    "backdrop-blur-sm": "4px",
    "backdrop-blur": "8px",
    "backdrop-blur-md": "12px",
    "backdrop-blur-lg": "16px",
    "backdrop-blur-xl": "24px",
    "backdrop-blur-2xl": "40px",
    "backdrop-blur-3xl": "64px",
  };
  if (backdropBlurMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["backdrop-filter", `blur(${backdropBlurMap[class_]})`]],
    };

  // ─── Mix Blend Mode ───
  const blendMap: Record<string, string> = {
    "mix-blend-normal": "normal",
    "mix-blend-multiply": "multiply",
    "mix-blend-screen": "screen",
    "mix-blend-overlay": "overlay",
    "mix-blend-darken": "darken",
    "mix-blend-lighten": "lighten",
    "mix-blend-color-dodge": "color-dodge",
    "mix-blend-color-burn": "color-burn",
    "mix-blend-hard-light": "hard-light",
    "mix-blend-soft-light": "soft-light",
    "mix-blend-difference": "difference",
    "mix-blend-exclusion": "exclusion",
    "mix-blend-hue": "hue",
    "mix-blend-saturation": "saturation",
    "mix-blend-color": "color",
    "mix-blend-luminosity": "luminosity",
  };
  if (blendMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["mix-blend-mode", blendMap[class_]]],
    };

  // ─── Object Fit ───
  const objectFitMap: Record<string, string> = {
    "object-contain": "contain",
    "object-cover": "cover",
    "object-fill": "fill",
    "object-none": "none",
    "object-scale-down": "scale-down",
  };
  if (objectFitMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["object-fit", objectFitMap[class_]]],
    };

  // ─── Accessibility ───
  if (class_ === "sr-only")
    return {
      selector: ".sr-only",
      properties: [
        ["position", "absolute"],
        ["width", "1px"],
        ["height", "1px"],
        ["padding", "0"],
        ["margin", "-1px"],
        ["overflow", "hidden"],
        ["clip", "rect(0, 0, 0, 0)"],
        ["white-space", "nowrap"],
        ["border-width", "0"],
      ],
    };
  if (class_ === "not-sr-only")
    return {
      selector: ".not-sr-only",
      properties: [
        ["position", "static"],
        ["width", "auto"],
        ["height", "auto"],
        ["padding", "0"],
        ["margin", "0"],
        ["overflow", "visible"],
        ["clip", "auto"],
        ["white-space", "normal"],
      ],
    };

  // ─── Scroll ───
  if (class_ === "scroll-smooth")
    return {
      selector: ".scroll-smooth",
      properties: [["scroll-behavior", "smooth"]],
    };

  // ─── List Style ───
  const listMap: Record<string, string> = {
    "list-none": "none",
    "list-disc": "disc",
    "list-decimal": "decimal",
  };
  if (listMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["list-style-type", listMap[class_]]],
    };

  // ─── Aspect Ratio ───
  if (class_ === "aspect-square")
    return {
      selector: ".aspect-square",
      properties: [["aspect-ratio", "1 / 1"]],
    };
  if (class_ === "aspect-video")
    return {
      selector: ".aspect-video",
      properties: [["aspect-ratio", "16 / 9"]],
    };

  // ─── Resize ───
  const resizeMap: Record<string, string> = {
    "resize-none": "none",
    resize: "both",
    "resize-x": "horizontal",
    "resize-y": "vertical",
  };
  if (resizeMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["resize", resizeMap[class_]]],
    };

  // ─── Appear ───
  if (class_ === "appearance-none")
    return {
      selector: ".appearance-none",
      properties: [["appearance", "none"]],
    };

  // ─── Float ───
  const floatMap: Record<string, string> = {
    "float-left": "left",
    "float-right": "right",
    "float-none": "none",
  };
  if (floatMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["float", floatMap[class_]]],
    };

  // ─── Clear ───
  const clearMap: Record<string, string> = {
    "clear-left": "left",
    "clear-right": "right",
    "clear-both": "both",
    "clear-none": "none",
  };
  if (clearMap[class_])
    return {
      selector: `.${class_}`,
      properties: [["clear", clearMap[class_]]],
    };

  // ─── Component Classes ───
  const componentRule = generateComponentRule(class_);
  if (componentRule) return componentRule;

  return null;
}

function generateComponentRule(class_: string): CssRule | null {
  // ─── Button ───
  if (class_ === "btn")
    return {
      selector: ".btn",
      properties: [
        ["display", "inline-flex"],
        ["align-items", "center"],
        ["justify-content", "center"],
        ["gap", "8px"],
        ["padding", "8px 16px"],
        ["font-size", "14px"],
        ["font-weight", "500"],
        ["border-radius", "6px"],
        ["border", "1px solid transparent"],
        ["cursor", "pointer"],
        ["transition", "all 150ms"],
      ],
    };

  const btnVariantMap: Record<string, [string, string][]> = {
    "btn-primary": [
      ["background-color", "#3b82f6"],
      ["color", "#ffffff"],
      ["border-color", "#3b82f6"],
    ],
    "btn-secondary": [
      ["background-color", "#6b7280"],
      ["color", "#ffffff"],
      ["border-color", "#6b7280"],
    ],
    "btn-outline": [
      ["background-color", "transparent"],
      ["color", "#3b82f6"],
      ["border-color", "#3b82f6"],
    ],
    "btn-ghost": [
      ["background-color", "transparent"],
      ["color", "#374151"],
      ["border-color", "transparent"],
    ],
    "btn-danger": [
      ["background-color", "#ef4444"],
      ["color", "#ffffff"],
      ["border-color", "#ef4444"],
    ],
    "btn-success": [
      ["background-color", "#10b981"],
      ["color", "#ffffff"],
      ["border-color", "#10b981"],
    ],
    "btn-warning": [
      ["background-color", "#f59e0b"],
      ["color", "#ffffff"],
      ["border-color", "#f59e0b"],
    ],
  };
  if (btnVariantMap[class_])
    return { selector: `.${class_}`, properties: btnVariantMap[class_] };

  const btnSizeMap: Record<string, [string, string][]> = {
    "btn-xs": [
      ["padding", "4px 8px"],
      ["font-size", "12px"],
    ],
    "btn-sm": [
      ["padding", "6px 12px"],
      ["font-size", "13px"],
    ],
    "btn-lg": [
      ["padding", "12px 24px"],
      ["font-size", "16px"],
    ],
    "btn-xl": [
      ["padding", "16px 32px"],
      ["font-size", "18px"],
    ],
  };
  if (btnSizeMap[class_])
    return { selector: `.${class_}`, properties: btnSizeMap[class_] };

  if (class_ === "btn-block")
    return { selector: ".btn-block", properties: [["width", "100%"]] };

  // ─── Input ───
  if (class_ === "input")
    return {
      selector: ".input",
      properties: [
        ["display", "block"],
        ["width", "100%"],
        ["padding", "8px 12px"],
        ["font-size", "14px"],
        ["border", "1px solid #d1d5db"],
        ["border-radius", "6px"],
        ["background-color", "#ffffff"],
        ["transition", "border-color 150ms"],
      ],
    };

  const inputSizeMap: Record<string, [string, string][]> = {
    "input-sm": [
      ["padding", "6px 10px"],
      ["font-size", "13px"],
    ],
    "input-lg": [
      ["padding", "12px 16px"],
      ["font-size", "16px"],
    ],
  };
  if (inputSizeMap[class_])
    return { selector: `.${class_}`, properties: inputSizeMap[class_] };

  if (class_ === "input-error")
    return {
      selector: ".input-error",
      properties: [["border-color", "#ef4444"]],
    };

  // ─── Select ───
  if (class_ === "select")
    return {
      selector: ".select",
      properties: [
        ["display", "block"],
        ["width", "100%"],
        ["padding", "8px 32px 8px 12px"],
        ["font-size", "14px"],
        ["border", "1px solid #d1d5db"],
        ["border-radius", "6px"],
        ["background-color", "#ffffff"],
        ["appearance", "none"],
        [
          "background-image",
          "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e\")",
        ],
        ["background-position", "right 8px center"],
        ["background-size", "20px"],
        ["background-repeat", "no-repeat"],
      ],
    };

  // ─── Textarea ───
  if (class_ === "textarea")
    return {
      selector: ".textarea",
      properties: [
        ["display", "block"],
        ["width", "100%"],
        ["padding", "8px 12px"],
        ["font-size", "14px"],
        ["border", "1px solid #d1d5db"],
        ["border-radius", "6px"],
        ["background-color", "#ffffff"],
        ["resize", "vertical"],
        ["min-height", "80px"],
      ],
    };

  // ─── Modal ───
  if (class_ === "modal-overlay")
    return {
      selector: ".modal-overlay",
      properties: [
        ["position", "fixed"],
        ["inset", "0"],
        ["display", "flex"],
        ["align-items", "center"],
        ["justify-content", "center"],
        ["background-color", "rgba(0, 0, 0, 0.5)"],
        ["z-index", "50"],
      ],
    };
  if (class_ === "modal-content")
    return {
      selector: ".modal-content",
      properties: [
        ["background-color", "#ffffff"],
        ["border-radius", "8px"],
        ["box-shadow", "0 25px 50px -12px rgb(0 0 0 / 0.25)"],
        ["max-height", "90vh"],
        ["overflow", "auto"],
        ["width", "100%"],
        ["max-width", "500px"],
      ],
    };

  const modalSizeMap: Record<string, [string, string][]> = {
    "modal-sm": [["max-width", "400px"]],
    "modal-lg": [["max-width", "640px"]],
    "modal-xl": [["max-width", "768px"]],
    "modal-2xl": [["max-width", "1024px"]],
    "modal-full": [
      ["max-width", "none"],
      ["width", "100%"],
      ["height", "100%"],
      ["border-radius", "0"],
    ],
  };
  if (modalSizeMap[class_])
    return { selector: `.${class_}`, properties: modalSizeMap[class_] };

  if (class_ === "modal-header")
    return {
      selector: ".modal-header",
      properties: [
        ["display", "flex"],
        ["align-items", "center"],
        ["justify-content", "space-between"],
        ["padding", "16px 24px"],
        ["border-bottom", "1px solid #e5e7eb"],
      ],
    };
  if (class_ === "modal-body")
    return { selector: ".modal-body", properties: [["padding", "24px"]] };
  if (class_ === "modal-footer")
    return {
      selector: ".modal-footer",
      properties: [
        ["display", "flex"],
        ["justify-content", "flex-end"],
        ["gap", "8px"],
        ["padding", "16px 24px"],
        ["border-top", "1px solid #e5e7eb"],
      ],
    };
  if (class_ === "modal-close")
    return {
      selector: ".modal-close",
      properties: [
        ["background", "none"],
        ["border", "none"],
        ["font-size", "24px"],
        ["cursor", "pointer"],
        ["color", "#6b7280"],
        ["line-height", "1"],
      ],
    };

  // ─── Toast ───
  if (class_ === "toast")
    return {
      selector: ".toast",
      properties: [
        ["display", "flex"],
        ["align-items", "flex-start"],
        ["gap", "12px"],
        ["padding", "16px"],
        ["border-radius", "8px"],
        ["box-shadow", "0 10px 15px -3px rgb(0 0 0 / 0.1)"],
        ["background-color", "#ffffff"],
        ["border", "1px solid #e5e7eb"],
        ["min-width", "300px"],
        ["max-width", "400px"],
      ],
    };

  const toastTypeMap: Record<string, [string, string][]> = {
    "toast-success": [
      ["background-color", "#f0fdf4"],
      ["border-color", "#bbf7d0"],
      ["color", "#166534"],
    ],
    "toast-error": [
      ["background-color", "#fef2f2"],
      ["border-color", "#fecaca"],
      ["color", "#991b1b"],
    ],
    "toast-warning": [
      ["background-color", "#fffbeb"],
      ["border-color", "#fde68a"],
      ["color", "#92400e"],
    ],
    "toast-info": [
      ["background-color", "#eff6ff"],
      ["border-color", "#bfdbfe"],
      ["color", "#1e40af"],
    ],
  };
  if (toastTypeMap[class_])
    return { selector: `.${class_}`, properties: toastTypeMap[class_] };

  if (class_ === "toast-title")
    return {
      selector: ".toast-title",
      properties: [
        ["font-weight", "600"],
        ["font-size", "14px"],
      ],
    };
  if (class_ === "toast-desc")
    return {
      selector: ".toast-desc",
      properties: [
        ["font-size", "13px"],
        ["margin-top", "4px"],
        ["opacity", "0.8"],
      ],
    };
  if (class_ === "toast-close")
    return {
      selector: ".toast-close",
      properties: [
        ["background", "none"],
        ["border", "none"],
        ["font-size", "18px"],
        ["cursor", "pointer"],
        ["color", "inherit"],
        ["opacity", "0.5"],
        ["margin-left", "auto"],
      ],
    };

  // ─── Badge ───
  if (class_ === "badge")
    return {
      selector: ".badge",
      properties: [
        ["display", "inline-flex"],
        ["align-items", "center"],
        ["padding", "2px 8px"],
        ["font-size", "12px"],
        ["font-weight", "500"],
        ["border-radius", "9999px"],
        ["background-color", "#f3f4f6"],
        ["color", "#374151"],
      ],
    };

  const badgeColorMap: Record<string, [string, string][]> = {
    "badge-blue": [
      ["background-color", "#dbeafe"],
      ["color", "#1e40af"],
    ],
    "badge-red": [
      ["background-color", "#fee2e2"],
      ["color", "#991b1b"],
    ],
    "badge-green": [
      ["background-color", "#d1fae5"],
      ["color", "#065f46"],
    ],
    "badge-yellow": [
      ["background-color", "#fef9c3"],
      ["color", "#854d0e"],
    ],
    "badge-orange": [
      ["background-color", "#ffedd5"],
      ["color", "#9a3412"],
    ],
    "badge-purple": [
      ["background-color", "#ede9fe"],
      ["color", "#5b21b6"],
    ],
    "badge-pink": [
      ["background-color", "#fce7f3"],
      ["color", "#9d174d"],
    ],
    "badge-indigo": [
      ["background-color", "#e0e7ff"],
      ["color", "#3730a3"],
    ],
    "badge-teal": [
      ["background-color", "#ccfbf1"],
      ["color", "#115e59"],
    ],
    "badge-amber": [
      ["background-color", "#fef3c7"],
      ["color", "#92400e"],
    ],
    "badge-slate": [
      ["background-color", "#f1f5f9"],
      ["color", "#475569"],
    ],
  };
  if (badgeColorMap[class_])
    return { selector: `.${class_}`, properties: badgeColorMap[class_] };

  if (class_ === "badge-outline")
    return {
      selector: ".badge-outline",
      properties: [
        ["background-color", "transparent"],
        ["border", "1px solid currentColor"],
      ],
    };

  const badgeSizeMap: Record<string, [string, string][]> = {
    "badge-sm": [
      ["padding", "1px 6px"],
      ["font-size", "11px"],
    ],
    "badge-lg": [
      ["padding", "4px 12px"],
      ["font-size", "14px"],
    ],
  };
  if (badgeSizeMap[class_])
    return { selector: `.${class_}`, properties: badgeSizeMap[class_] };

  // ─── Alert ───
  if (class_ === "alert")
    return {
      selector: ".alert",
      properties: [
        ["display", "flex"],
        ["align-items", "flex-start"],
        ["gap", "12px"],
        ["padding", "16px"],
        ["border-radius", "8px"],
        ["border", "1px solid #e5e7eb"],
      ],
    };

  const alertTypeMap: Record<string, [string, string][]> = {
    "alert-info": [
      ["background-color", "#eff6ff"],
      ["border-color", "#bfdbfe"],
      ["color", "#1e40af"],
    ],
    "alert-success": [
      ["background-color", "#f0fdf4"],
      ["border-color", "#bbf7d0"],
      ["color", "#166534"],
    ],
    "alert-warning": [
      ["background-color", "#fffbeb"],
      ["border-color", "#fde68a"],
      ["color", "#92400e"],
    ],
    "alert-danger": [
      ["background-color", "#fef2f2"],
      ["border-color", "#fecaca"],
      ["color", "#991b1b"],
    ],
    "alert-error": [
      ["background-color", "#fef2f2"],
      ["border-color", "#fecaca"],
      ["color", "#991b1b"],
    ],
  };
  if (alertTypeMap[class_])
    return { selector: `.${class_}`, properties: alertTypeMap[class_] };

  if (class_ === "alert-title")
    return {
      selector: ".alert-title",
      properties: [
        ["font-weight", "600"],
        ["font-size", "14px"],
      ],
    };
  if (class_ === "alert-desc")
    return {
      selector: ".alert-desc",
      properties: [
        ["font-size", "13px"],
        ["margin-top", "4px"],
      ],
    };
  if (class_ === "alert-icon")
    return {
      selector: ".alert-icon",
      properties: [
        ["font-size", "20px"],
        ["line-height", "1"],
      ],
    };
  if (class_ === "alert-close")
    return {
      selector: ".alert-close",
      properties: [
        ["background", "none"],
        ["border", "none"],
        ["font-size", "18px"],
        ["cursor", "pointer"],
        ["color", "inherit"],
        ["opacity", "0.5"],
        ["margin-left", "auto"],
      ],
    };

  // ─── Card ───
  if (class_ === "card")
    return {
      selector: ".card",
      properties: [
        ["background-color", "#ffffff"],
        ["border", "1px solid #e5e7eb"],
        ["border-radius", "8px"],
        ["box-shadow", "0 1px 3px 0 rgb(0 0 0 / 0.1)"],
      ],
    };

  // ─── Table ───
  if (class_ === "megon-table")
    return {
      selector: ".megon-table",
      properties: [
        ["width", "100%"],
        ["border-collapse", "collapse"],
        ["font-size", "14px"],
      ],
    };
  if (class_ === "megon-table th")
    return {
      selector: ".megon-table th",
      properties: [
        ["text-align", "left"],
        ["padding", "12px 16px"],
        ["font-weight", "600"],
        ["border-bottom", "2px solid #e5e7eb"],
        ["background-color", "#f9fafb"],
      ],
    };
  if (class_ === "megon-table td")
    return {
      selector: ".megon-table td",
      properties: [
        ["padding", "12px 16px"],
        ["border-bottom", "1px solid #e5e7eb"],
      ],
    };
  if (class_ === "megon-table-striped tr:nth-child(even)")
    return {
      selector: ".megon-table-striped tr:nth-child(even)",
      properties: [["background-color", "#f9fafb"]],
    };
  if (class_ === "megon-table-hover tr:hover")
    return {
      selector: ".megon-table-hover tr:hover",
      properties: [["background-color", "#f3f4f6"]],
    };

  // ─── Dropdown ───
  if (class_ === "dropdown")
    return {
      selector: ".dropdown",
      properties: [
        ["position", "absolute"],
        ["z-index", "50"],
        ["min-width", "160px"],
        ["background-color", "#ffffff"],
        ["border", "1px solid #e5e7eb"],
        ["border-radius", "8px"],
        ["box-shadow", "0 10px 15px -3px rgb(0 0 0 / 0.1)"],
        ["padding", "4px"],
      ],
    };
  if (class_ === "dropdown-item")
    return {
      selector: ".dropdown-item",
      properties: [
        ["display", "block"],
        ["width", "100%"],
        ["padding", "8px 12px"],
        ["font-size", "14px"],
        ["text-align", "left"],
        ["border-radius", "4px"],
        ["cursor", "pointer"],
        ["transition", "background-color 150ms"],
      ],
    };

  // ─── Tabs ───
  if (class_ === "tabs")
    return {
      selector: ".tabs",
      properties: [
        ["display", "flex"],
        ["gap", "0"],
        ["border-bottom", "1px solid #e5e7eb"],
      ],
    };
  if (class_ === "tab")
    return {
      selector: ".tab",
      properties: [
        ["padding", "8px 16px"],
        ["font-size", "14px"],
        ["font-weight", "500"],
        ["color", "#6b7280"],
        ["cursor", "pointer"],
        ["border-bottom", "2px solid transparent"],
        ["transition", "all 150ms"],
      ],
    };
  if (class_ === "tab.active")
    return {
      selector: ".tab.active",
      properties: [
        ["color", "#3b82f6"],
        ["border-bottom-color", "#3b82f6"],
      ],
    };
  if (class_ === "tab-panel")
    return { selector: ".tab-panel", properties: [["padding", "16px 0"]] };

  // ─── Accordion ───
  if (class_ === "accordion-item")
    return {
      selector: ".accordion-item",
      properties: [
        ["border", "1px solid #e5e7eb"],
        ["border-radius", "8px"],
        ["margin-bottom", "8px"],
      ],
    };
  if (class_ === "accordion-header")
    return {
      selector: ".accordion-header",
      properties: [
        ["display", "flex"],
        ["align-items", "center"],
        ["justify-content", "space-between"],
        ["padding", "12px 16px"],
        ["cursor", "pointer"],
        ["font-weight", "500"],
      ],
    };
  if (class_ === "accordion-body")
    return {
      selector: ".accordion-body",
      properties: [
        ["padding", "0 16px 12px"],
        ["display", "none"],
      ],
    };

  // ─── Skeleton ───
  if (class_ === "skeleton")
    return {
      selector: ".skeleton",
      properties: [
        ["background-color", "#e5e7eb"],
        ["border-radius", "4px"],
        ["animation", "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"],
      ],
    };

  // ─── Avatar ───
  if (class_ === "avatar")
    return {
      selector: ".avatar",
      properties: [
        ["display", "inline-flex"],
        ["align-items", "center"],
        ["justify-content", "center"],
        ["width", "40px"],
        ["height", "40px"],
        ["border-radius", "9999px"],
        ["background-color", "#3b82f6"],
        ["color", "#ffffff"],
        ["font-weight", "600"],
        ["font-size", "14px"],
      ],
    };

  const avatarSizeMap: Record<string, [string, string][]> = {
    "avatar-sm": [
      ["width", "32px"],
      ["height", "32px"],
      ["font-size", "12px"],
    ],
    "avatar-lg": [
      ["width", "56px"],
      ["height", "56px"],
      ["font-size", "18px"],
    ],
    "avatar-xl": [
      ["width", "72px"],
      ["height", "72px"],
      ["font-size", "24px"],
    ],
  };
  if (avatarSizeMap[class_])
    return { selector: `.${class_}`, properties: avatarSizeMap[class_] };

  // ─── Divider ───
  if (class_ === "divider")
    return {
      selector: ".divider",
      properties: [
        ["height", "1px"],
        ["background-color", "#e5e7eb"],
        ["margin", "16px 0"],
        ["border", "none"],
      ],
    };

  // ─── Tooltip ───
  if (class_ === "tooltip")
    return { selector: ".tooltip", properties: [["position", "relative"]] };
  if (class_ === "tooltip-content")
    return {
      selector: ".tooltip-content",
      properties: [
        ["position", "absolute"],
        ["bottom", "100%"],
        ["left", "50%"],
        ["transform", "translateX(-50%)"],
        ["padding", "4px 8px"],
        ["font-size", "12px"],
        ["background-color", "#1f2937"],
        ["color", "#ffffff"],
        ["border-radius", "4px"],
        ["white-space", "nowrap"],
        ["opacity", "0"],
        ["pointer-events", "none"],
        ["transition", "opacity 150ms"],
      ],
    };

  // ─── Popover ───
  if (class_ === "popover")
    return {
      selector: ".popover",
      properties: [
        ["position", "absolute"],
        ["z-index", "50"],
        ["background-color", "#ffffff"],
        ["border", "1px solid #e5e7eb"],
        ["border-radius", "8px"],
        ["box-shadow", "0 10px 15px -3px rgb(0 0 0 / 0.1)"],
        ["padding", "16px"],
      ],
    };

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
    "blue-50": "#eff6ff",
    "blue-100": "#dbeafe",
    "blue-200": "#bfdbfe",
    "blue-300": "#93c5fd",
    "blue-400": "#60a5fa",
    "blue-500": "#3b82f6",
    "blue-600": "#2563eb",
    "blue-700": "#1d4ed8",
    "blue-800": "#1e40af",
    "blue-900": "#1e3a8a",
    red: "#ef4444",
    "red-dark": "#dc2626",
    "red-light": "#fee2e2",
    "red-50": "#fef2f2",
    "red-100": "#fee2e2",
    "red-200": "#fecaca",
    "red-300": "#fca5a5",
    "red-400": "#f87171",
    "red-500": "#ef4444",
    "red-600": "#dc2626",
    "red-700": "#b91c1c",
    "red-800": "#991b1b",
    "red-900": "#7f1d1d",
    green: "#10b981",
    "green-dark": "#059669",
    "green-light": "#d1fae5",
    "green-50": "#f0fdf4",
    "green-100": "#dcfce7",
    "green-200": "#bbf7d0",
    "green-300": "#86efac",
    "green-400": "#4ade80",
    "green-500": "#10b981",
    "green-600": "#059669",
    "green-700": "#047857",
    "green-800": "#065f46",
    "green-900": "#064e3b",
    yellow: "#eab308",
    "yellow-light": "#fef9c3",
    "yellow-50": "#fefce8",
    "yellow-100": "#fef9c3",
    "yellow-200": "#fef08a",
    "yellow-300": "#fde047",
    "yellow-400": "#facc15",
    "yellow-500": "#eab308",
    "yellow-600": "#ca8a04",
    "yellow-700": "#a16207",
    "yellow-800": "#854d0e",
    "yellow-900": "#713f12",
    orange: "#f97316",
    "orange-50": "#fff7ed",
    "orange-100": "#ffedd5",
    "orange-200": "#fed7aa",
    "orange-300": "#fdba74",
    "orange-400": "#fb923c",
    "orange-500": "#f97316",
    "orange-600": "#ea580c",
    "orange-700": "#c2410c",
    "orange-800": "#9a3412",
    "orange-900": "#7c2d12",
    purple: "#8b5cf6",
    "purple-50": "#faf5ff",
    "purple-100": "#f3e8ff",
    "purple-200": "#e9d5ff",
    "purple-300": "#d8b4fe",
    "purple-400": "#c084fc",
    "purple-500": "#8b5cf6",
    "purple-600": "#7c3aed",
    "purple-700": "#6d28d9",
    "purple-800": "#5b21b6",
    "purple-900": "#4c1d95",
    pink: "#ec4899",
    "pink-50": "#fdf2f8",
    "pink-100": "#fce7f3",
    "pink-200": "#fbcfe8",
    "pink-300": "#f9a8d4",
    "pink-400": "#f472b6",
    "pink-500": "#ec4899",
    "pink-600": "#db2777",
    "pink-700": "#be185d",
    "pink-800": "#9d174d",
    "pink-900": "#831843",
    indigo: "#6366f1",
    "indigo-50": "#eef2ff",
    "indigo-100": "#e0e7ff",
    "indigo-200": "#c7d2fe",
    "indigo-300": "#a5b4fc",
    "indigo-400": "#818cf8",
    "indigo-500": "#6366f1",
    "indigo-600": "#4f46e5",
    "indigo-700": "#4338ca",
    "indigo-800": "#3730a3",
    "indigo-900": "#312e81",
    teal: "#14b8a6",
    "teal-50": "#f0fdfa",
    "teal-100": "#ccfbf1",
    "teal-200": "#99f6e4",
    "teal-300": "#5eead4",
    "teal-400": "#2dd4bf",
    "teal-500": "#14b8a6",
    "teal-600": "#0d9488",
    "teal-700": "#0f766e",
    "teal-800": "#115e59",
    "teal-900": "#134e4a",
    amber: "#f59e0b",
    "amber-50": "#fffbeb",
    "amber-100": "#fef3c7",
    "amber-200": "#fde68a",
    "amber-300": "#fcd34d",
    "amber-400": "#fbbf24",
    "amber-500": "#f59e0b",
    "amber-600": "#d97706",
    "amber-700": "#b45309",
    "amber-800": "#92400e",
    "amber-900": "#78350f",
    gray: "#6b7280",
    "gray-light": "#f3f4f6",
    "gray-dark": "#374151",
    "gray-50": "#f9fafb",
    "gray-100": "#f3f4f6",
    "gray-200": "#e5e7eb",
    "gray-300": "#d1d5db",
    "gray-400": "#9ca3af",
    "gray-500": "#6b7280",
    "gray-600": "#4b5563",
    "gray-700": "#374151",
    "gray-800": "#1f2937",
    "gray-900": "#111827",
    slate: "#64748b",
    "slate-50": "#f8fafc",
    "slate-100": "#f1f5f9",
    "slate-200": "#e2e8f0",
    "slate-300": "#cbd5e1",
    "slate-400": "#94a3b8",
    "slate-500": "#64748b",
    "slate-600": "#475569",
    "slate-700": "#334155",
    "slate-800": "#1e293b",
    "slate-900": "#0f172a",
  };
  return colorMap[name] || null;
}

function escapeSelector(s: string): string {
  return s.replace(/[!"#$%&'()*+,./:;<=>?@[\]^`{|}~]/g, "\\$&");
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
