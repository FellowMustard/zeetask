import authConfig from "./auth.config";
import NextAuth from "next-auth";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_CLIENT_REDIRECT,
  publicRoutes,
} from "./routes";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig)

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);
export default auth((req) => {
  const { nextUrl } = req;
  const isAuthenticated = !!req.auth;

  const isAuthAPI = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  if (isAuthAPI) return;

  if (isAuthRoutes) {
    if (isAuthenticated)
      return Response.redirect(new URL(DEFAULT_CLIENT_REDIRECT, nextUrl));
    return;
  }

  if (!isAuthenticated && !isPublicRoutes) {
    return Response.redirect(new URL("/sign-in", nextUrl));
  }

  return;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
