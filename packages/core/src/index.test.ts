import { describe, it, expect } from "vitest";
import {
  parseClass,
  classToCss,
  compile,
  defaultConfig,
  type MegonConfig,
} from "../src/index";

describe("parseClass", () => {
  it("returns baseClass for plain classes", () => {
    expect(parseClass("pad-16")).toEqual({ baseClass: "pad-16" });
    expect(parseClass("fs-18")).toEqual({ baseClass: "fs-18" });
    expect(parseClass("bg-blue")).toEqual({ baseClass: "bg-blue" });
  });

  it("parses dark variant", () => {
    expect(parseClass("dark:bg-blue")).toEqual({
      variant: "dark",
      baseClass: "bg-blue",
    });
    expect(parseClass("dark:text-white")).toEqual({
      variant: "dark",
      baseClass: "text-white",
    });
  });

  it("parses responsive variants", () => {
    expect(parseClass("sm:pad-16")).toEqual({
      variant: "sm",
      baseClass: "pad-16",
    });
    expect(parseClass("md:fs-18")).toEqual({
      variant: "md",
      baseClass: "fs-18",
    });
    expect(parseClass("lg:bg-blue")).toEqual({
      variant: "lg",
      baseClass: "bg-blue",
    });
    expect(parseClass("xl:text-white")).toEqual({
      variant: "xl",
      baseClass: "text-white",
    });
  });

  it("parses state variants", () => {
    expect(parseClass("hover:bg-blue")).toEqual({
      state: "hover",
      baseClass: "bg-blue",
    });
    expect(parseClass("focus:fs-18")).toEqual({
      state: "focus",
      baseClass: "fs-18",
    });
    expect(parseClass("active:text-white")).toEqual({
      state: "active",
      baseClass: "text-white",
    });
    expect(parseClass("disabled:bg-gray")).toEqual({
      state: "disabled",
      baseClass: "bg-gray",
    });
  });
});

describe("classToCss", () => {
  it("generates padding CSS", () => {
    expect(classToCss("pad-16")).toBe(".pad-16 { padding: 16px }");
    expect(classToCss("pad-0")).toBe(".pad-0 { padding: 0px }");
    expect(classToCss("pad-8")).toBe(".pad-8 { padding: 8px }");
    expect(classToCss("pad-64")).toBe(".pad-64 { padding: 64px }");
  });

  it("generates directional padding CSS", () => {
    expect(classToCss("pad-x-16")).toBe(
      ".pad-x-16 { padding-left: 16px; padding-right: 16px }",
    );
    expect(classToCss("pad-y-8")).toBe(
      ".pad-y-8 { padding-top: 8px; padding-bottom: 8px }",
    );
    expect(classToCss("pad-t-4")).toBe(".pad-t-4 { padding-top: 4px }");
    expect(classToCss("pad-b-4")).toBe(".pad-b-4 { padding-bottom: 4px }");
    expect(classToCss("pad-l-4")).toBe(".pad-l-4 { padding-left: 4px }");
    expect(classToCss("pad-r-4")).toBe(".pad-r-4 { padding-right: 4px }");
  });

  it("generates margin CSS", () => {
    expect(classToCss("mar-16")).toBe(".mar-16 { margin: 16px }");
    expect(classToCss("mar-x-auto")).toBe(
      ".mar-x-auto { margin-left: auto; margin-right: auto }",
    );
  });

  it("generates gap CSS", () => {
    expect(classToCss("gap-8")).toBe(".gap-8 { gap: 8px }");
    expect(classToCss("gap-16")).toBe(".gap-16 { gap: 16px }");
  });

  it("generates font-size CSS", () => {
    expect(classToCss("fs-12")).toBe(".fs-12 { font-size: 12px }");
    expect(classToCss("fs-18")).toBe(".fs-18 { font-size: 18px }");
    expect(classToCss("fs-24")).toBe(".fs-24 { font-size: 24px }");
    expect(classToCss("fs-72")).toBe(".fs-72 { font-size: 72px }");
  });

  it("generates font-weight CSS", () => {
    expect(classToCss("fw-400")).toBe(".fw-400 { font-weight: 400 }");
    expect(classToCss("fw-700")).toBe(".fw-700 { font-weight: 700 }");
  });

  it("generates background color CSS", () => {
    expect(classToCss("bg-blue")).toBe(
      ".bg-blue { background-color: #3b82f6 }",
    );
    expect(classToCss("bg-red")).toBe(".bg-red { background-color: #ef4444 }");
    expect(classToCss("bg-green")).toBe(
      ".bg-green { background-color: #10b981 }",
    );
    expect(classToCss("bg-white")).toBe(
      ".bg-white { background-color: #ffffff }",
    );
    expect(classToCss("bg-black")).toBe(
      ".bg-black { background-color: #000000 }",
    );
  });

  it("generates text color CSS", () => {
    expect(classToCss("text-blue")).toBe(".text-blue { color: #3b82f6 }");
    expect(classToCss("text-red")).toBe(".text-red { color: #ef4444 }");
    expect(classToCss("text-white")).toBe(".text-white { color: #ffffff }");
  });

  it("generates border-radius CSS", () => {
    expect(classToCss("round-8")).toBe(".round-8 { border-radius: 8px }");
    expect(classToCss("round-full")).toBe(
      ".round-full { border-radius: 9999px }",
    );
  });

  it("returns null for unknown classes", () => {
    expect(classToCss("unknown-class")).toBeNull();
    expect(classToCss("random-text")).toBeNull();
  });

  it("generates dark variant CSS", () => {
    const css = classToCss("dark:bg-blue");
    expect(css).toContain(".dark");
    expect(css).toContain("background-color: #3b82f6");
  });

  it("generates responsive variant CSS", () => {
    const css = classToCss("sm:pad-16");
    expect(css).toContain("@media (min-width: 640px)");
    expect(css).toContain("padding: 16px");

    const mdCss = classToCss("md:fs-18");
    expect(mdCss).toContain("@media (min-width: 768px)");
    expect(mdCss).toContain("font-size: 18px");
  });

  it("generates state variant CSS", () => {
    const css = classToCss("hover:bg-blue");
    expect(css).toContain(":hover");
    expect(css).toContain("background-color: #3b82f6");

    const focusCss = classToCss("focus:fs-18");
    expect(focusCss).toContain(":focus");
    expect(focusCss).toContain("font-size: 18px");
  });
});

