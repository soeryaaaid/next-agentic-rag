import { describe, it, expect } from "vitest";

describe("login page", () => {
  it("should render email and password inputs", async () => {
    const Page = (await import("@/app/login/page")).default;
    const { container } = await import("@testing-library/react");
    const { render } = await import("@testing-library/react");
    const el = render(Page());
    expect(el.findByLabelText(/email/i)).toBeTruthy();
    expect(el.findByLabelText(/password/i)).toBeTruthy();
  });

  it("should have a submit button", async () => {
    const Page = (await import("@/app/login/page")).default;
    const { render } = await import("@testing-library/react");
    const el = render(Page());
    expect(el.findByRole("button", { name: /sign in|login|masuk/i })).toBeTruthy();
  });
});

describe("admin page", () => {
  it("should render admin dashboard heading", async () => {
    const Page = (await import("@/app/admin/page")).default;
    const { render } = await import("@testing-library/react");
    const el = render(Page());
    expect(el.findByText(/dashboard|admin/i)).toBeTruthy();
  });
});
