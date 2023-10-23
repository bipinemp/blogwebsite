import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "./clientPromise";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },

  callbacks: {
    // We can pass in additional information from the user document MongoDB returns
    async jwt({ token, user }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: user.name,
          image: user.image,
          createdAt: user.createdAt,
        };
      }
      return token;
    },
    redirect() {
      return "https://writz.vercel.app/api/auth/callback/google";
    },
    // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
        session.user.createdAt = token.user.createdAt;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
