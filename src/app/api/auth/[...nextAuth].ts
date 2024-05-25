import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '../../../lib/prisma';

export default NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
