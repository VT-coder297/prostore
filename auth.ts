// auth.ts
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';
import { authConfig } from './auth.config'; // Import the shared config

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // Use the shared settings
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password,
          );
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks, // Include shared callbacks
    async session({ session, token }: any) {
      if (token.sub) session.user.id = token.sub;
      if (token.role) session.user.role = token.role;
      session.user.name = session.user.name || 'Guest'; // Ensure name is always set

      return session;
    },

    async jwt({ token, user, trigger, session }: any) {
      // Assign user fields to the token
      if (user) {
        token.role = user.role;

        // if user has no name, assign email as name
        if (user.name === 'NO_NAME') {
          // If email is missing, it will use 'Guest' instead of crashing
          token.name = user.email?.split('@')[0] || 'Guest';

          // Update the user in the database to have a name
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }
      return token;
    },
  },
});
