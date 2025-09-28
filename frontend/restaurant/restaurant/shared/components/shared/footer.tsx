"use client";

import { generatePDF } from "@/shared/lib/generate-pdf";
import Image from "next/image";
import Link from "next/link";

interface Props {
  className?: string;
}
export const Footer: React.FC<Props> = ({}) => {
  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between">
          {/* Логотип */}
          <div className="mb-6 md:mr-8 ">
            <a href="/">
              <div>
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={120}
                  height={40}
                  className="md:w-[165px] md:h-[55px]"
                />
              </div>
            </a>
          </div>

          {/* Пустая строка после логотипа */}
          {/* <div className="mb-6"></div> */}

          {/* Контакты, Полезное */}
          <div className="flex flex-col  md:flex-row md:gap-x-8 md:ml-auto text-center md:text-left text-lg">
            <div>
              <h2 className="mb-4 font-semibold text-gray-900  dark:text-white">
                Контакты
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <span className="disabled">+7 (8000) 88-88-88</span>
                </li>
                <li className="mb-6">
                  <a href="#" className="hover:underline" target="_blank">
                    Вконтакте
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 font-semibold text-gray-900  dark:text-white">
                Полезное
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-2">
                  <a
                    href="#"
                    className="hover:underline"
                    onClick={() => generatePDF("pdf-element")}
                  >
                    Сохранить меню PDF
                  </a>
                </li>
                <li className="mb-6">
                  <Link href={"/privacy"}>Правовая информация</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 font-semibold text-gray-900  dark:text-white">
                Адрес
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-6">
                  <a href="#" className="hover:underline" target="_blank">
                    ул Неизвестной геолокации
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
