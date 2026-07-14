import * as vscode from "vscode";

const MEGON_CLASSES = [
  // Display
  "hide",
  "show",
  "block",
  "inline",
  "inline-block",
  "inline-flex",
  "inline-grid",
  "flex",
  "grid",
  "flow-root",
  // Flex
  "flex-col",
  "flex-row",
  "flex-wrap",
  "flex-nowrap",
  "flex-1",
  "flex-auto",
  "flex-none",
  "shrink-0",
  "grow-0",
  // Align
  "items-start",
  "items-center",
  "items-end",
  "items-stretch",
  "justify-start",
  "justify-center",
  "justify-end",
  "justify-between",
  // Spacing
  "pad-0",
  "pad-2",
  "pad-4",
  "pad-6",
  "pad-8",
  "pad-10",
  "pad-12",
  "pad-16",
  "pad-20",
  "pad-24",
  "mar-0",
  "mar-2",
  "mar-4",
  "mar-6",
  "mar-8",
  "mar-auto",
  "gap-0",
  "gap-2",
  "gap-4",
  "gap-6",
  "gap-8",
  // Sizing
  "w-full",
  "w-auto",
  "w-screen",
  "w-fit",
  "h-full",
  "h-screen",
  "h-fit",
  "min-w-0",
  "min-h-0",
  "max-w-none",
  "max-h-none",
  // Typography
  "fs-12",
  "fs-14",
  "fs-16",
  "fs-18",
  "fs-20",
  "fs-24",
  "fs-32",
  "fs-48",
  "fs-64",
  "fs-72",
  "fs-96",
  "fw-300",
  "fw-400",
  "fw-500",
  "fw-600",
  "fw-700",
  "fw-800",
  "ta-left",
  "ta-center",
  "ta-right",
  "italic",
  "not-italic",
  "truncate",
  "line-clamp-1",
  "line-clamp-2",
  "line-clamp-3",
  // Colors
  "bg-white",
  "bg-black",
  "bg-gray",
  "bg-blue",
  "bg-green",
  "bg-red",
  "text-white",
  "text-black",
  "text-gray",
  "text-blue",
  "text-green",
  "text-red",
  "border-white",
  "border-black",
  "border-gray",
  "border-blue",
  "border-green",
  "border-red",
  // Effects
  "round-none",
  "round-sm",
  "round-md",
  "round-lg",
  "round-full",
  "shadow-sm",
  "shadow-md",
  "shadow-lg",
  "shadow-xl",
  "shadow-2xl",
  "opacity-0",
  "opacity-50",
  "opacity-75",
  "opacity-100",
  // Transforms
  "scale-95",
  "scale-100",
  "scale-105",
  "rotate-0",
  "rotate-45",
  "rotate-90",
  "rotate-180",
  // Transitions
  "transition",
  "transition-colors",
  "transition-opacity",
  "transition-shadow",
  "duration-150",
  "duration-200",
  "duration-300",
  "duration-500",
  "ease-in",
  "ease-out",
  "ease-in-out",
  // Position
  "relative",
  "absolute",
  "fixed",
  "sticky",
  "static",
  "z-0",
  "z-10",
  "z-20",
  "z-30",
  "z-40",
  "z-50",
  // Overflow
  "overflow-hidden",
  "overflow-auto",
  "overflow-scroll",
  // Cursor
  "cursor-pointer",
  "cursor-default",
  "cursor-not-allowed",
  // Variants
  "hover:bg-blue",
  "hover:bg-green",
  "hover:bg-red",
  "hover:text-blue",
  "focus:bg-blue",
  "focus:ring-2",
  "active:scale-95",
  "dark:bg-gray",
  "dark:text-white",
  "dark:border-gray",
  "sm:pad-4",
  "md:pad-6",
  "lg:pad-8",
  "xl:pad-12",
  // Components
  "btn",
  "btn-primary",
  "btn-secondary",
  "btn-outline",
  "btn-ghost",
  "btn-danger",
  "modal-overlay",
  "modal-content",
  "modal-header",
  "modal-body",
  "modal-footer",
  "toast",
  "toast-success",
  "toast-error",
  "toast-warning",
  "toast-info",
  "badge",
  "badge-blue",
  "badge-green",
  "badge-red",
  "badge-yellow",
  "alert",
  "alert-error",
  "alert-success",
  "alert-warning",
  "alert-info",
  "input",
  "input-sm",
  "input-lg",
  "select",
  "textarea",
  "megon-table",
  "megon-table-striped",
  "megon-table-hover",
];

