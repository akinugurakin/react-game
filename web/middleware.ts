import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPaths = ["/dashboard", "/games"];
const authPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Client-side auth store uses localStorage, so we check for the cookie/token
  // In a real app, you'd verify the JWT server-side. For now, we rely on
  // client-side auth guards in the components. This middleware serves as
  // a basic redirect layer.

  // If user tries to access auth pages while potentially logged in,
  // let the client-side handle the redirect for now
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/games/:path*", "/login", "/register"],
};
