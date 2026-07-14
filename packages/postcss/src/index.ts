import postcss, { Root, Result } from "postcss";
import { compile, type MegonConfig } from "@megoncss/core";
import * as fs from "fs";
import * as path from "path";

export interface MegonPostcssOptions {
  content?: string[];
  cssPath?: string;
  config?: MegonConfig;
}

function extractClassesFromFile(filePath: string): string[] {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const classRegex = /class(?:Name)?=["']([^"']+)["']/g;
    const classes: string[] = [];
    let match;
    while ((match = classRegex.exec(content)) !== null) {
      const classList = match[1].split(/\s+/).filter(Boolean);
      classes.push(...classList);
    }
    return classes;
  } catch {
    return [];
  }
}

function extractClassesFromGlob(patterns: string[]): string[] {
  const classes: string[] = [];
  for (const pattern of patterns) {
    if (pattern.includes("*") || pattern.includes("{")) {
      const dir = path.dirname(pattern);
      const filePattern = path.basename(pattern);
      try {
        if (fs.existsSync(dir)) {
          const files = fs.readdirSync(dir);
          for (const file of files) {
            if (
              filePattern === "*" ||
              file.endsWith(path.extname(filePattern)) ||
              file.match(filePattern.replace("*", ".*"))
            ) {
              classes.push(...extractClassesFromFile(path.join(dir, file)));
            }
          }
        }
      } catch {
        // Skip invalid paths
      }
    } else if (fs.existsSync(pattern)) {
      classes.push(...extractClassesFromFile(pattern));
    }
  }
  return classes;
}

const plugin = (opts: MegonPostcssOptions = {}): postcss.Plugin => {
  return {
    postcssPlugin: "@megoncss/postcss",
    async Once(root: Root, { result }: { result: Result }) {
      const contentFiles: string[] = opts.content || [];

      // Check for @megon directive
      let hasDirective = false;
      root.walkAtRules("megon", (atRule) => {
        hasDirective = true;
        atRule.remove();
      });

      if (!hasDirective) return;

      // Collect all classes from content files
      const allClasses = new Set<string>();

      // Extract from content globs
      if (contentFiles.length > 0) {
        const foundClasses = extractClassesFromGlob(contentFiles);
        foundClasses.forEach((cls) => allClasses.add(cls));
      }

      // Extract from CSS file itself (scan for @apply directives)
      root.walkAtRules("apply", (atRule) => {
        const classes = atRule.params.split(/\s+/).filter(Boolean);
        classes.forEach((cls) => allClasses.add(cls));
        atRule.remove();
      });

      // Also scan the CSS content for class references in comments
      root.walkComments((comment) => {
        const classMatches = comment.text.match(
          /classes?:\s*([a-z0-9\s\-:\/]+)/gi,
        );
        if (classMatches) {
          classMatches.forEach((match) => {
            const classes = match.replace(/classes?:\s*/i, "").split(/\s+/);
            classes.forEach((cls) => allClasses.add(cls));
          });
        }
      });

      // Generate CSS for each class
      const { css, size } = compile(Array.from(allClasses));

      if (css) {
        // Parse and append generated CSS
        const generatedRoot = postcss.parse(css);
        root.append(generatedRoot);
      }

      // Log stats in non-production
      if (process.env.NODE_ENV !== "production" && allClasses.size > 0) {
        console.log(
          `[megoncss] Generated ${allClasses.size} classes (${size} bytes)`,
        );
      }
    },
  };
};

plugin.postcss = true;

export default plugin;
