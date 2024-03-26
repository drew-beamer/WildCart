import React from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Sidebar from "./Sidebar";
import { UserNav } from "./Usernav";
import { PackageIcon, SearchIcon, ShoppingCartIcon } from "lucide-react";

function Component() {
  return (
    <>
      {/* Mobile Navbar */}
      <nav className="bg-white px-4 py-2 flex items-center justify-between md:hidden">
        <div className="block md:hidden">
          <Sidebar />
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/">
            <span className="font-bold text-lg">WILDCART</span>
          </Link>
        </div>
        <UserNav />
      </nav>

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center h-14 px-4 border-b">
        <div className="flex items-center gap-2 mr-2">
          <Link
            className="flex items-center gap-2 text-lg font-semibold"
            href="/"
          >
            <PackageIcon className="w-5 h-5" />
            WildCart
          </Link>
        </div>
        <div className="flex-1 mx-4">
          <form>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 h-5 w-5 text-gray-300 top-2/4 transform -translate-y-2.5 dark:text-gray-700" />
              <Input
                className="pl-8"
                placeholder="Search the marketplace"
                type="search"
              />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <Link href="/market">
            <Button className="h-8" variant="link">
              <ShoppingCartIcon className="w-4 h-4 mr-2" />
              Market
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <UserNav />
          </div>
        </div>
      </div>
    </>
  );
}

export default Component;
