/* eslint-disable */
import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

// extending next-auth types
declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;

      // cringe jwt to session
      token: string;
    } & DefaultSession["user"];
  }
}

import { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  interface JWT {
    role?: UserRole;
  }
}
