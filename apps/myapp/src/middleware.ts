import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { User } from '@repo/db';

const secret = process.env.NEXTAUTH_SECRET!;

export default async function middleware(req: NextRequest) {
    
    try {
        // Use next-auth's getToken to verify the token
        const token = await getToken({ req, secret });
        const url = process.env.NEXTAUTH_URL!
        if (!token) {
            console.log("i am here but should not")
            // const signInUrl = new URL('/auth/signin', req.url);
            const signInUrl = new URL('/auth/signin', req.url);
            signInUrl.searchParams.set('callbackUrl', req.url);
    
            return NextResponse.redirect(new URL('/auth/signin', req.nextUrl))
        }

        console.log("Token Payload:", token);

        //console.log(token.sub as string)

        // Set the userId in the headers
        const response = NextResponse.next();
        response.headers.set('email', token.email as string);

        return response;

    } catch (error) {
        console.error("JWT verification failed:", error);
        const signInUrl = new URL('/auth/signin', req.url);
        signInUrl.searchParams.set('callbackUrl', req.url);

        return NextResponse.redirect(signInUrl)
    }
}

export const config = {
    matcher: ['/api/admin/:path*', '/api/feedback/:path*'],
}
