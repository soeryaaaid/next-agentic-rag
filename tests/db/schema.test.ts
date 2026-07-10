import { describe, it, expect } from "vitest";

describe("database schema", () => {
  it("should export users table schema", async () => {
    const { users } = await import("@/lib/db/schema");
    expect(users).toBeDefined();
  });

  it("should export knowledgeBases table schema", async () => {
    const { knowledgeBases } = await import("@/lib/db/schema");
    expect(knowledgeBases).toBeDefined();
  });

  it("should export adminSettings table schema", async () => {
    const { adminSettings } = await import("@/lib/db/schema");
    expect(adminSettings).toBeDefined();
  });
});
