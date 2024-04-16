"use client";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { authenticateWithGoogle } from "./actions";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import * as React from "react";

export default async function Home() {
  const session = await auth();

  if (session) {
    // rendering components for logged in users
    return (
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <ListItem href="/market" title="Introduction">
                  Re-usable components built using Radix UI and Tailwind CSS.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  }

  // <div className="w-full h-screen flex flex-col justify-center items-center">
  //   <div className="w-44 h-44 relative mb-4"></div>
  {
    /* <p className="text-2xl mb-2">
          Welcome <span className="font-bold">{session.user?.name}</span>.
          Signed In As
        </p>
        <p className="font-bold mb-4">{session.user?.email}</p>
        <Button className="bg-red-600 py-2 px-6 rounded-md">Sign out</Button>
      </div> */
  }

  // rendering components for not logged in users
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <p className="text-2xl mb-2">Not Signed In</p>
      <form action={authenticateWithGoogle}>
        <Button type="submit" className="bg-blue-600 py-2 px-6 rounded-md mb-2">
          Sign in with google
        </Button>
      </form>
    </div>
  );
}