describe("compile", () => {
  it("compiles multiple classes", () => {
    const result = compile(["pad-16", "fs-18", "bg-blue"]);
    expect(result.css).toContain("padding: 16px");
    expect(result.css).toContain("font-size: 18px");
    expect(result.css).toContain("background-color: #3b82f6");
    expect(result.classes).toEqual(["pad-16", "fs-18", "bg-blue"]);
    expect(result.size).toBeGreaterThan(0);
  });

  it("skips unknown classes", () => {
    const result = compile(["pad-16", "unknown", "fs-18"]);
    expect(result.classes).toEqual(["pad-16", "fs-18"]);
    expect(result.css).not.toContain("unknown");
  });

  it("returns empty for no classes", () => {
    const result = compile([]);
    expect(result.css).toBe("");
    expect(result.classes).toEqual([]);
    expect(result.size).toBe(0);
  });

  it("compiles mixed variants and states", () => {
    const result = compile([
      "dark:bg-blue",
      "sm:pad-16",
      "hover:bg-red",
      "pad-8",
    ]);
    expect(result.classes).toEqual([
      "dark:bg-blue",
      "sm:pad-16",
      "hover:bg-red",
      "pad-8",
    ]);
    expect(result.css).toContain(".dark");
    expect(result.css).toContain("@media (min-width: 640px)");
    expect(result.css).toContain(":hover");
  });
});

describe("defaultConfig", () => {
  it("has correct screens", () => {
    expect(defaultConfig.screens?.sm).toBe("640px");
    expect(defaultConfig.screens?.md).toBe("768px");
    expect(defaultConfig.screens?.lg).toBe("1024px");
    expect(defaultConfig.screens?.xl).toBe("1280px");
  });

  it("has correct colors", () => {
    expect(defaultConfig.colors?.white).toBe("#ffffff");
    expect(defaultConfig.colors?.black).toBe("#000000");
    expect(defaultConfig.colors?.blue).toBe("#3b82f6");
    expect(defaultConfig.colors?.red).toBe("#ef4444");
    expect(defaultConfig.colors?.green).toBe("#10b981");
  });

  it("has correct spacing", () => {
    expect(defaultConfig.spacing?.["0"]).toBe("0px");
    expect(defaultConfig.spacing?.["4"]).toBe("4px");
    expect(defaultConfig.spacing?.["8"]).toBe("8px");
    expect(defaultConfig.spacing?.["16"]).toBe("16px");
    expect(defaultConfig.spacing?.["64"]).toBe("64px");
  });
});

