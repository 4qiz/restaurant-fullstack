"use client";

import Link from "next/link";
import { useState } from "react";

export const Cookie = () => {
  const [display, setDisplay] = useState(true);
  if (!display) {
    return;
  }
  return (
    <section className="fixed bottom-0  w-full z-40 flex justify-center items-center p-1">
      <div className="px-2 md:px-4 py-0.5 flex items-center justify-center md:gap-x-6 bg-white rounded-lg border">
        <div className="flex items-start md:items-center gap-x-2">
          <p className="text-gray-700  text-xs md:text-sm text-center">
            Мы используем cookies для быстрой и удобной работы сайта. Продолжая
            пользоваться сайтом, вы принимаете{" "}
            <Link
              href="/privacy"
              className="underline transition-colors duration-200 text-primary "
            >
              условия обработки персональных данных
            </Link>
          </p>
        </div>

        <button className=" items-center justify-center text-gray-700 transition-colors duration-300 rounded-full flex  w-7 h-7 focus:outline-none hover:bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
            onClick={() => setDisplay(false)}
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
    </section>
  );
};
