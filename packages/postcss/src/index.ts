import postcss from "postcss";
import { classToCss, parseClass } from "@megoncss/core";

interface MegonPostcssOptions {
  content?: string[];
}

const MEGON_DIRECTIVE = "@megon";

const plugin = postcss.plugin<MegonPostcssOptions>(
  "@megoncss/postcss",
  (opts = {}) => {
    return (root, result) => {
      let hasDirective = false;

      root.walkAtRules((atRule) => {
        if (
          atRule.name === "megon" ||
          atRule.params?.startsWith(MEGON_DIRECTIVE)
        ) {
          hasDirective = true;
          atRule.remove();
        }
      });

      if (!hasDirective) return;

      // Scan content files for class names (simplified)
      // In production, this would glob content paths and extract classes
      const knownClasses = new Set<string>();

      // Generate CSS for each known class
      const generated: string[] = [];

      for (const cls of knownClasses) {
        const css = classToCss(cls);
        if (css) generated.push(css);
      }

      if (generated.length > 0) {
        root.append(postcss.parse(generated.join("\n")));
      }
    };
  },
);

export default plugin;
