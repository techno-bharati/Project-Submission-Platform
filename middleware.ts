import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { betterFetch } from "@better-fetch/fetch";
import type { Session } from "@/lib/auth";

const authRoutes = ["/login"];
const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const isAuthRoute = authRoutes.some((route) => pathName.startsWith(route));
  const isAdminRoute = adminRoutes.includes(pathName);

  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    if (isAuthRoute) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAdminRoute) {
    const { data: session } = await betterFetch<Session>(
      "/api/auth/get-session",
      {
        baseURL: process.env.BETTER_AUTH_URL,
        headers: {
          //get the cookie from the request
          cookie: request.headers.get("cookie") || ""
        }
      }
    );
    if (!session || session.user.role !== "admin") {
      return NextResponse.redirect(new URL("/not-admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*", "/admin/:path*", "/login"] // Apply middleware to specific routes
};
