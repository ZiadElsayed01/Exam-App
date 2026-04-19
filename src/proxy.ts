import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export default async function proxy(req: NextRequest) {
  // const token = await getToken({
  //   req,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });

  // const { pathname } = req.nextUrl;

  // Define public routes that don't require authentication
  // const publicRoutes = [
  //   "/login",
  //   "/register",
  //   "/forgot-password",
  //   "/reset-password",
  //   "/verify-email",
  //   "/api/auth",
  // ];

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
