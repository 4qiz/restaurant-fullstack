import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "../../schemas/schemas";

import bcrypt from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { getUserEmployeeByEmail } from "@/entities/employee-user/services/get-employee-user-by";

export default {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      authorize: async (credentials) => {
        const validatedFields = await LoginSchema.safeParseAsync(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserEmployeeByEmail(email);
          if (!user || !user.password) {
            throw new Error("Invalid credentials.");
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
