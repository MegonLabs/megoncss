#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { classesData, componentsData, examplesData } from "./data.js";

const server = new McpServer({
  name: "megoncss-mcp",
  version: "0.1.0",
});

server.tool(
  "search_class",
  {
    query: z
      .string()
      .describe(
        "Search query for CSS classes (e.g., 'padding', 'flex', 'color')",
      ),
    category: z
      .string()
      .optional()
      .describe(
        "Filter by category (spacing, typography, colors, layout, flexbox, grid, effects, components)",
      ),
  },
  async ({ query, category }) => {
    const results: any[] = [];
    const queryLower = query.toLowerCase();

    for (const [groupName, group] of Object.entries(classesData.classes)) {
      for (const [className, classInfo] of Object.entries(group as any)) {
        const info = classInfo as any;
        const matchesQuery =
          className.toLowerCase().includes(queryLower) ||
          (info.description &&
            info.description.toLowerCase().includes(queryLower)) ||
          (info.example && info.example.toLowerCase().includes(queryLower));

        const matchesCategory =
          !category || (info.categories && info.categories.includes(category));

        if (matchesQuery && matchesCategory) {
          results.push({
            class: className,
            pattern: info.pattern || null,
            description: info.description,
            example: info.example,
            categories: info.categories,
          });
        }
      }
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              query,
              category: category || "all",
              count: results.length,
              classes: results.slice(0, 20),
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

server.tool(
  "search_component",
  {
    name: z
      .string()
      .describe("Component name to search (e.g., 'button', 'card', 'modal')"),
  },
  async ({ name }) => {
    const nameLower = name.toLowerCase();
    const component = (componentsData.components as Record<string, any>)[
      nameLower
    ];

    if (!component) {
      const available = Object.keys(componentsData.components);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                error: `Component '${name}' not found`,
                available_components: available,
              },
              null,
              2,
            ),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              name: component.name,
              description: component.description,
              classes: component.classes,
              example: component.example,
              usage: component.usage,
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

server.tool(
  "get_docs",
  {
    topic: z
      .string()
      .describe(
        "Documentation topic (e.g., 'button', 'spacing', 'grid', 'colors')",
      ),
  },
  async ({ topic }) => {
    const topicLower = topic.toLowerCase();
    let markdown = `# MegonCSS Documentation: ${topic}\n\n`;

    const component = (componentsData.components as Record<string, any>)[
      topicLower
    ];
    if (component) {
      markdown += `## ${component.name}\n\n`;
      markdown += `${component.description}\n\n`;
      markdown += `**Usage:** ${component.usage}\n\n`;
      markdown += `### Classes\n\n`;
      if (component.classes.base) {
        markdown += `- Base: \`${component.classes.base}\`\n`;
      }
      if (component.classes.variants) {
        for (const [variant, cls] of Object.entries(
          component.classes.variants,
        )) {
          markdown += `- ${variant}: \`${cls}\`\n`;
        }
      }
      if (component.classes.sizes) {
        for (const [size, cls] of Object.entries(component.classes.sizes)) {
          markdown += `- ${size}: \`${cls}\`\n`;
        }
      }
      markdown += `\n### Example\n\n\`\`\`html\n${component.example}\n\`\`\`\n\n`;
    }

    const matchingClasses: any[] = [];
    for (const [groupName, group] of Object.entries(classesData.classes)) {
      for (const [className, classInfo] of Object.entries(group as any)) {
        const info = classInfo as any;
        if (
          groupName.toLowerCase().includes(topicLower) ||
          className.toLowerCase().includes(topicLower) ||
          (info.categories &&
            info.categories.some((c: string) => c.includes(topicLower)))
        ) {
          matchingClasses.push({
            class: className,
            description: info.description,
            example: info.example,
          });
        }
      }
    }

    if (matchingClasses.length > 0) {
      markdown += `## Related Classes\n\n`;
      for (const cls of matchingClasses.slice(0, 15)) {
        markdown += `- \`${cls.class}\` - ${cls.description}\n`;
        if (cls.example) {
          markdown += `  Example: \`${cls.example}\`\n`;
        }
      }
      markdown += `\n`;
    }

    const matchingExamples: any[] = [];
    for (const [exampleName, exampleInfo] of Object.entries(
      examplesData.examples,
    )) {
      const info = exampleInfo as any;
      if (
        exampleName.toLowerCase().includes(topicLower) ||
        (info.classes_used &&
          info.classes_used.some((c: string) =>
            c.toLowerCase().includes(topicLower),
          ))
      ) {
        matchingExamples.push({
          name: info.name,
          description: info.description,
          category: info.category,
          html: info.html,
        });
      }
    }

    if (matchingExamples.length > 0) {
      markdown += `## Examples\n\n`;
      for (const example of matchingExamples.slice(0, 3)) {
        markdown += `### ${example.name}\n\n`;
        markdown += `${example.description}\n\n`;
        markdown += `\`\`\`html\n${example.html}\n\`\`\`\n\n`;
      }
    }

    return {
      content: [
        {
          type: "text",
          text: markdown,
        },
      ],
    };
  },
);

server.tool(
  "list_components",
  {
    category: z.string().optional().describe("Filter by category"),
  },
  async ({ category }) => {
    const components: any[] = [];

    for (const [name, info] of Object.entries(
      componentsData.components as Record<string, any>,
    )) {
      const component = info as any;
      components.push({
        name: component.name,
        description: component.description,
        usage: component.usage,
      });
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              total: components.length,
              components: components,
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

server.tool(
  "get_example",
  {
    name: z
      .string()
      .describe(
        "Example name (e.g., 'login-form', 'navbar', 'pricing-section')",
      ),
  },
  async ({ name }) => {
    const nameLower = name.toLowerCase().replace(/\s+/g, "-");
    const example = (examplesData.examples as Record<string, any>)[nameLower];

    if (!example) {
      const available = Object.keys(examplesData.examples);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                error: `Example '${name}' not found`,
                available_examples: available,
              },
              null,
              2,
            ),
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              name: example.name,
              description: example.description,
              category: example.category,
              html: example.html,
              classes_used: example.classes_used,
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

server.tool(
  "generate_ui",
  {
    type: z
      .string()
      .describe(
        "UI component type (e.g., 'login-form', 'pricing-section', 'navbar')",
      ),
  },
  async ({ type }) => {
    const typeLower = type.toLowerCase().replace(/\s+/g, "-");
    const example = (examplesData.examples as Record<string, any>)[typeLower];

    if (example) {
      return {
        content: [
          {
            type: "text",
            text: `# ${example.name}\n\n${example.description}\n\n\`\`\`html\n${example.html}\n\`\`\`\n\n## Classes Used\n\n${example.classes_used.map((c: string) => `- \`${c}\``).join("\n")}`,
          },
        ],
      };
    }

    const templates: Record<string, string> = {
      hero: `<section class="flex flex-col items-center justify-center" style="min-height: 60vh;">
  <h1 class="fs-48 fw-700 ta-center mar-b-16">Your Title Here</h1>
  <p class="fs-20 ta-center mar-b-32" style="max-width: 600px;">Your description here</p>
  <div class="flex gap-16">
    <button class="btn btn-primary">Get Started</button>
    <button class="btn btn-ghost">Learn More</button>
  </div>
</section>`,
      footer: `<footer class="bg-black text-white pad-y-48">
  <div class="grid grid-4 gap-24" style="max-width: 1024px; margin: 0 auto;">
    <div>
      <h4 class="fs-16 fw-600 mar-b-16">Company</h4>
      <div class="flex flex-col gap-8">
        <a href="#">About</a>
        <a href="#">Careers</a>
        <a href="#">Contact</a>
      </div>
    </div>
    <div>
      <h4 class="fs-16 fw-600 mar-b-16">Product</h4>
      <div class="flex flex-col gap-8">
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">Docs</a>
      </div>
    </div>
  </div>
</footer>`,
      form: `<form class="flex flex-col gap-16" style="max-width: 400px;">
  <div class="field">
    <label class="field-label">Name</label>
    <input class="input" type="text" placeholder="Enter your name">
  </div>
  <div class="field">
    <label class="field-label">Email</label>
    <input class="input" type="email" placeholder="you@example.com">
  </div>
  <button class="btn btn-primary w-full">Submit</button>
</form>`,
      "card-grid": `<div class="grid grid-3 gap-24">
  <div class="card">
    <div class="card-body">
      <h3 class="fs-18 fw-600 mar-b-8">Card 1</h3>
      <p class="text-gray">Description text here</p>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h3 class="fs-18 fw-600 mar-b-8">Card 2</h3>
      <p class="text-gray">Description text here</p>
    </div>
  </div>
  <div class="card">
    <div class="card-body">
      <h3 class="fs-18 fw-600 mar-b-8">Card 3</h3>
      <p class="text-gray">Description text here</p>
    </div>
  </div>
</div>`,
    };

    const template = templates[typeLower];

    if (template) {
      return {
        content: [
          {
            type: "text",
            text: `# Generated ${type}\n\n\`\`\`html\n${template}\n\`\`\``,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              error: `No template found for '${type}'`,
              available_types: [
                "hero",
                "footer",
                "form",
                "card-grid",
                "login-form",
                "navbar",
                "pricing-section",
              ],
              tip: "Use get_docs(topic) for detailed documentation or get_example(name) for pre-built examples",
            },
            null,
            2,
          ),
        },
      ],
    };
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MegonCSS MCP Server running on stdio");
}

main().catch(console.error);
