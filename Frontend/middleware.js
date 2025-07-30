import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(`${process.env.NEXT_PUBLIC_TOKEN}`)?.value;

  const publicPaths = ["/auth"];

  if (publicPaths.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!publicPaths.some(path => pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|main_logo.png).*)"],
};
