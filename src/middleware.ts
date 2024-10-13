/* eslint-disable @typescript-eslint/no-explicit-any */
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = cookies().get("accessToken")?.value;

  if (!accessToken) {
    //Protecting hybrid routes
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      //   return NextResponse.redirect(new URL("/login", request.url));
      return NextResponse.redirect(
        new URL(
          pathname ? `/login?redirect=${pathname}` : "/login",
          request.url
        )
      );
    }
  }

  //Role based authorization

  let decodedToken = null;

  decodedToken = jwtDecode(accessToken) as any;

  const role = decodedToken?.role;

  // /admin-dashboard - ok
  // /admin-dashboard/car-management - ok
  if (role === "admin" && pathname.match(/^\/admin-dashboard/)) {
    return NextResponse.next();
  }

  // /dashboard , /dashboard/my-requested-rides , /profile
  if (role === "user" && pathname.match(/^\/dashboard/)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url));

  //decodedToken.role
}

//!accessToken -> /login -> jete dao

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:page*",
    "/admin-dashboard/:page*",
  ],
};

//public - cars
//private - admin, driver, user
//hybrid - login, register

//middleware.ts (dashboard, admin-dashboard) -> layout.tsx -> page.tax / dashboard/page.tsx
