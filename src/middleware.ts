import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

type user = {
  name: string;
  token: string;
  role: "user" | "admin";
};

type Role = keyof typeof roleBasedRoutes;
const AuthRoutes = ["/login", "/register"];
const roleBasedRoutes = {
  user: ["/^/profile/"],
  admin: ["/admin"],
};
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const user = {
    name: "Akhi",
    token: "sdgfvsdfsd",
    role: "user",
  };
  // const user = undefined;
  if (!user) {
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (user?.role && roleBasedRoutes[user?.role as Role]) {
    const routes = roleBasedRoutes[user?.role as Role];
    if (routes.some((route: string) => pathname.match(route))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/dashboard", "/login", "/register"],
};
