import { Button } from "@/components/ui/button";
// importing necessary functions
import { auth } from "@/lib/auth";
import { authenticateWithGoogle } from "./actions";


export default async function Home() {
  // extracting data from usesession as session
  const session = await auth();

  // checking if sessions exists
  if (session) {
    // rendering components for logged in users
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <div className="w-44 h-44 relative mb-4">
        </div>
        <p className="text-2xl mb-2">Welcome <span className="font-bold">{session.user?.name}</span>. Signed In As</p>
        <p className="font-bold mb-4">{session.user?.email}</p>
        <Button className="bg-red-600 py-2 px-6 rounded-md">Sign out</Button>
      </div>
    )
  }

  // rendering components for not logged in users
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
        <p className="text-2xl mb-2">Not Signed In</p>
        <form action={authenticateWithGoogle}>
          <Button type="submit" className="bg-blue-600 py-2 px-6 rounded-md mb-2">Sign in with google</Button>
        </form>
    </div>
  )

}