"use server"

import {signIn, signOut } from "../../../../auth";


export async function handleGoogleSignIn() {
  await signIn("google", {redirect: true, redirectTo: '/dashboard'});
}


export async function handleGithubSignIn() {
  await signIn("github", {redirect: true, redirectTo: '/dashboard'});
}

export async function handleSignOut(){
  await signOut({redirectTo: '/login'});
}

