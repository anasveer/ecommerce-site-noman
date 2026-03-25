import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("admin_session")?.value;

  const isDashboardRoute = pathname.startsWith("/admin/dashboard");
  const isLoginRoute = pathname.startsWith("/admin/login");

  if (isDashboardRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const payload = await verifySessionToken(token);

    if (!payload) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  if (isLoginRoute && token) {
    const payload = await verifySessionToken(token);
    if (payload) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*"],
};