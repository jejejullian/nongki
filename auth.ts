import NextAuth, {type DefaultSession} from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

declare module "next-auth"{
  interface Session{
    user: {
      role?: string
    } & DefaultSession['user']
  }

  interface User{
    role?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],

  callbacks:{
    session({session, user}){
      session.user.role = user.role
      return session
    }
  }
});
