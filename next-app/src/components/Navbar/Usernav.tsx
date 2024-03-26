import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth, signOut } from "@/lib/auth";
import { LockIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export async function UserNav() {
  const session = await auth();

  return session?.user?.name ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{session.user.name[0]}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal mt-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <Link href="/profile" className="flex items-center">
            <UserIcon className="h-4 w-4 mr-2" /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="" />

        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <DropdownMenuItem asChild>
            <Button
              variant="ghost"
              type="submit"
              className="w-full hover:cursor-pointer flex text-left justify-start p-0 font-normal text-sm h-8"
            >
              <LockIcon className="mr-2 h-4 w-4" /> Sign Out
            </Button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link className="text-sm font-medium" href="/login">
      Login
    </Link>
  );
}
