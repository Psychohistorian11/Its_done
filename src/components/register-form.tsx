'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form" 
import { useState } from "react"
import UserRegister from "@/interfaces/user"
import { useRouter } from "next/navigation"
import GoogleService from "./common/googleService"
import GithubService from "./common/githubService"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  
  const {register, handleSubmit, formState:{errors}, setError} = useForm()
  const [file, setFile] = useState<any>(null)
  const [serverError, setServerError] = useState('');
    const [imageUrl, setImageUrl] = useState('')
  const router = useRouter()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      setFile(selectedFile); 
      console.log(selectedFile)

      const formData = new FormData();
      formData.append("file", selectedFile);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("Error al subir el archivo");
        }

        const data = await response.json();
        setImageUrl(data.url)
        console.log("Archivo subido con éxito", data);
      } catch (error) {
        console.error("Error en la subida del archivo:", error);
      }
    }
  };


  const onSubmit = handleSubmit(async (data) => {

    if(data.password !== data.confirmPassword){
      setError("confirmPassword",{type: 'server', message: "Password do not match"})
      return
    }
    const dataToSend: UserRegister = {
      username: data.username,
      email: data.email,
      password: data.password,
      ...(imageUrl && { image: imageUrl })
    };
  
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(dataToSend),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.ok){
        router.push('login')
      }else {
        const errorData = await response.json();
        if (errorData.message === "username already exist") {
          setError("username", { type: "server", message: errorData.message });
        } else if (errorData.message === "email already exist") {
          setError("email", { type: "server", message: errorData.message });
        } else {
          setServerError("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      setServerError("Failed to connect to the server.");
    }
  });
  

  return (
    <div className={cn("flex flex-col gap-6 ", className)} {...props}>
      <Card className="overflow-hidden ">
        <CardContent className="grid p-0 md:grid-cols-2 bg-white">
          <form className="p-6 md:p-8" onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome</h1>
                <p className="text-balance text-muted-foreground">
                  Sign in to your It's Done account
                </p>
              </div>
              <div className="grid gap-2 ">
                <Label htmlFor="email">Username</Label>
                <Input
                  className="border border-zinc-400"
                  id="name"
                  type="text"
                  {...register("username", {
                    required: {
                      value: true,
                      message: "Username is required",
                    },
                  })}
                />
                {errors.username && (
                  <span className="text-red-800 text-sm">
                    {errors.username.message?.toString()}
                  </span>
                )}
              </div>
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
                {errors.email && (
                  <span className="text-red-800 text-sm">
                    {errors.email.message?.toString()}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
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
                {errors.password && (
                  <span className="text-red-800 text-sm">
                    {errors.password.message?.toString()}
                  </span>
                )}

                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                </div>
                <Input
                  className="border border-zinc-400"
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword", {
                    required: {
                      value: true,
                      message: "confirm the password is required",
                    },
                  })}
                />
                {errors.confirmPassword && (
                  <span className="text-red-800 text-sm">
                    {errors.confirmPassword.message?.toString()}
                  </span>
                )}
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
              {serverError && (
                <p className="text-red-800 text-sm text-center">
                  {serverError}
                </p>
              )}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <GithubService login={false} />

                <GoogleService login={false} />
              </div>
            </div>
          </form>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
            }}
          >
            <div className="relative md:block h-full w-full">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="absolute h-full w-full object-cover dark:brightness-[0.2] dark:grayscale hover:cursor-pointer opacity-0"
              />
              <div className="md:w-full md:h-full">
                {imageUrl ? (
                  <img className="h-full w-full" src={imageUrl}></img>
                ) : (
                  <img
                    className="h-full w-full object-cover"
                    src="/images/profilePicture.png"
                  ></img>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
