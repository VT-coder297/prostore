import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { NextResponse } from 'next/server';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl, cookies, auth: session } = req;
  const isLoggedIn = !!session;

  const protectedPaths = [
    /\/shipping-address/,
    /\/payment-method/,
    /\/place-order/,
    /\/profile/,
    /\/user\/(.*)/,
    /\/order\/(.*)/,
    /\/admin/,
  ];

  const isProtected = protectedPaths.some((p) => p.test(nextUrl.pathname));

  // 🛡️ MANUAL REDIRECT (The Fix)
  // If the path is protected and the user is NOT logged in,
  // we manually construct a redirect to the sign-in page.
  if (isProtected && !isLoggedIn) {
    const signInUrl = new URL('/sign-in', nextUrl.origin);
    // This tells the user where to return after logging in
    signInUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // 🛒 THE CART LOGIC (Runs if authorized)
  const res = NextResponse.next();
  if (!cookies.get('sessionCartId')) {
    const sessionCartId = crypto.randomUUID();
    res.cookies.set('sessionCartId', sessionCartId);
  }

  return res;
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
