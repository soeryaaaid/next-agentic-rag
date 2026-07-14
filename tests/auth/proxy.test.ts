import { describe, it, expect, vi } from "vitest";
import { NextRequest } from "next/server";

function mockRequest(path: string, cookie?: string): NextRequest {
  const url = new URL("http://localhost:3000" + path);
  return {
    nextUrl: url,
    url: url.toString(),
    headers: new Headers(cookie ? { cookie } : undefined),
    cookies: { get: vi.fn(() => null) },
  } as unknown as NextRequest;
}

describe("auth proxy", () => {
  it("should redirect to /login when no session cookie", async () => {
    const mod = await import("@/proxy");
    const req = mockRequest("/admin/dashboard");
    const res = await mod.proxy(req);
    expect(res.status).toBe(307);
    expect(res.headers.get("location")).toContain("/login");
  });

  it("should allow non-admin routes without authentication", async () => {
    const mod = await import("@/proxy");
    const req = mockRequest("/");
    const res = await mod.proxy(req);
    expect(res.status).toBe(200);
  });
});
