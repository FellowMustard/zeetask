import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";
import { db } from "./lib/db";
import { getUserById } from "./data/user";
import { get2FAConfirmationByUserId } from "./data/2faConfirmation";

const prisma = new PrismaClient();

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    error: "/auth-error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ account, user }) {
      console.log(account, user);
      if (account?.provider !== "credentials") return true;

      const existUser = await getUserById(user.id!);
      if (!existUser?.emailVerified) {
        return false;
      }

      if (existUser.is2FA) {
        const twoFAConfirmation = await get2FAConfirmationByUserId(
          existUser.id
        );
        if (!twoFAConfirmation) return false;

        await db.twoFactorConfirmation.delete({
          where: { id: twoFAConfirmation.id },
        });
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  ...authConfig,
});
