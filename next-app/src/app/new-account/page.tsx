import bcrypt from "bcrypt";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Validates the new account form and creates a new account.
 *
 * @param formData - new account form, containing name, email, and password
 * @returns object containing the error message, or undefined (redirect to login) if successful
 */
async function createAccount(formData: FormData) {
  "use server";
  const parsedCredentials = z
    .object({
      name: z.string(),
      email: z.string().email().endsWith("@davidson.edu"),
      password: z.string().min(6),
    })
    .safeParse({
      name: formData.get("userRegistrationName"),
      email: formData.get("userRegistrationEmail"),
      password: formData.get("userRegistrationPassword"),
    });
  if (!parsedCredentials.success) {
    return { error: parsedCredentials.error.flatten().fieldErrors };
  }
  const parsedData = parsedCredentials.data;
  const hashedPassword = bcrypt.hash(parsedData.password, 12);

  await User.create({
    name: parsedData.name,
    email: parsedData.email,
    password: await hashedPassword,
    buy_list: [],
    sell_list: [],
  }).catch((error) => {
    if (error.code === 11000) {
      return { error: "Email already in use." };
    }
  });

  await signIn("credentials", {
    email: parsedData.email,
    password: parsedData.password,
    redirectTo: "/market",
  });
}

export default async function CreateAccountPage() {
  return (
    <main className="mx-auto mt-4 max-w-xl pb-16">
      <Card>
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>
            Welcome to WildCart! Fill out the fields below to create an account
            and get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createAccount} autoComplete="off" className="space-y-4">
            <Input
              name="userRegistrationName"
              type="text"
              placeholder="Full Name"
              autoComplete="off"
              required
            />
            <Input
              name="userRegistrationEmail"
              type="email"
              placeholder="email@email.com"
              autoComplete="off"
              required
            />
            <Input
              name="userRegistrationPassword"
              type="password"
              placeholder="Password"
              minLength={6}
              required
            />
            <Button type="submit">Create Account</Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
