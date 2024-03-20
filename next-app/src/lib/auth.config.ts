import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  }, //pages can specify the route for custom sign-in, sign-out, and error pages. 
  //By adding signIn: '/login' into our pages option, the user will be redirected 
  //to custom login page, rather than the NextAuth.js default page.

  callbacks: {
    authorized({ auth, request: { nextUrl } }) { //used to verify if the request is authorized to access a page via Next.js Middleware
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers later
} satisfies NextAuthConfig;