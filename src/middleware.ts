/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract the access token from request headers
  const accessToken = request.headers
    .get("Authorization")
    ?.replace("Bearer ", "");

  if (!accessToken) {
    // Allow access to authentication routes
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      // Redirect to login with the original path as a redirect parameter
      return NextResponse.redirect(
        new URL(
          pathname ? `/login?redirect=${pathname}` : "/login",
          request.url
        )
      );
    }
  }

  // Decode the access token to check user role
  let decodedToken: any = null;

  try {
    decodedToken = jwtDecode(accessToken); // Decode using jwt-decode
  } catch (error) {
    console.error("Token decoding failed", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = decodedToken?.role;

  // Role-based authorization
  // Allow access to admin routes
  if (role === "admin" && pathname.match(/^\/admin-dashboard/)) {
    return NextResponse.next();
  }

  // Allow access to user routes
  if (role === "user" && pathname.match(/^\/dashboard/)) {
    return NextResponse.next();
  }

  // Redirect to home page if the user does not have the necessary permissions
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: [
    // "/dashboard/:page*", // Match all dashboard sub-routes
    // "/admin-dashboard/:page*", // Match all admin dashboard sub-routes
  ],
};
