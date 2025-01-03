'use client'
//import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('login')
  }
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen
     p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main className="flex gap-8 row-start-2 items-center sm:items-start ">
        {/*<Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}   
          height={38}
          priority
        />*/} 
        IT'S DONE
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
          If you don't have an account, create one.

          </li>
          <li>log in to start editing.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a onClick={handleClick} className="rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center 
            bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-40"
            target="_blank"
            rel="noopener noreferrer">
            Log in
          </a>
          
          <a
            className="rounded-lg border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center 
            justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-40"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sign up
          </a>
        </div>

      </main>
    
    </div>
  );
}
