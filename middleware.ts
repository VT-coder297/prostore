import NextAuth from 'next-auth';
import { config as authConfig } from './auth';

// This initializes the middleware with your Auth.js settings
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  // This "matcher" tells Next.js: "Run middleware on everything
  // EXCEPT images, static files, and internal Next.js data."
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)'],
};
