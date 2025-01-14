"use server"

import {signIn } from "@/auth";


export async function handleGoogleSignIn() {
  const result = await signIn("google", {redirect: true});
  return result
}

export async function handleGithubSignIn() {
  await signIn("github");
}


