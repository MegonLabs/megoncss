import { describe, it, expect } from "vitest";
import { Modal, Toast, Dropdown, Tabs, Accordion } from "./index";

describe("Vanilla Components Export", () => {
  it("exports Modal as a function", () => {
    expect(Modal).toBeTypeOf("function");
  });

  it("exports Toast as a function", () => {
    expect(Toast).toBeTypeOf("function");
  });

  it("exports Dropdown as a function", () => {
    expect(Dropdown).toBeTypeOf("function");
  });

  it("exports Tabs as a function", () => {
    expect(Tabs).toBeTypeOf("function");
  });

  it("exports Accordion as a function", () => {
    expect(Accordion).toBeTypeOf("function");
  });
});
