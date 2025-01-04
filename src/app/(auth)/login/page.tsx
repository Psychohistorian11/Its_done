import { Scroll } from "lucide-react"

import  LoginForm  from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6  p-6 md:p-10 ">

      <div className="flex w-full max-w-sm flex-col gap-6">
        <a className="flex items-center gap-2 self-center font-medium text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Scroll className="size-6" />
          </div>
          It's Done.
        </a>
        <LoginForm />
      </div>

    </div>
  )
}
