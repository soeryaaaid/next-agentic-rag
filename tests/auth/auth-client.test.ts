import { describe, it, expect } from "vitest";

describe("auth client", () => {
  it("should expose signIn with email method", async () => {
    const mod = await import("@/lib/auth-client");
    expect(typeof mod.authClient.signIn.email).toBe("function");
  });

  it("should expose signOut method", async () => {
    const mod = await import("@/lib/auth-client");
    expect(typeof mod.authClient.signOut).toBe("function");
  });

  it("should expose useSession hook", async () => {
    const mod = await import("@/lib/auth-client");
    expect(typeof mod.authClient.useSession).toBe("function");
  });

  it("should expose admin client methods", async () => {
    const mod = await import("@/lib/auth-client");
    expect(mod.authClient.admin).toBeDefined();
    expect(typeof mod.authClient.admin.createUser).toBe("function");
    expect(typeof mod.authClient.admin.setRole).toBe("function");
  });
});
