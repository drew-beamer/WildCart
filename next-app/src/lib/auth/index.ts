import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";
import bcrypt from "bcrypt";
import UserSchema, { User } from "@/models/User";
import dbConnect from "../dbConnect";

async function getUser(email: string): Promise<User | null> {
  await dbConnect();
  const user = await UserSchema.findOne({ email });
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
    async session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async signIn({account, profile}) {
      if (account && profile) {
        if (account.provider === "google") {
          return (profile.email_verified as boolean) && (profile.email?.endsWith("@davidson.edu") as boolean)
        } else {
          return true
        }
      }
      return false
    }
  },
  providers: [
    Credentials({
      name: "credentials",
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            email: z.string().email().endsWith("@davidson.edu"),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          return null;
        }

        const parsedData = parsedCredentials.data;

        const user = await getUser(parsedData.email);
        if (!user) {
          return null;
        }
        const isValid = await bcrypt.compare(
          parsedData.password,
          user.password
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  })
  ],
  
} satisfies NextAuthConfig);
