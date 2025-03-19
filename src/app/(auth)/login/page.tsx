"use client";

import LoginForm from "@/components/login-form";
import { Scroll } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center p-6 sm:p-0">
      {/* Logo en la esquina superior derecha */}
      <div className="absolute top-6 left-6">
        <a className="flex items-center gap-4 font-medium text-white">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white border">
            <Scroll className="size-12 text-black" />
          </div>
          <div className="bg-white bg-clip-text text-4xl font-extrabold font-[family-name:var(--font-geist-mono)] text-transparent ">
            IT&apos;S DONE
          </div>
        </a>
      </div>

      {/* Contenedor del formulario */}
      <div className="flex flex-col w-full max-w-sm justify-center items-center">
        <LoginForm className="w-full" />
      </div>
    </div>
  );
}
