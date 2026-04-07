import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Exclude static assets, api routes, and the home page itself
  if (
    pathname === '/' ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') // for images like .png, .jpg
  ) {
    return NextResponse.next();
  }

  // Redirect everything else to the landing page
  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