describe("gap directional", () => {
  it("generates gap-x CSS", () => {
    expect(classToCss("gap-x-8")).toBe(".gap-x-8 { column-gap: 8px }");
    expect(classToCss("gap-x-16")).toBe(".gap-x-16 { column-gap: 16px }");
  });

  it("generates gap-y CSS", () => {
    expect(classToCss("gap-y-8")).toBe(".gap-y-8 { row-gap: 8px }");
    expect(classToCss("gap-y-16")).toBe(".gap-y-16 { row-gap: 16px }");
  });
});

describe("typography utilities", () => {
  it("generates line-height CSS", () => {
    expect(classToCss("lh-12")).toBe(".lh-12 { line-height: 12px }");
    expect(classToCss("lh-24")).toBe(".lh-24 { line-height: 24px }");
    expect(classToCss("lh-48")).toBe(".lh-48 { line-height: 48px }");
  });

  it("generates text-align CSS", () => {
    expect(classToCss("ta-left")).toBe(".ta-left { text-align: left }");
    expect(classToCss("ta-center")).toBe(".ta-center { text-align: center }");
    expect(classToCss("ta-right")).toBe(".ta-right { text-align: right }");
  });

  it("generates text-transform CSS", () => {
    expect(classToCss("tt-uppercase")).toBe(
      ".tt-uppercase { text-transform: uppercase }",
    );
    expect(classToCss("tt-lowercase")).toBe(
      ".tt-lowercase { text-transform: lowercase }",
    );
    expect(classToCss("tt-capitalize")).toBe(
      ".tt-capitalize { text-transform: capitalize }",
    );
  });

  it("generates font-style CSS", () => {
    expect(classToCss("font-style-italic")).toBeNull();
  });

  it("generates font-family CSS", () => {
    expect(classToCss("sans")).toBeNull();
    expect(classToCss("mono")).toBeNull();
    expect(classToCss("serif")).toBeNull();
  });

  it("generates text-decoration CSS", () => {
    expect(classToCss("td-underline")).toBe(
      ".td-underline { text-decoration: underline }",
    );
    expect(classToCss("td-line-through")).toBe(
      ".td-line-through { text-decoration: line-through }",
    );
    expect(classToCss("td-none")).toBe(".td-none { text-decoration: none }");
  });

  it("generates letter-spacing CSS", () => {
    expect(classToCss("ls-tight")).toBe(
      ".ls-tight { letter-spacing: -0.025em }",
    );
    expect(classToCss("ls-wide")).toBe(".ls-wide { letter-spacing: 0.025em }");
  });
});

describe("display utilities", () => {
  it("generates display CSS", () => {
    expect(classToCss("hide")).toBe(".hide { display: none }");
    expect(classToCss("block")).toBe(".block { display: block }");
    expect(classToCss("inline-block")).toBe(
      ".inline-block { display: inline-block }",
    );
    expect(classToCss("flex")).toBe(".flex { display: flex }");
    expect(classToCss("grid")).toBe(".grid { display: grid }");
  });
});

describe("flexbox utilities", () => {
  it("generates flex-direction CSS", () => {
    expect(classToCss("flex-col")).toBe(".flex-col { flex-direction: column }");
    expect(classToCss("flex-row")).toBe(".flex-row { flex-direction: row }");
  });

  it("generates flex-wrap CSS", () => {
    expect(classToCss("flex-wrap")).toBe(".flex-wrap { flex-wrap: wrap }");
    expect(classToCss("flex-nowrap")).toBe(
      ".flex-nowrap { flex-wrap: nowrap }",
    );
  });

  it("generates flex-grow/shrink CSS", () => {
    expect(classToCss("grow")).toBe(".grow { flex-grow: 1 }");
    expect(classToCss("shrink")).toBe(".shrink { flex-shrink: 1 }");
  });
});

describe("alignment utilities", () => {
  it("generates align-items CSS", () => {
    expect(classToCss("items-center")).toBe(
      ".items-center { align-items: center }",
    );
    expect(classToCss("items-start")).toBe(
      ".items-start { align-items: flex-start }",
    );
  });

  it("generates justify-content CSS", () => {
    expect(classToCss("justify-center")).toBe(
      ".justify-center { justify-content: center }",
    );
    expect(classToCss("justify-between")).toBe(
      ".justify-between { justify-content: space-between }",
    );
  });
});

