import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;

  const token = request.cookies.get("side_to_side")?.value;

  // ✅ Public paths (prefix matching)
  const publicPaths = ["/auth", "/"];

  const isPublicPath = publicPaths.some((path) =>
    pathname.startsWith(path)
  );

  // ✅ Allow public access to invoice readonly URLs
  const isReadonlyInvoice =
    pathname.startsWith("/invoice/") &&
    searchParams.get("view") === "readonly";

  // ✅ If trying to access any auth page but already authenticated
  if (pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ Block private pages if not logged in — except readonly invoice
  if (!token && !isPublicPath && !isReadonlyInvoice) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
