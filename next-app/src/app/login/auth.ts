import NextAuth, { NextAuthConfig} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
//import { MongoDBAdapter } from "@auth/mongodb-adapter"
//import clientPromise from "@/lib/clientPromise"


export const authConfig: NextAuthConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        })
    ]
}