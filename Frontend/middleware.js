// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const { pathname, searchParams } = request.nextUrl;
//   const token = request.cookies.get(process.env.NEXT_PUBLIC_TOKEN)?.value;

//   const publicPaths = ["/auth", "/"];

//   const isReadonlyInvoice =
//   pathname.startsWith("/invoice/") &&
//   searchParams.get("view") === "readonly"
  
//   // If logged in and tries to access public auth page → redirect to dashboard
//   if (publicPaths.some(path => pathname.startsWith(path)) && token) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }

//   // If not logged in and tries to access a protected page → redirect to login
//   const isPublic = publicPaths.some(path => pathname.startsWith(path)) || pathname === "/";
//   if (!isPublic && !token && !isReadonlyInvoice) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/((?!_next|api|favicon.ico|main_logo.png).*)",
//   ],
// };

import { NextResponse } from "next/server";

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;

  const tokenName = process.env.NEXT_PUBLIC_TOKEN || "side_to_side"; // fallback cookie name
  const token = request.cookies.get(tokenName)?.value;

  const publicPaths = ["/auth", "/"];
  const isReadonlyInvoice =
    pathname.startsWith("/invoice/") &&
    searchParams.get("view") === "readonly";

  // Redirect logged-in users away from public pages
  if (publicPaths.some(path => pathname.startsWith(path)) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect guests away from private pages (unless readonly invoice)
  if (
    !publicPaths.some(path => pathname.startsWith(path)) &&
    !token &&
    !isReadonlyInvoice
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|main_logo.png).*)"],
};


