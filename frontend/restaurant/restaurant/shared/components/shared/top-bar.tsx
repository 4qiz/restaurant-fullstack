"use client";

import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import { Categories } from "./categories";
import { Category } from "@prisma/client";
import { CartButton } from "./cart-button";
import Link from "next/link";
import Image from "next/image";

interface Props {
  categories: Category[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  const [cartVisible, setCartVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setCartVisible(true);
      } else {
        setCartVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        " sticky top-0 bg-white py-3 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between sm:flex-nowrap">
        {/* Categories with horizontal scroll */}
        <div className="flex-1 overflow-x-auto sm:whitespace-nowrap max-w-full">
          <div className="flex">
            <Categories items={categories} />

            {/* Logo */}
            <Link
              href="/"
              className={cn(
                "lg:hidden transition-all ",
                !cartVisible
                  ? "invisible w-0 p-0 opacity-0"
                  : "visible opacity-100"
              )}
            >
              <div className=" flex items-center h-10 pr-3">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  className="object-contain"
                  width={155}
                  height={40}
                />
              </div>
            </Link>
          </div>
        </div>

        {/* Cart button */}
        <div className="flex items-center sm:ml-auto">
          <CartButton
            className={cn(
              "transition-all",
              !cartVisible
                ? "invisible w-0 p-0 opacity-0"
                : "visible ml-5 sm:ml-0 opacity-100"
            )}
          />
        </div>
      </Container>
    </div>
  );
};
