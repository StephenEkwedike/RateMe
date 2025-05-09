import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

/**
 * Protects all routes by default, except those listed as publicRoutes.
 */
export default clerkMiddleware({
  // Routes that are publicly accessible without authentication
  publicRoutes: ['/', '/sign-in(.*)', '/sign-up(.*)', '/feedback/:agentId*', '/thank-you'],
  async afterAuth(auth, req) {
    // Matcher to detect any /dashboard route
    const isDashboard = createRouteMatcher('/dashboard(.*)')(req);

    // 1) If user is not signed in, let Clerk redirect to /sign-in
    if (!auth.userId) {
      return;
    }

    // 2) If signed in and requesting /dashboard, check for admin role
    if (isDashboard) {
      const role = auth.session?.user?.publicMetadata?.role;
      if (role !== 'admin') {
        // Redirect non-admin users to a 403 page
        return Response.redirect(new URL('/403', req.url));
      }
    }
  },
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};