import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {

      console.log('auth', auth);
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      console.log('isLoggedIn', isLoggedIn);
      console.log('isOnDashboard', isOnDashboard);


      return true;

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        // Redirect authenticated users to dashboard page
        console.log('Redirect authenticated users to dashboard page', nextUrl);

        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;