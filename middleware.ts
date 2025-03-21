import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = ["/search", "/favorites"];
const publicRoutes = ["/"];

export default async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Get the session from the cookie
  const cookieStore = await cookies();
  const cookie = cookieStore.get("fetch-access-token")?.value;

  // 4. Redirect to "/"" if the user is not authenticated
  if (isProtectedRoute && !cookie) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 5. Redirect to /search if the user is authenticated
  if (isPublicRoute && cookie && !req.nextUrl.pathname.startsWith("/search")) {
    return NextResponse.redirect(new URL("/search", req.nextUrl));
  }

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
