#!/usr/bin/env node

import { compile } from "@megoncss/core";
import { readFileSync, writeFileSync, existsSync, mkdirSync, watch } from "fs";
import { resolve, join } from "path";

// ─── Config ───
interface MegenConfig {
  content: string[];
  output: string;
  watch: boolean;
}

const defaultConfig: MegenConfig = {
  content: ["src/**/*.{html,jsx,tsx,vue,svelte}"],
  output: "dist/megon.css",
  watch: false,
};

function loadConfig(): MegenConfig {
  const configPath = resolve(process.cwd(), "megon.config.js");
  if (existsSync(configPath)) {
    try {
      const config = require(configPath);
      return { ...defaultConfig, ...config };
    } catch {
      return defaultConfig;
    }
  }
  return defaultConfig;
}

// ─── Scanner ───
function scanFiles(patterns: string[]): string[] {
  const classes = new Set<string>();
  const { globSync } = require("glob");

  for (const pattern of patterns) {
    try {
      const files = globSync(pattern, { cwd: process.cwd() });
      for (const file of files) {
        const content = readFileSync(resolve(process.cwd(), file), "utf-8");
        const classRegex = /class(?:Name)?=["']([^"']*)["']/g;
        let match;
        while ((match = classRegex.exec(content)) !== null) {
          match[1]
            .split(/\s+/)
            .filter(Boolean)
            .forEach((c) => classes.add(c));
        }
      }
    } catch {
      // skip invalid patterns
    }
  }

  return Array.from(classes);
}

// ─── Commands ───
function build(config: MegenConfig) {
  console.log("🔨 Building MegonCSS...");

  const classes = scanFiles(config.content);
  console.log(`  Found ${classes.length} utility classes`);

  const result = compile(classes);

  const outDir = join(config.output, "..");
  if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
  }

  writeFileSync(resolve(process.cwd(), config.output), result.css, "utf-8");
  console.log(`  Output: ${config.output} (${result.size} bytes)`);
  console.log("✅ Build complete!");
}

function init() {
  console.log("🚀 Initializing MegonCSS...");

  const configContent = `module.exports = {
  content: ["src/**/*.{html,jsx,tsx,vue,svelte}"],
  output: "dist/megon.css",
  watch: false,
};
`;

  writeFileSync(
    resolve(process.cwd(), "megon.config.js"),
    configContent,
    "utf-8",
  );
  console.log("  Created megon.config.js");

  const packageJsonPath = resolve(process.cwd(), "package.json");
  if (existsSync(packageJsonPath)) {
    const pkg = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    pkg.scripts = pkg.scripts || {};
    pkg.scripts.megon = "megon build";
    pkg.scripts["megon:watch"] = "megon watch";
    writeFileSync(packageJsonPath, JSON.stringify(pkg, null, 2), "utf-8");
    console.log("  Updated package.json scripts");
  }

  console.log("✅ Init complete! Run `megon build` to generate CSS.");
}

function watchMode(config: MegenConfig) {
  console.log("👀 Watching for changes...");

  const dirs = new Set<string>();
  for (const pattern of config.content) {
    const dir = pattern.replace(/[*{].*$/, "").replace(/\/$/, "") || "src";
    dirs.add(resolve(process.cwd(), dir));
  }

  const watchers: ReturnType<typeof watch>[] = [];
  for (const dir of dirs) {
    if (existsSync(dir)) {
      watchers.push(
        watch(dir, { recursive: true }, () => {
          build(config);
        }),
      );
    }
  }

  process.on("SIGINT", () => {
    watchers.forEach((w) => w.close());
    process.exit(0);
  });
}

// ─── CLI ───
function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  const config = loadConfig();

  switch (command) {
    case "build":
      build(config);
      break;
    case "watch":
      config.watch = true;
      watchMode(config);
      break;
    case "init":
      init();
      break;
    default:
      console.log(`
Usage: megon <command>

Commands:
  build    Build CSS from source files
  watch    Watch for changes and rebuild
  init     Initialize MegonCSS in project

Options:
  --help   Show this help message
  --version Show version
`);
  }
}

main();
