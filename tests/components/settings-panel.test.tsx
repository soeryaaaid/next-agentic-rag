// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import React from "react";

const mockFormAction = vi.fn();

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    useActionState: vi.fn(() => [null, mockFormAction, false]),
  };
});

vi.mock("@/lib/actions/admin-settings", () => ({
  updateSettingsAction: vi.fn(),
}));

describe("SettingsPanel", () => {
  beforeEach(() => {
    mockFormAction.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render all setting fields with correct labels", async () => {
    const { SettingsPanel } = await import(
      "@/components/admin/settings-panel"
    );
    render(
      React.createElement(SettingsPanel, {
        initialSettings: {
          system_prompt: "",
          assistant_model: "xiaomi/mimo-v2.5",
          top_k: 5,
        },
      }),
    );

    expect(screen.getByText("System Prompt")).toBeDefined();
    expect(screen.getByText("Assistant Model")).toBeDefined();
    expect(screen.getByText("Retrieved Contexts")).toBeDefined();
  });

  it("should display current setting values", async () => {
    const { SettingsPanel } = await import(
      "@/components/admin/settings-panel"
    );
    render(
      React.createElement(SettingsPanel, {
        initialSettings: {
          system_prompt: "You are a helpful bot",
          assistant_model: "gpt-4",
          top_k: 10,
        },
      }),
    );

    const textarea = screen.getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.value).toBe("You are a helpful bot");
  });

  it("should render a single save button", async () => {
    const { SettingsPanel } = await import(
      "@/components/admin/settings-panel"
    );
    render(
      React.createElement(SettingsPanel, {
        initialSettings: {
          system_prompt: "",
          assistant_model: "xiaomi/mimo-v2.5",
          top_k: 5,
        },
      }),
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(1);
    expect(buttons[0].textContent).toBe("Save");
  });
});
