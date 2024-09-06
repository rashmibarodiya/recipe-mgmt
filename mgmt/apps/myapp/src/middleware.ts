import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.NEXTAUTH_SECRET!; // Ensure this matches the secret used in NextAuth
console.log("my middleware secret "+ JWT_SECRET)




export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Skip authentication for signup and signin routes
    if (pathname.startsWith('/api/auth') || pathname.startsWith('/api/signup') || pathname.startsWith('/api/signin')) {
        return NextResponse.next();
    }

    // Extract token from cookies
   // const token = req.cookies.get('next-auth.session-token') || req.cookies.get('next-auth.csrf-token');
   console.log("*************************")
   console.log(req.cookies)
   const token = req.cookies.get('__Secure-next-auth.session-token');

 // if (!session) {
    console.log("my middleware secret "+ JWT_SECRET)
     // Adjust based on the actual cookie name
console.log(token)
    if (!token) {
        console.log("No token provided");
        return NextResponse.json({
            msg: "no token provided"
        })
        // return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }

    try {
        // Verify the token
        const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));

        // Optionally, you can attach user data to the request object or URL params
        req.nextUrl.searchParams.set('userId', payload.sub as string); // Example of attaching user ID
    } catch (error) {
        console.error("JWT verification failed:", error);
        return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*'], // Apply middleware to all API routes except those explicitly excluded
};
