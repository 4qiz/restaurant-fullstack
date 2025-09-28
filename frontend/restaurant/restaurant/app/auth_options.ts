import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare, hashSync } from "bcrypt";
import { UserRole } from "@prisma/client";
import GoogleProvider from "next-auth/providers/google";
import { generateJwt } from "@/shared/lib/jwt/generateJwt";
import YandexProvider from "next-auth/providers/yandex";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 day
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    YandexProvider({
      clientId: process.env.YANDEX_ID || "",
      clientSecret: process.env.YANDEX_SECRET || "",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.first_name || profile.login,
          email: profile.default_email || null,
          image: null,
          role: UserRole.USER,
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: UserRole.USER,
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "E-Mail", type: "text", placeholder: "user@test.ru" },
        password: { label: "Пароль", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const values = {
          email: credentials.email,
        };

        const findUser = await prisma.user.findFirst({
          where: values,
        });

        if (!findUser) return null;

        const isPasswordValid = await compare(
          credentials.password,
          findUser.password
        );

        if (!isPasswordValid) return null;

        if (!findUser.verified) return null;

        return {
          id: findUser.id,
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/", // Страница входа
    signOut: "/", // Страница выхода
    error: "/", // Страница ошибки
    verifyRequest: "/", // Страница подтверждения запроса
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        //если авторизация по логину и паролю
        if (account?.provider === "credentials") {
          return true;
        }

        if (!user.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              { email: user.email },
            ],
          },
        });

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });
          return true;
        }

        await prisma.user.create({
          data: {
            email: user.email,
            fullName: user.name || "User #" + user.id,
            password: hashSync(user.id.toString(), 10), // dont need p if oauth
            verified: new Date(),
            provider: account?.provider,
            providerId: account?.providerAccountId,
          },
        });

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },

    //generate jwt
    async jwt({ token }) {
      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email!,
        },
      });

      if (findUser) {
        token.id = String(findUser.id);
        token.email = findUser.email;
        token.fullName = findUser.fullName;
        token.role = findUser.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.token = generateJwt(token);
        console.log(session.user.token);
      }
      return session;
    },
  },
};
