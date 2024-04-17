import NextAuth, { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "../dbConnect";
import UserSchema, { User } from "@/models/User";

async function getUser(id: string): Promise<User | null> {
  await dbConnect();
  const user = await UserSchema.findById(id);
  if (!user) {
    return null;
  }
  return user;
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token, profile, account }) {
      if (profile) {
        token.sub = profile.sub as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async signIn({ account, profile }) {
      if (account && profile) {
        if (account.provider === "google") {
          if (
            profile.email_verified &&
            profile.email?.endsWith("@davidson.edu")
          ) {
            const userId = profile.sub as string;
            await dbConnect();
            const user = await getUser(userId);
            if (!user) {
              await new UserSchema({
                _id: userId,
                name: profile.name as string,
                email: profile.email as string,
                score: 0,
                buy_list: [],
                sell_list: [],
              }).save();
            } else {
              // Update user's name and email if they have changed
              if (user.name !== profile.name) {
                user.name = profile.name as string;
                await user.save();
              }
              if (user.email !== profile.email) {
                user.email = profile.email as string;
                await user.save();
              }
            }
            return true;
          }
        } else {
          return true;
        }
      }
      return false;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
} satisfies NextAuthConfig);
