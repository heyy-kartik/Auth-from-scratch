import { request } from 'http'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
     const path = request.nextUrl.pathname
  
 const token = request.cookies.get('token')?.value || ""
  const isPublicpath = path === "/login" || path === "/signup" || path === "/verifyemail"
  console.log("Middleware check for path:", request.nextUrl.pathname, "Token:", token)

  if (!token && !isPublicpath) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL('/', request.url))
  }
  if(isPublicpath && token) {
    console.log("Token found on public path, redirecting to profile");
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher:  [ '/',
    '/profile',
    '/login',
    '/signup',
    '/verifyemail'
  ]
}