import { Input } from "@/components/ui/input"


export default function Sidebar({ isOpen }: { isOpen: boolean }) {

  const sidebarClasses = `flex flex-col w-64 h-screen px-4 py-8 bg-white border-r fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`;
  return (
    <div className={sidebarClasses}>
      <div className="flex items-center">
        <img alt="Wildcart Logo" className="w-3 h-3 mr-1" src="/placeholder-avatar.jpg" />
        <h2 className="text-xl font-semibold text-gray-800">WildCart</h2>
      </div>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <a className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-md" href="#">
            <NewspaperIcon className="w-5 h-5 text-gray-500" />
            <span className="mx-4 font-medium">Discover</span>
          </a>
          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-100 hover:text-gray-700 rounded-md"
            href="#"
          >
            <ShoppingBagIcon className="w-5 h-5 text-gray-500" />
            <span className="mx-4 font-medium">Marketplace</span>
          </a>
          <a
            className="flex items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-100 hover:text-gray-700 rounded-md"
            href="#"
          >
            <MusicIcon className="w-5 h-5 text-gray-500" />
            <span className="mx-4 font-medium">Track</span>
          </a>
          <div className="flex items-center px-4 py-2 mt-5 text-gray-600 rounded-md">
            <SearchIcon className="w-5 h-5 text-gray-500" />
            <Input className="w-full mx-4" placeholder="Search" type="text" />
          </div>
        </nav>
      </div>
    </div>
  )
}

function MusicIcon(props) {
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
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  )
}


function NewspaperIcon(props) {
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
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
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


function ShoppingBagIcon(props) {
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
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}
