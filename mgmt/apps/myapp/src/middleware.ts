import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.NEXTAUTH_SECRET!;

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    console.log("Request Cookies:", req.cookies);

    // Exclude signin, signup, and auth routes
    if (pathname.startsWith('/api/auth') || pathname.startsWith('/api/signup') || pathname.startsWith('/api/signin')) {
        return NextResponse.next();
    }

    // Extract the token from the cookies
    const sessionTokenCookieName = '__Secure-next-auth.session-token';
    const token = req.cookies.get(sessionTokenCookieName);

    console.log("Extracted Token:", token);

    if (!token) {
        console.log("No token provided");
        return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }

    try {
        // Verify the token
        const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
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
