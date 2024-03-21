import { Input } from "@/components/ui/input"
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import { MenuIcon, SearchIcon, StoreIcon } from "lucide-react";


const navbarLinks = [
  {
    title: "Market",
    icon: <StoreIcon />,
    href: "/market"
  }
]



export default function Sidebar() {
  return (
    <nav>
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="p-0"><MenuIcon /></Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="mb-4">
          <div className="flex items-center space-x-2">
            <Image src="/keyboard.jpg" alt="Wildcart Logo" height={32} width={32} />
            <h2 className="text-xl font-semibold text-gray-800">WildCart</h2>
          </div>
        </SheetHeader>

          <div className="space-y-2">
          {navbarLinks.map((link) => (
            <Link
              key={link.href}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              href={link.href}
            >
              {link.icon}
              <span className="mx-4 font-medium">{link.title}</span>
            </Link>
          ))}
          </div>

          <div className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md">
            <SearchIcon className="w-5 h-5 text-gray-500" />
            <Input className="w-full mx-4" placeholder="Search" type="text" />
          </div>
      </SheetContent>
    </Sheet>
        </nav>
  )
}