function sortClasses(classString: string): string {
  const order = [
    "layout",
    "display",
    "flex",
    "grid",
    "position",
    "spacing",
    "sizing",
    "typography",
    "colors",
    "borders",
    "effects",
    "transitions",
    "variants",
  ];

  const groups: Record<string, string[]> = {};
  const classes = classString.split(/\s+/).filter(Boolean);

  for (const cls of classes) {
    let group = "other";

    if (/^(hide|show|block|inline|flex|grid|flow-root)/.test(cls))
      group = "display";
    else if (
      /^(relative|absolute|fixed|sticky|static|z-|inset|top|right|bottom|left)/.test(
        cls,
      )
    )
      group = "position";
    else if (
      /^(col-|row-|basis-|grow|shrink|justify|items|self|content-|place-|order)/.test(
        cls,
      )
    )
      group = "flex";
    else if (/^(grid|gap)/.test(cls)) group = "grid";
    else if (/^(pad|mar|space)/.test(cls)) group = "spacing";
    else if (/^(w-|h-|min-|max-|aspect)/.test(cls)) group = "sizing";
    else if (
      /^(fs-|fw-|lh-|ta-|tt-|td-|ls-|text-|font-|italic|truncate|line-clamp)/.test(
        cls,
      )
    )
      group = "typography";
    else if (/^(bg-|text-|border-color)/.test(cls)) group = "colors";
    else if (/^(border-|round-|ring-|divide)/.test(cls)) group = "borders";
    else if (/^(shadow-|opacity-|blur-|filter)/.test(cls)) group = "effects";
    else if (/^(transition|duration|ease|delay)/.test(cls))
      group = "transitions";
    else if (
      /^(hover:|focus:|active:|disabled:|dark:|sm:|md:|lg:|xl:|2xl:)/.test(cls)
    )
      group = "variants";

    if (!groups[group]) groups[group] = [];
    groups[group].push(cls);
  }

  return order
    .filter((g) => groups[g])
    .map((g) => groups[g].join(" "))
    .join(" ");
}

function getCompletionItems(): vscode.CompletionItem[] {
  return MEGON_CLASSES.map((cls) => {
    const item = new vscode.CompletionItem(
      cls,
      vscode.CompletionItemKind.Value,
    );
    item.detail = `MegonCSS: ${cls}`;
    item.documentation = new vscode.MarkdownString(
      `Apply \`${cls}\` utility class`,
    );
    return item;
  });
}

function validateClasses(text: string): vscode.Diagnostic[] {
  const diagnostics: vscode.Diagnostic[] = [];
  const classRegex = /class(?:Name)?=["']([^"']+)["']/g;
  let match;

  while ((match = classRegex.exec(text)) !== null) {
    const classes = match[1].split(/\s+/).filter(Boolean);
    for (const cls of classes) {
      // Strip variant prefix for validation
      const baseClass = cls.replace(
        /^(hover|focus|active|disabled|dark|sm|md|lg|xl|2xl):/,
        "",
      );
      if (!MEGON_CLASSES.includes(baseClass) && !MEGON_CLASSES.includes(cls)) {
        const startIdx = match.index + match[0].indexOf(cls);
        const range = new vscode.Range(0, startIdx, 0, startIdx + cls.length);
        diagnostics.push(
          new vscode.Diagnostic(
            range,
            `Unknown MegonCSS class: ${cls}`,
            vscode.DiagnosticSeverity.Warning,
          ),
        );
      }
    }
  }

  return diagnostics;
}

export function activate(context: vscode.ExtensionContext) {
  // Autocomplete provider
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    ["html", "tsx", "jsx", "vue", "svelte"],
    {
      provideCompletionItems(
        document: vscode.TextDocument,
        position: vscode.Position,
      ) {
        const lineText = document.lineAt(position).text;
        const classAttrMatch = lineText.match(/class(?:Name)?=["']([^"']*)$/);
        if (classAttrMatch || lineText.includes("class")) {
          return getCompletionItems();
        }
        return [];
      },
    },
    '"',
    "'",
    " ",
  );

  // Hover provider for documentation
  const hoverProvider = vscode.languages.registerHoverProvider(
    ["html", "tsx", "jsx", "vue", "svelte"],
    {
      provideHover(document: vscode.TextDocument, position: vscode.Position) {
        const word = document.getWordRangeAtPosition(position, /[\w-:]+/);
        if (!word) return null;

        const text = document.getText(word);
        if (MEGON_CLASSES.includes(text)) {
          return new vscode.Hover(
            new vscode.MarkdownString(`**MegonCSS**: \`${text}\``),
          );
        }
        return null;
      },
    },
  );

  // Sort classes command
  const sortCommand = vscode.commands.registerCommand(
    "megoncss.sortClasses",
    () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const document = editor.document;
      const classRegex = /class(?:Name)?=["']([^"']+)["']/g;
      const fullText = document.getText();
      const edits: vscode.TextEdit[] = [];

      let match;
      while ((match = classRegex.exec(fullText)) !== null) {
        const sorted = sortClasses(match[1]);
        const startPos = document.positionAt(
          match.index + match[0].indexOf(match[1]),
        );
        const endPos = document.positionAt(
          match.index + match[0].indexOf(match[1]) + match[1].length,
        );
        edits.push(
          vscode.TextEdit.replace(new vscode.Range(startPos, endPos), sorted),
        );
      }

      if (edits.length > 0) {
        editor.edit((editBuilder) => {
          edits.forEach((edit) =>
            editBuilder.replace(edit.range, edit.newText),
          );
        });
      }
    },
  );

  // Validate classes on save
  const diagnosticCollection =
    vscode.languages.createDiagnosticCollection("megoncss");

  const validateOnSave = vscode.workspace.onDidSaveTextDocument((document) => {
    const diagnostics = validateClasses(document.getText());
    diagnosticCollection.set(document.uri, diagnostics);
  });

  context.subscriptions.push(
    completionProvider,
    hoverProvider,
    sortCommand,
    validateOnSave,
    diagnosticCollection,
  );
}

export function deactivate() {}
