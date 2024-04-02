"use client"
import googleLogo from "../../../public/Google.jpg";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { Button } from "../ui/button"; 


export const GoogleSignInButton = () => {
  const { data: session } = useSession();
  
  if(session && session.user){
    return (
      <div className="flex gap-4 ml-auto">
      <p className="text-sky-600">{session.user.name}</p>
      <Button onClick={() => signOut()} className="text-white-600">
        Sign nout
      </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => signIn()} className="text-green-600 ml-auto">
      <Image src={googleLogo} alt="Google Logo" width={20} height={20} />
      Sign in
    </Button>
  );
}