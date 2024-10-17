import NextAuth, { NextAuthOptions, User as NextAuthUser, Account, Profile, Session } from "next-auth";
import { JWT } from "next-auth/jwt";  
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@repo/db";
import { connect } from "@repo/db/lib/dbConnect";

const authOptions: NextAuthOptions = {
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
        email: { label: "Email", type: "text", placeholder: "email" },
      },
      async authorize(credentials) {
        await connect();
        console.log("Authorize function called");

        if (!credentials) {
          console.log("No credentials provided");
          return null;
        }

        const { username, password, email } = credentials;
        try {
          const user = await User.findOne({ email });

          if (user && password === user.password) {
            console.log("Authentication successful");
            return { id: user._id.toString(), email: user.email, name: user.username };
          } else if (!user) {
            const newUser = new User({ username, password, email });
            await newUser.save();
            console.log("New user created:", newUser);
            return { id: newUser._id.toString(), email: newUser.email, name: newUser.username };
          } else {
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
    signIn: "/auth/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }: { user: NextAuthUser; account: Account | null; profile?: Profile }) {
      await connect();
      console.log("Sign In callback called");
  
      if (!account) {
        console.log("Account is null");
        return false;
      }
  
      if (account.provider === "google") {
        try {
          const existingUser = await User.findOne({ email: user.email });
          console.log("existing user",existingUser)
          if (!existingUser) {
            const newUser = new User({ email: user.email, username: user.email?.split("@")[0] });
            await newUser.save();
            console.log("New user created:", newUser);
          }
          return true;
        } catch (error) {
          console.error("Error during sign-in:", error);
          return false;
        }
      }
  
      return true;
    },
    async redirect({ url, baseUrl }) {
      console.log("redirect url ",baseUrl)

      return baseUrl;
    },  
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
     
      if (token) {

        session.user = { name: token.name || "", email: token.email || "" };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET ?? "",
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
