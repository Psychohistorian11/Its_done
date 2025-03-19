"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const columns = [5, 6, 4, 3, 3, 2, 2, 3, 4, 2, 3, 4, 4, 5, 5, 7];
  const categoryEmojis = [
    ,
    "💡",
    "🚀",
    "🎉",
    "👀",
    "💎",
    "📚",
    "💪",
    "🎮",
    "🏅",
    "🎫",
    "⚽",
  ];

  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-current",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="relative min-h-screen bg-zinc-900">
      <main className=" p-2 absolute gap-8 row-start-2 items-center sm:flex justify-center  sm:top-1/3 left-1/2 -translate-x-1/2 sm:-translate-y-1/2">
        <ol className="list-inside list-decimal text-sm sm:text-left font-[family-name:var(--font-geist-mono)] text-gray-400 ">
          <div className="bg-white bg-clip-text text-5xl font-extrabold text-transparent mb-4">
            IT&apos;S DONE
          </div>

          <li className="mb-2">
            If you don&apos;t have an account, create one.
          </li>
          <li>log in to start editing.</li>
        </ol>

        <div className="flex gap-4 items-center mt-4 flex-col sm:flex-row">
          <Link
            href="/login"
            className="rounded-lg  border-solid border-transparent transition-colors flex items-center justify-center 
            bg-foreground text-background gap-2 hover:bg-gray-600 dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-32 sm:w-40"
          >
            Log in
          </Link>

          <Link
            href="/register"
            className="rounded-lg   bg-gray-300 transition-colors flex items-center 
            justify-center hover:bg-gray-600 hover:text-white hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-32 sm:w-40"
          >
            Sign up
          </Link>
        </div>
      </main>

      <div className="grid grid-cols-4 md:grid-cols-[repeat(16,minmax(0,1fr))] min-h-screen">
        {columns.map((numBlocks, colIndex) => (
          <div key={colIndex} className="flex flex-col justify-end">
            {Array.from({ length: numBlocks }).map((_, blockIndex) => {
              const [hovered, setHovered] = useState(false);
              const [color, setColor] = useState("bg-current");

              return (
                <div
                  key={blockIndex}
                  className={`h-32 border border-zinc-800 flex items-center justify-center transition-all duration-100 ${color} ${
                    hovered ? "scale-110 rounded-sm border-none" : ""
                  }`}
                  onMouseEnter={() => {
                    setHovered(true);
                    setColor(getRandomColor());
                  }}
                  onMouseLeave={() => setHovered(false)}
                >
                  {hovered && (
                    <span className="text-5xl">
                      {
                        categoryEmojis[
                          Math.floor(Math.random() * categoryEmojis.length)
                        ]
                      }
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
