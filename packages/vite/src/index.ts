import type { Plugin } from "vite";
import { compile } from "@megoncss/core";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { resolve, join } from "path";

export interface MegonOptions {
  content?: string[];
  outputPath?: string;
}

const scannedClasses = new Set<string>();

function scanFiles(patterns: string[]): string[] {
  for (const pattern of patterns) {
    try {
      const resolved = resolve(process.cwd(), pattern);
      const content = readFileSync(resolved, "utf-8");
      const classRegex = /class(?:Name)?=["']([^"']*)["']/g;
      let match;
      while ((match = classRegex.exec(content)) !== null) {
        match[1]
          .split(/\s+/)
          .filter(Boolean)
          .forEach((c) => scannedClasses.add(c));
      }
    } catch {
      // skip missing files
    }
  }

  return Array.from(scannedClasses);
}

export function megoncss(options: MegonOptions = {}): Plugin {
  const { content = ["src/**/*.{html,jsx,tsx,vue,svelte}"], outputPath } =
    options;

  return {
    name: "@megoncss/vite",
    enforce: "pre",

    transform(code, id) {
      if (
        id.endsWith(".html") ||
        id.endsWith(".jsx") ||
        id.endsWith(".tsx") ||
        id.endsWith(".vue") ||
        id.endsWith(".svelte")
      ) {
        const classRegex = /class(?:Name)?=["']([^"']*)["']/g;
        let match;
        while ((match = classRegex.exec(code)) !== null) {
          match[1]
            .split(/\s+/)
            .filter(Boolean)
            .forEach((c) => scannedClasses.add(c));
        }
      }
      return null;
    },

    generateBundle() {
      const scanned = scanFiles(content);
      const allClasses = Array.from(new Set(scanned));

      if (allClasses.length === 0) return;

      const result = compile(allClasses);
      const css = result.css;

      if (outputPath) {
        const out = resolve(process.cwd(), outputPath);
        const dir = join(out, "..");
        if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
        writeFileSync(out, css, "utf-8");
      }

      this.emitFile({
        type: "asset",
        fileName: "megoncss.css",
        source: css,
      });
    },
  };
}

export default megoncss;
