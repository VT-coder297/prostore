// auth.config.ts
import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const { pathname } = nextUrl;

      // Paths that require being logged in
      const protectedPaths = [
        '/shipping-address',
        '/payment-method',
        '/place-order',
        '/profile',
        '/user',
        '/order',
        '/admin',
      ];

      // Check if the current path starts with any of our protected strings
      const isProtected = protectedPaths.some((p) => pathname.startsWith(p));

      if (isProtected && !isLoggedIn) {
        return false; // Redirect to sign-in
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
