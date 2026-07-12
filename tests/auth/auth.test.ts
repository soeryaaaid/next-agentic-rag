import { describe, it, expect, vi } from "vitest";

describe("better auth server", () => {
  it("should be configured with drizzle adapter for pg", async () => {
    const mod = await import("@/lib/auth");
    expect(mod.auth.options.database).toBeDefined();
  });

  it("should have email/password provider enabled", async () => {
    const mod = await import("@/lib/auth");
    expect(mod.auth.options.emailAndPassword?.enabled).toBe(true);
  });

  it("should have admin plugin for role-based access", async () => {
    const mod = await import("@/lib/auth");
    const pluginNames = mod.auth.options.plugins?.map(
      (p: { id: string }) => p.id,
    );
    expect(pluginNames).toContain("admin");
  });

  it("should reject empty credentials via signInEmail", async () => {
    const mod = await import("@/lib/auth");
    await expect(
      mod.auth.api.signInEmail({
        body: { email: "", password: "" },
        headers: new Headers(),
      }),
    ).rejects.toThrow();
  });

  it("should reject invalid email format", async () => {
    const mod = await import("@/lib/auth");
    await expect(
      mod.auth.api.signInEmail({
        body: { email: "not-an-email", password: "password123" },
        headers: new Headers(),
      }),
    ).rejects.toThrow();
  });

  it("should reject weak password (< 8 chars)", async () => {
    const mod = await import("@/lib/auth");
    await expect(
      mod.auth.api.signUpEmail({
        body: { email: "test@example.com", password: "123", name: "Test" },
        headers: new Headers(),
      }),
    ).rejects.toThrow();
  });

  it("should return null session for unauthenticated request", async () => {
    const mod = await import("@/lib/auth");
    const session = await mod.auth.api.getSession({
      headers: new Headers(),
    });
    expect(session).toBeNull();
  });
});
