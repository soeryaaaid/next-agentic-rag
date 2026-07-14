import { describe, it, expect, vi, beforeEach } from "vitest";

const mockDb = {
  select: vi.fn(),
  insert: vi.fn(),
};

vi.mock("@/lib/db", () => ({ db: mockDb }));

describe("admin settings service", () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    mockDb.select.mockReturnValue({
      from: vi.fn().mockResolvedValue([]),
    });
    mockDb.insert.mockReturnValue({
      values: vi.fn().mockReturnValue({
        onConflictDoUpdate: vi.fn().mockResolvedValue(undefined),
      }),
    });
  });

  it("should return default values when database is empty", async () => {
    const { getSettings, DEFAULT_SETTINGS } = await import(
      "@/lib/services/admin-settings"
    );
    const settings = await getSettings();
    expect(settings.system_prompt).toBe(DEFAULT_SETTINGS.system_prompt);
    expect(settings.assistant_model).toBe(DEFAULT_SETTINGS.assistant_model);
    expect(settings.top_k).toBe(DEFAULT_SETTINGS.top_k);
  });

  it("should override defaults with saved values", async () => {
    mockDb.select.mockReturnValue({
      from: vi.fn().mockResolvedValue([
        { key: "system_prompt", value: "You are a helpful assistant" },
        { key: "top_k", value: 10 },
      ]),
    });

    const { getSettings } = await import("@/lib/services/admin-settings");
    const settings = await getSettings();
    expect(settings.system_prompt).toBe("You are a helpful assistant");
    expect(settings.top_k).toBe(10);
  });

  it("should validate top_k accepts only 3, 5, or 10", async () => {
    const { updateSetting, VALID_TOP_K } = await import(
      "@/lib/services/admin-settings"
    );

    await expect(updateSetting("top_k", 3)).resolves.toBeDefined();
    await expect(updateSetting("top_k", 5)).resolves.toBeDefined();
    await expect(updateSetting("top_k", 10)).resolves.toBeDefined();

    await expect(updateSetting("top_k", 1)).rejects.toThrow();
    await expect(updateSetting("top_k", 7)).rejects.toThrow();
    await expect(updateSetting("top_k", 999)).rejects.toThrow();
  });

  it("should reject empty assistant model", async () => {
    const { updateSetting } = await import("@/lib/services/admin-settings");
    await expect(updateSetting("assistant_model", "")).rejects.toThrow();
    await expect(updateSetting("assistant_model", "  ")).rejects.toThrow();
  });

  it("should persist update and return the new value", async () => {
    const { updateSetting } = await import("@/lib/services/admin-settings");
    const result = await updateSetting("system_prompt", "New prompt");
    expect(result.key).toBe("system_prompt");
    expect(result.value).toBe("New prompt");
    expect(mockDb.insert).toHaveBeenCalledTimes(1);
  });

  it("should return partial defaults when only some settings exist", async () => {
    mockDb.select.mockReturnValue({
      from: vi.fn().mockResolvedValue([
        { key: "system_prompt", value: "Custom prompt" },
      ]),
    });

    const { getSettings, DEFAULT_SETTINGS } = await import(
      "@/lib/services/admin-settings"
    );
    const settings = await getSettings();
    expect(settings.system_prompt).toBe("Custom prompt");
    expect(settings.assistant_model).toBe(DEFAULT_SETTINGS.assistant_model);
    expect(settings.top_k).toBe(DEFAULT_SETTINGS.top_k);
  });
});
