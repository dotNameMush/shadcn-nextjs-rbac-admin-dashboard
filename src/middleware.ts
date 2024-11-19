import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_REDIRECT_ROUTE,
  adminProtectedRoute,
  authRoutes,
  UNAUTHORIZED_REDIRECT_ROUTE,
  USER_REDIRECT_ROUTE,
  userProtectedRoutes,
} from "./routes";
import { JWT_SESSION_KEY } from "./config/constants";
import { decryptJWT, deleteSession } from "./lib/jwt";

export async function middleware(req: NextRequest) {
  const { nextUrl, cookies } = req;
  const session: string | undefined = cookies.get(JWT_SESSION_KEY)?.value;

  const isAuthRoute: boolean = authRoutes.includes(nextUrl.pathname);
  const isUserProtectedRoute: boolean = userProtectedRoutes.includes(
    nextUrl.pathname
  );
  const isAdminRoute: boolean =
    nextUrl.pathname.startsWith(adminProtectedRoute);

  if (isAuthRoute) {
    // Not Logged In
    if (!session) {
      return NextResponse.next();
    }

    // Already Logged In
    const payload = await decryptJWT(session);
    if (!payload) {
      cookies.delete(JWT_SESSION_KEY);
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL(USER_REDIRECT_ROUTE, req.url));
  }
  if (isAdminRoute) {
    if (!session) {
      return NextResponse.redirect(
        new URL(UNAUTHORIZED_REDIRECT_ROUTE, req.url)
      );
    }
    const payload = await decryptJWT(session);
    if (!payload) {
      cookies.delete(JWT_SESSION_KEY);
      return NextResponse.redirect(
        new URL(UNAUTHORIZED_REDIRECT_ROUTE, req.url)
      );
    }

    return NextResponse.next();
  }
  if (isUserProtectedRoute) {
    // Not Logged In
    if (!session) {
      return NextResponse.redirect(
        new URL(UNAUTHORIZED_REDIRECT_ROUTE, req.url)
      );
    }
    // Already Logged In
    const payload = await decryptJWT(session);
    if (!payload) {
      return NextResponse.redirect(
        new URL(UNAUTHORIZED_REDIRECT_ROUTE, req.url)
      );
    }
    return NextResponse.next();
  }
  if (isAdminRoute) {
    console.log("Admin route-руу хандаж байна");
    console.log("pathname: ", nextUrl.pathname);
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
