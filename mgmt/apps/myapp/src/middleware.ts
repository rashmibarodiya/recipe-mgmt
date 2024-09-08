import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = process.env.NEXTAUTH_SECRET!;

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
console.log("pathname",pathname)
    console.log("Request Cookies:", req.cookies);

    // Extract the token from the cookies
    const sessionTokenCookieName = '__Secure-next-auth.session-token';
    const tokenCookie = req.cookies.get(sessionTokenCookieName);

    if (!tokenCookie) {
        console.log("No token provided");
        return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }

    const token = tokenCookie.value; 

    try {
        // Verify the token
        const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
        console.log("Payload:", payload);

        // Attach userId to the request for further use
        req.nextUrl.searchParams.set('userId', payload.sub as string);
    } catch (error) {
        console.error("JWT verification failed:", error);
        return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/addRecipe', '/api/otherProtectedRoute'], // Apply to protected routes
};
