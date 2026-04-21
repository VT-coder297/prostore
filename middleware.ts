// middleware.ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req: NextRequest & { auth: any }) => {
  const { nextUrl, cookies } = req;
  const res = NextResponse.next();

  // 🛒 CART COOKIE LOGIC
  if (!cookies.get('sessionCartId')) {
    const sessionCartId = crypto.randomUUID();
    res.cookies.set('sessionCartId', sessionCartId);
  }

  return res;
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api, _next/static, _next/image, favicon.ico, sitemap.xml, robots.txt
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
