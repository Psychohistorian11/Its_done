"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen
     p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-zinc-900"
    >
      <div className="text-white">
        {/*<Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}   
          height={38}
          priority
        />*/}
        IT&apos;S DONE
      </div>
      <main className="flex gap-8 row-start-2 items-center sm:items-start ">
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)] text-gray-400">
          <li className="mb-2 ">
            If you don&apos;t have an account, create one.
          </li>
          <li>log in to start editing.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="login"
            className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center 
            bg-foreground text-background gap-2 hover:bg-gray-600 dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-40"
          >
            Log in
          </Link>

          <Link
            href="register"
            className="rounded-lg border border-solid bg-gray-300 transition-colors flex items-center 
            justify-center hover:bg-gray-600 hover:text-white hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-40"
          >
            Sign up
          </Link>
        </div>
      </main>
    </div>
  );
}
