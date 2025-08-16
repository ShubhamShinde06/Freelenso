import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;

  const token = request.cookies.get("side_to_side")?.value;

  // ✅ Public paths
  const publicPaths = ["/auth", "/"];

  // ✅ Allow public access to invoice readonly URLs
 const isReadonlyInvoice =
  pathname.startsWith("/invoice/") &&
  searchParams.get("view") === "readonly"


  // ✅ If trying to access signin/signup but already authenticated
  if (publicPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ Block private pages if not logged in — except if it's readonly invoice
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));
  if (!token && !isPublic && !isReadonlyInvoice) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
