import { describe, it, expect } from "vitest";
import megoncss from "./index";

describe("Vite Plugin Export", () => {
  it("exports megoncss as a function", () => {
    expect(megoncss).toBeTypeOf("function");
  });
});
