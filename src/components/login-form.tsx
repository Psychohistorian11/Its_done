"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import GoogleService from "./common/googleService"
import GithubService from "./common/githubService"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res!.error) {
      setError("email", { type: "manual", message: "Invalid credentials." });
    } else {
      router.push("/dashboard");
    }
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-white">
        <CardHeader className="text-center ">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Github or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <GithubService login={true} />

                <GoogleService login={true} />
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2 ">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    className="border border-zinc-400"
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "email is required",
                      },
                    })}
                  />
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    className="border border-zinc-400"
                    id="password"
                    type="password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "password is required",
                      },
                    })}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Login
                </Button>
                {errors.email && (
                  <span className="text-red-800 text-sm">
                    {errors.email.message?.toString()}
                  </span>
                )}
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
