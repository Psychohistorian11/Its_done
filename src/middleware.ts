import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { privateRoutes } from "@/routes";

const {auth} = NextAuth(authConfig)

export default auth(async (req) => {

    const isLoggedIn = !!req.auth;
    const {nextUrl} = req
    const url = "https://its-done.onrender.com";
    const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
    const isAuthRoute = nextUrl.pathname.includes('/login') || 
    nextUrl.pathname.includes('/register')
    const isApiRoute = nextUrl.pathname.includes('/api');

    if(isApiRoute) return   

    if (isLoggedIn && isAuthRoute) return Response.redirect(`${url}/task`);

    if(isAuthRoute && !isLoggedIn) return 

    if(!isLoggedIn && isPrivateRoute) return Response.redirect(`${url}/login`)
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  };
