import { describe, it, expect, vi } from "vitest";

describe("seed script", () => {
  it("should create admin user when no users exist", async () => {
    const mod = await import("@/lib/seed");
    await expect(mod.seed()).resolves.not.toThrow();
  });

  it("should skip when any user already exists", async () => {
    const mod = await import("@/lib/seed");
    const result = await mod.seed();
    expect(result).toBeNull();
  });
});
