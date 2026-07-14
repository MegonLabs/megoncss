import { describe, it, expect } from "vitest";
import {
  Button,
  Input,
  Select,
  Textarea,
  Badge,
  Alert,
  Modal,
  Toast,
  Tabs,
  Tab,
  Card,
  Field,
} from "./index";

describe("React Components Export", () => {
  it("exports Button component", () => {
    expect(Button).toBeDefined();
  });

  it("exports Input component", () => {
    expect(Input).toBeDefined();
  });

  it("exports Select component", () => {
    expect(Select).toBeDefined();
  });

  it("exports Textarea component", () => {
    expect(Textarea).toBeDefined();
  });

  it("exports Badge component", () => {
    expect(Badge).toBeDefined();
  });

  it("exports Alert component", () => {
    expect(Alert).toBeDefined();
  });

  it("exports Modal component", () => {
    expect(Modal).toBeDefined();
  });

  it("exports Toast component", () => {
    expect(Toast).toBeDefined();
  });

  it("exports Tabs component", () => {
    expect(Tabs).toBeDefined();
  });

  it("exports Tab component", () => {
    expect(Tab).toBeDefined();
  });

  it("exports Card component", () => {
    expect(Card).toBeDefined();
  });

  it("exports Field component", () => {
    expect(Field).toBeDefined();
  });
});
