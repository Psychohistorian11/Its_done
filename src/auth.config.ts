import type { NextAuthConfig } from "next-auth";
import prismadb from '@/lib/prismadb';
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
            authorize: async (credentials: any) => {
            
              if (!credentials) {
                return null;
              }
            
              const user = await prismadb.user.findUnique({
                where: {
                  email: credentials.email,
                },
              });
            
              if (!user) {
                return null;
              }
                  
              const matchPassword = await bcrypt.compare(credentials.password, user.password!);
            
              if (!matchPassword) {
                return null; 
              }      
            
              return {
                id: user.id.toString(),
                name: user.username,
                email: user.email,
                image: user.image,
              };
            },
            
          }),
    ]
} satisfies NextAuthConfig;