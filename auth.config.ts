// auth.config.ts
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  providers: [], // Keep empty, we add providers in auth.ts
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/admin');
      if (isOnDashboard) {
        return isLoggedIn;
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
