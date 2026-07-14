const fs = require("fs");
const path = require("path");

const rootSrc = path.join(__dirname, "..", "..", "..", "src");
const distDir = path.join(__dirname, "..", "dist");

// File order
const files = [
  "base/reset.css",
  "base/tokens.css",
  "utilities/spacing.css",
  "utilities/typography.css",
  "utilities/layout.css",
  "utilities/colors.css",
  "utilities/effects.css",
  "utilities/variants.css",
  "components/button.css",
  "components/modal.css",
  "components/toast.css",
  "components/badge.css",
  "components/alert.css",
  "components/field.css",
  "components/table.css",
  "themes/dark.css",
];

let css = "/* MegonCSS v2 — Exact Pixel CSS Framework */\n";
css += "/* https://github.com/MegonLabs/megoncss */\n\n";

for (const file of files) {
  const filePath = path.join(rootSrc, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8");
    css += `/* === ${file} === */\n`;
    css += content;
    css += "\n\n";
  } else {
    console.warn(`⚠ Missing: ${file}`);
  }
}

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(path.join(distDir, "megon.css"), css);
console.log(
  `✓ Built: dist/megon.css (${(Buffer.byteLength(css) / 1024).toFixed(1)}KB)`,
);
