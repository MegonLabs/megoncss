import { describe, it, expect } from "vitest";
import plugin from "./index";

describe("PostCSS Plugin Export", () => {
  it("exports plugin as a function", () => {
    expect(plugin).toBeTypeOf("function");
  });
});
