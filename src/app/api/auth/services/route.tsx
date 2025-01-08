"use server";

import { signIn } from "@/auth";
import prismadb from '@/lib/prismadb'


export async function handleGoogleSignIn() {
  await signIn("google", {redirect: true, redirectTo: '/login'});
}

export async function handleGithubSignIn() {
  await signIn("github", { redirectTo: "/dashboard" });
}

export async function isRegistered(user: any){

    const usernameFound = await prismadb.user.findUnique({
        where: {
            username: user.name
        }
    })

    const emailFound = await prismadb.user.findUnique({
        where: {
            email: user.email
        }
    })

    if(usernameFound || emailFound){
        console.log("usuario existe")
        return true
        
    }else{
        const newUser = await prismadb.user.create({
            data : {
                username: user.name,
                email: user.email,
                ...(user.image && { image: user.image })
            }
        })
        console.log("usuario no existe, ya creado")
        return false
    }

}
