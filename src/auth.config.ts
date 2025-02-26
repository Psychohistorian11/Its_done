import type { NextAuthConfig, User } from "next-auth";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Google,
    GitHub,
    Credentials({
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = String(credentials.email);
        const password = String(credentials.password);

        const user = await prismadb.user.findUnique({
          where: { email },
        });

        if (!user) {
          return null;
        }

        const matchPassword = await bcrypt.compare(password, user.password!);
        if (!matchPassword) {
          return null;
        }

        const authenticatedUser: User = {
          id: user.id.toString(),
          name: user.username,
          email: user.email,
          image: user.image,
        };

        return authenticatedUser;
      },
    }),
  ],
} satisfies NextAuthConfig;