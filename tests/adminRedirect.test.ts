import { describe, expect, it } from "vitest";
import { safeAdminRedirect } from "../lib/adminRedirect";

describe("safeAdminRedirect", () => {
  it("keeps an inquiry detail path", () => {
    expect(safeAdminRedirect("/admin/inquiries/inquiry_123")).toBe(
      "/admin/inquiries/inquiry_123"
    );
  });

  it("falls back to the admin dashboard when no path is provided", () => {
    expect(safeAdminRedirect(null)).toBe("/admin");
  });

  it("rejects external and protocol-relative URLs", () => {
    expect(safeAdminRedirect("https://example.com/admin")).toBe("/admin");
    expect(safeAdminRedirect("//example.com/admin")).toBe("/admin");
  });

  it("rejects paths that normalize outside the admin area", () => {
    expect(safeAdminRedirect("/admin/../contact")).toBe("/admin");
    expect(safeAdminRedirect("/contact")).toBe("/admin");
  });
});