describe("position utilities", () => {
  it("generates position CSS", () => {
    expect(classToCss("relative")).toBe(".relative { position: relative }");
    expect(classToCss("absolute")).toBe(".absolute { position: absolute }");
    expect(classToCss("fixed")).toBe(".fixed { position: fixed }");
    expect(classToCss("sticky")).toBe(".sticky { position: sticky }");
  });

  it("generates inset CSS", () => {
    expect(classToCss("inset-0")).toBe(".inset-0 { inset: 0px }");
  });
});

describe("width/height utilities", () => {
  it("generates width CSS", () => {
    expect(classToCss("w-full")).toBe(".w-full { width: 100% }");
    expect(classToCss("w-auto")).toBe(".w-auto { width: auto }");
    expect(classToCss("w-screen")).toBe(".w-screen { width: 100vw }");
  });

  it("generates height CSS", () => {
    expect(classToCss("h-full")).toBe(".h-full { height: 100% }");
    expect(classToCss("h-auto")).toBe(".h-auto { height: auto }");
    expect(classToCss("h-screen")).toBe(".h-screen { height: 100vh }");
  });
});

describe("shadow utilities", () => {
  it("generates shadow CSS", () => {
    expect(classToCss("shadow-sm")).toContain(".shadow-sm");
    expect(classToCss("shadow-md")).toContain(".shadow-md");
    expect(classToCss("shadow-lg")).toContain(".shadow-lg");
    expect(classToCss("shadow-xl")).toContain(".shadow-xl");
    expect(classToCss("shadow-2xl")).toContain(".shadow-2xl");
    expect(classToCss("shadow-inner")).toContain(".shadow-inner");
    expect(classToCss("shadow-none")).toContain(".shadow-none");
  });
});

describe("opacity utilities", () => {
  it("generates opacity CSS", () => {
    expect(classToCss("opacity-0")).toBe(".opacity-0 { opacity: 0 }");
    expect(classToCss("opacity-50")).toBe(".opacity-50 { opacity: 0.5 }");
    expect(classToCss("opacity-100")).toBe(".opacity-100 { opacity: 1 }");
  });
});

describe("overflow utilities", () => {
  it("generates overflow CSS", () => {
    expect(classToCss("overflow-hidden")).toBe(
      ".overflow-hidden { overflow: hidden }",
    );
    expect(classToCss("overflow-auto")).toBe(
      ".overflow-auto { overflow: auto }",
    );
    expect(classToCss("overflow-scroll")).toBe(
      ".overflow-scroll { overflow: scroll }",
    );
  });
});

describe("visibility utilities", () => {
  it("generates visibility CSS", () => {
    expect(classToCss("visible")).toBe(".visible { visibility: visible }");
    expect(classToCss("invisible")).toBe(
      ".invisible { visibility: invisible }",
    );
  });
});

describe("cursor utilities", () => {
  it("generates cursor CSS", () => {
    expect(classToCss("cursor-pointer")).toBe(
      ".cursor-pointer { cursor: pointer }",
    );
    expect(classToCss("cursor-default")).toBe(
      ".cursor-default { cursor: default }",
    );
    expect(classToCss("cursor-not-allowed")).toBe(
      ".cursor-not-allowed { cursor: not-allowed }",
    );
  });
});

describe("component classes", () => {
  it("generates btn CSS", () => {
    const css = classToCss("btn");
    expect(css).toContain(".btn");
    expect(css).toContain("display: inline-flex");
    expect(css).toContain("border-radius");
  });

  it("generates btn-primary CSS", () => {
    const css = classToCss("btn-primary");
    expect(css).toContain(".btn-primary");
    expect(css).toContain("background-color: #3b82f6");
  });

  it("generates input CSS", () => {
    const css = classToCss("input");
    expect(css).toContain(".input");
    expect(css).toContain("display: block");
    expect(css).toContain("width: 100%");
  });

  it("generates badge CSS", () => {
    const css = classToCss("badge");
    expect(css).toContain(".badge");
    expect(css).toContain("display: inline-flex");
  });

  it("generates alert CSS", () => {
    const css = classToCss("alert");
    expect(css).toContain(".alert");
    expect(css).toContain("display: flex");
  });

  it("generates card CSS", () => {
    const css = classToCss("card");
    expect(css).toContain(".card");
    expect(css).toContain("background-color");
  });

  it("generates modal-overlay CSS", () => {
    const css = classToCss("modal-overlay");
    expect(css).toContain(".modal-overlay");
    expect(css).toContain("position: fixed");
  });

  it("generates toast CSS", () => {
    const css = classToCss("toast");
    expect(css).toContain(".toast");
    expect(css).toContain("display: flex");
  });
});
