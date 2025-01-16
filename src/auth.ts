import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "@/app/api/auth/data/user";

export const { auth, handlers, signIn, signOut} = NextAuth({
  session: {strategy: "jwt"},
  ...authConfig,

});