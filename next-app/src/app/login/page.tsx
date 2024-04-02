import LoginForm from "@/components/ui/login-form";
import { auth, signOut } from "@/lib/auth";
import { Button } from "@/components/ui/button";


export default async function LoginPage() {
  const session = await auth();
  const user = session?.user;



  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        Hi there {user?.name?.split(" ")[0] ?? "stranger"}
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36"></div>
        </div>
        <LoginForm />
        <div className="relative mx-auto flex justify-center w-full max-w-[300px] flex-col space-y-2.5 p-4 md:-mt-32">
        Don't have an account yet? 
        </div>
        <a href="/new-account">
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </a>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}>
          <Button type="submit" className="w-full">
            Sign Out
          </Button>
        </form>
      </div>
    </main>
  );
}
