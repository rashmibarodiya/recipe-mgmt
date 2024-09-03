import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.SECRET!;

console.log(JWT_SECRET)

export default async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Skip authentication for signup and signin routes
    if (pathname.startsWith('/api/auth')||pathname.startsWith('/api/signup') || pathname.startsWith('/api/signin')) {
        return NextResponse.next();
    }

//     const authHeader = req.headers.get('authorization');
//     if (!authHeader) {
//         return NextResponse.json({ msg: 'No token provided hhhhhhhhhhhhhh' }, { status: 401 });
//     }

//     const token = authHeader.replace('Bearer ', '');
//     try {
//         const { payload } = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET));
//         console.log("decoded", payload);

//         // Clone the request headers and attach the user ID
//         const headers = new Headers(req.headers);
//         headers.set('user-id', payload.sub as string);

//         // Create a new NextResponse object with updated headers
//         return NextResponse.next({ request: { headers } });

//     } catch (err) {
//         console.log("middleware catch error ");
//         console.log(err);
//         return NextResponse.json({ msg: 'Invalid or expired token' }, { status: 401 });
//     }
 }

export const config = {
    matcher: ['/api/:path*'], // Apply middleware to all API routes except those explicitly excluded
};