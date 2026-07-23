const ADMIN_ORIGIN = "https://admin-redirect.local";

export function safeAdminRedirect(value: string | null | undefined): string {
  if (!value || value.startsWith("//")) return "/admin";

  try {
    const url = new URL(value, ADMIN_ORIGIN);
    const isSameOrigin = url.origin === ADMIN_ORIGIN;
    const isAdminPath =
      url.pathname === "/admin" || url.pathname.startsWith("/admin/");

    if (!isSameOrigin || !isAdminPath) return "/admin";
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return "/admin";
  }
}
