// middleware.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Use the light version

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
