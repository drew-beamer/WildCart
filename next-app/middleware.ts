//initialize NextAuth.js with the authConfig object and exporting the auth property.
export { auth as default } from "@/lib/auth";

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
