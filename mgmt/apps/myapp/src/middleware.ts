import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { User } from '@repo/db';

const secret = process.env.NEXTAUTH_SECRET!;

export default async function middleware(req: NextRequest) {
    //const { pathname } = req.nextUrl;
   // console.log("pathname", pathname);
   // console.log("Request Cookies:", req.cookies);

    try {
        // Use next-auth's getToken to verify the token
        const token = await getToken({ req, secret });

        if (!token) {
            console.log("No token provided");
            return NextResponse.redirect(new URL('/api/auth/signin', req.url));
        }

        console.log("Token Payload:", token);
        console.log("hi ha")
//console.log(token.sub as string)

        // Set the userId in the headers
        const response = NextResponse.next();
        response.headers.set('email', token.email as string);

        return response;

    } catch (error) {
        console.error("JWT verification failed:", error);
        return NextResponse.redirect(new URL('/api/auth/signin', req.url));
    }
}

export const config = {
    matcher: ['/api/admin/addRecipe', '/api/admin/getUserRecipe'], // Apply to protected routes
};
