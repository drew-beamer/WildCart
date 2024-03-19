"use client"

import React, { useState } from 'react';
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import Sidebar from './Sidebar';

function Component() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="bg-white px-4 py-2 flex items-center justify-between md:hidden">
        <MenuIcon className="text-black" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex items-center space-x-2">
          <DiamondIcon className="text-black" />
          <span className="font-bold text-lg">WILDCART</span>
        </div>
        <Avatar>
          <AvatarImage alt="@shadcn" src="/placeholder-avatar.jpg" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </nav>

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center h-14 px-4 border-b">
        <div className="flex items-center gap-2 mr-2">
          <Link className="flex items-center gap-2 text-lg font-semibold" href="#">
            <PackageIcon className="w-5 h-5" />
            WildCart
          </Link>
        </div>
        <div className="flex-1 mx-4">
          <form>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 h-5 w-5 text-gray-300 top-2/4 transform -translate-y-2.5 dark:text-gray-700" />
              <Input className="pl-8" placeholder="Search the marketplace" type="search" />
            </div>
          </form>
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <Button className="h-8" variant="outline">
            <ShoppingCartIcon className="w-4 h-4" />
            Marketplace
          </Button>
          <Button className="h-8" variant="outline">
            <PackageIcon className="w-4 h-4" />
            My Packages
          </Button>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <Button className="h-8" variant="outline">
              <ChevronDownIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} />
    </>
  );
}

export default Component;

function DiamondIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
      </svg>
    )
  }
  
  
  function MenuIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="4" x2="15" y1="12" y2="12" />
        <line x1="4" x2="20" y1="6" y2="6" />
        <line x1="4" x2="20" y1="18" y2="18" />
      </svg>
    )
  }
  function ChevronDownIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    )
  }
  
  
  function PackageIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m7.5 4.27 9 5.15" />
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    )
  }
  
  
  function SearchIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    )
  }
  
  
  function ShoppingCartIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="21" r="1" />
        <circle cx="19" cy="21" r="1" />
        <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
      </svg>
    )
  }
