import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../prisma-client";
import { routes } from "@/shared/constants/routes";
import { getUserEmployeeById } from "@/entities/employee-user/services/get-employee-user-by";
import { setLastEnterDate } from "@/entities/user/services/set-last-enter-date";
import { generateJwt } from "../jwt/generate-jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: routes.signIn(),
    error: routes.authError(),
  },
  callbacks: {
    // first
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserEmployeeById(token.sub);
      if (!existingUser) {
        return token;
      }

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;

      return token; // токен передаётся в сессию
    },
    // second
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      if (session.user) {
        session.user.id = token.sub || "";
        session.user.name = token.name;
        session.user.email = token.email || "";

        // cringe jwt to session
        session.user.token = generateJwt({
          id: token.sub || "",
          role: token.role || "",
          email: token.email || "",
          name: token.name || "",
        });
        console.log(session.user.token);
        // </cringe jwt to session
      }

      return session;
    },
    // third, token confirmation, check email verification
    async signIn({ user, account }) {
      // allow oauth without email verification
      if (account?.provider !== "credentials") {
        return true;
      }

      if (!user.id) {
        return false;
      }
      const existingUser = await getUserEmployeeById(user.id);

      // можно проверять что аккаунт активен
      if (!existingUser?.isActive) {
        return false;
      }

      await setLastEnterDate(user.id);

      return true;
    },
  },
  events: {
    async linkAccount({ user }) {
      await prisma.employeeUser.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 1 day
    updateAge: 60 * 30, // 1 hour
  },
  ...authConfig,
});
