'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form" 
import { SquareUser } from "lucide-react"
import { useState } from "react"
import UserRegister from "@/interfaces/user"
import { useRouter } from "next/navigation"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  
  const {register, handleSubmit, formState:{errors}} = useForm()
  const [file, setFile] = useState<any>(null)
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
      }

    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  });
  

  return (

    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">

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
                  {...(register('username', {
                    required: {
                      value: true,
                      message: "Username is required"
                    }
                  }))}
                />
                {
                  errors.username && (
                    <span className="text-orange-400 text-xs">{errors.username.message?.toString()}</span>
                  )
                }
              </div>
              <div className="grid gap-2 ">
                <Label htmlFor="email">Email</Label>
                <Input
                  className="border border-zinc-400"
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...(register('email', {
                    required: {
                      value: true,
                      message: "email is required"
                    }
                  }))}
                />
                {
                  errors.email && (
                    <span className="text-orange-400 text-xs">{errors.email.message?.toString()}</span>
                  )
                }
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input className="border border-zinc-400" 
                       id="password" 
                       type="password" 
                       {...(register('password', {
                        required: {
                          value: true,
                          message: "password is required"
                        }
                      }))} />
                  {
                  errors.password && (
                    <span className="text-orange-400 text-xs">{errors.password.message?.toString()}</span>
                  )
                }

                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirm password</Label>
                </div>
                <Input className="border border-zinc-400" 
                       id="confirmPassword" 
                       type="password" 
                       {...(register('confirmPassword', {
                        required: {
                          value: true,
                          message: "confirm the password is required"
                        }
                      }))} />
                      {
                  errors.confirmPassword && (
                    <span className="text-orange-400 text-xs">{errors.confirmPassword.message?.toString()}</span>
                  )
                }
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full border border-zinc-900">
                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github ">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                <path d="M9 18c-4.51 2-5-2-7-2"/></svg> 
                  <span className="sr-only">Login with Apple</span>
                </Button>
                <Button variant="outline" className="w-full border border-zinc-900">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
              </div>

            </div>
   
          </form>
          <form onSubmit={async (e) => {
            e.preventDefault()
          }}>

          <div className="relative md:block h-full w-full">
            <input type="file"
               onChange={handleFileChange}
               accept="image/*"
              className="absolute h-full w-full object-cover dark:brightness-[0.2] dark:grayscale hover:cursor-pointer opacity-0"
            />
            <div className="md:w-full md:h-full">
            {imageUrl ? <img className="h-full w-full" src={imageUrl}></img> : <SquareUser className="h-full w-full" /> }     
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
  )
}
