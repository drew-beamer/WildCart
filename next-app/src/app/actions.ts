"use server";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function authenticateWithGoogle() {
    
    try {
        await signIn("google", {
            redirect: true,            
            redirectTo: "/market"
        }) ;
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    console.log("Invalid credentials");
                    return "Invalid credentials";
                default:
                    return "Something went wrong"
            }
        }
        throw error;
    }

}