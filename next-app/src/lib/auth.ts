import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from "zod";
import UserSchema, {User} from '@/models/User';
import bcrypt from 'bcrypt';

async function getUser(email: string): Promise<User | undefined> {
  try {
    // Find the user by email using Mongoose's findOne method
    const user = await UserSchema.findOne({ email: email });
    
    return user; 
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({ 
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email().endsWith("@davidson.edu"), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email); {/*see getUser above */}
          if (!user) return null; 
          const passwordsMatch = await bcrypt.compare(password, user.password);
 
          if (passwordsMatch) return user;
        }
        console.log('Invalid credentials');
        return null;
      }
    }),
  ],
});