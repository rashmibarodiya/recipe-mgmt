import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@repo/db";
import {connect} from "@repo/db/lib/dbConnect"
import { Console } from "console";

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
        email: { label: "Email", type: "text", placeholder: "email" }
      },
      async authorize(credentials) {
        await connect();
        console.log("#########################################################################33")
        console.log("Authorize function called");

        if (!credentials) {
          console.log("No credentials provided");
          return null;
        }
        console.log("Credentials:", credentials);
        const { username, password,email } = credentials;
        console.log("Credentials received:", { username, password,email});

        try {
          const user = await User.findOne({ username });

          if (user && password == user.password) { // Use bcrypt for password comparison
            console.log("Authentication successful");
            console.log(user.username)
            return { id: user._id.toString(), email: user.email, name: user.username };
          }
          if(!user){
            const newUser = new User({
              username,password,email
            });
            await newUser.save();
            console.log("New user created in the database:", newUser);
            return { id: newUser._id.toString(), email: newUser.email, name: newUser.username };
          }

         else{
          console.log("Invalid credentials");
          return null;
         }
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Ensure this is the correct path to your custom sign-in page
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await connect()
      console.log("Sign In callback called");
      
      if (!account) {
        console.log("no account found")
        return false
      }
      if (account.provider === 'google') {
        try {
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const newUser = new User({
              email: user.email,
              username: user.name,
            });
            await newUser.save();
            console.log("New user created in the database:", newUser);
          } else {
            console.log("User already exists in the database:", existingUser);
          }

          return true;
        } catch (error) {
          console.error("Error during user sign-in:", error);
          return false;
        }
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      
      console.log("Redirect callback called with base URL:", baseUrl);
      console.log(process.env.NEXTAUTH_SECRET??"")
      return baseUrl;
    },
    async jwt({ token, user,account }) {
      console.log("JWT callback called");
      console.log("User:", user);
      console.log("Token:", token);
      console.log("Account: ",account)
    
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      console.log("Token:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback called");
      console.log("Session:", session);
      console.log("Token:", token);
    
      // Ensure that user data is included in session
      if (token) {
        session.user = {
          name: token.name || "",
          email: token.email || "",
        };
      }
    
      return session;
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
