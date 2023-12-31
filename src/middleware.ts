import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/signup' || path === '/login' || path === '/verifyemail' || path === '/forgotpassword'
    const token = request.cookies.get('token')?.value || ""
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

}


export const config = {
    matcher: ['/', '/signup', '/login', '/profile/:path*', '/verifyemail', '/forgotpassword']
}