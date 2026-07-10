import { describe, it, expect } from "vitest";

describe("database connection", () => {
  it("should export db client", async () => {
    const { db } = await import("@/lib/db/index");
    expect(db).toBeDefined();
  });
});
