import googleLogo from "../../../public/Google.jpg";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button"; 
import { authenticateWithGoogle } from "@/app/actions";
import { auth, signOut } from "@/lib/auth";
import { KeyIcon } from "lucide-react";


export const GoogleSignInButton = async () => {
  const session = await auth();
  
  if(session && session.user){
    return (
      <div className="flex gap-4 ml-auto">
      <p className="text-sky-600">{session.user.name}</p>
      <form action={async () => {
        "use server";
        await signOut();
      }}>
      <Button className="text-white-600">
        Sign out
      </Button>
      </form>
      </div>
    );
  }

  return (
    <form action={authenticateWithGoogle}>
    <Button variant="ghost" className="text-green-600">
      <KeyIcon className="h-4 w-4 mr-1" />
      Sign in
    </Button>
    </form>
  );
}