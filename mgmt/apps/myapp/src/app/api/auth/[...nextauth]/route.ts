import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";

interface User {
  id: string;
  email: string;
  name?: string;
}

//google credential from google cloud

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "username" },
        password: { label: "Password", type: "password" },
        email : {label: "Email", type : "text", placeholder:"email"}
      },
      async authorize(credentials) {
        console.log("Authorize function called");

        if (!credentials) {
          console.log("No credentials provided");
          return null;
        }

        const { username, password } = credentials;
        console.log("Credentials received:", { username, password });

        console.log("Authentication successful");
        return { id: "1", email: username };
      },
    }),
  ],
  pages:{
    signIn:'auth/signin'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("Sign In callback called");
      return true;
    },
    async redirect({ url, baseUrl }) {
//base url will be retrieved from .env so please define base url as NEXTAUTH_URL in .env with base url of your project
      console.log("Redirect callback called " +baseUrl); 
      return baseUrl;
    },
    async session({ session, user, token }) {
      console.log("Session callback called");
      return session;
    },
    async jwt({ token, user, account, profile }) {
      console.log("JWT callback called");
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? "",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };