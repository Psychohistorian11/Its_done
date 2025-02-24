"use server";

import { signIn, signOut } from "../../auth";

export async function handleGoogleSignIn() {
  await signIn("google", {
    redirect: true,
    redirectTo: "/task",
    callbackUrl: "https://its-done.onrender.com",
  });
}

export async function handleGithubSignIn() {
  await signIn("github", {
    redirect: true,
    redirectTo: "/task",
    callbackUrl: "https://its-done.onrender.com",
  });
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/login" });
}
