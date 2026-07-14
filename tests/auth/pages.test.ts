import { describe, it, expect } from "vitest";

describe("login page", () => {
  it("should export a valid React component", async () => {
    const mod = await import("@/app/login/page");
    expect(typeof mod.default).toBe("function");
  });
});

describe("admin page", () => {
  it("should export a valid async component", async () => {
    const mod = await import("@/app/admin/page");
    expect(typeof mod.default).toBe("function");
  });
});
