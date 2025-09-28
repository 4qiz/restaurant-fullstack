"use client";

import React, { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Container } from "./container";
import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";
import { ProfileButton } from "./profile/profile-button";
import { AuthModal } from "./modals/auth/auth-modal";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCartButton?: boolean;
}

export const Header: React.FC<Props> = ({
  className,
  hasSearch = true,
  hasCartButton = true,
}) => {
  const [openAuthModal, setOpenAuthModal] = useState(false);

  return (
    <header className={cn("border-b", className)}>
      <Container className="grid grid-cols-1 gap-4 py-4 lg:py-8">
        {/* Top row: Logo and buttons for mobile */}
        <div className="flex justify-between items-center md:hidden">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center">
              <img src="/logo.svg" alt="Logo" className="h-10 pr-3" />
            </div>
          </Link>

          {/* Profile and Cart buttons */}
          <div className="flex items-center gap-3">
            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
            {hasCartButton && <CartButton />}
          </div>
        </div>

        {/* Search bar for mobile */}
        {hasSearch && (
          <div className="w-full block md:hidden">
            <SearchInput />
          </div>
        )}

        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.svg"
                alt="Logo"
                width={165}
                height={55}
                className="lg:w-[165px] lg:h-[55px]"
              />
            </div>
          </Link>

          {/* Search bar */}
          {hasSearch && (
            <div className="flex-1 mx-4 xl:mx-10 ">
              <SearchInput />
            </div>
          )}

          {/* Profile and Cart buttons */}
          <div className="flex items-center gap-3 shrink-0">
            <AuthModal
              open={openAuthModal}
              onClose={() => setOpenAuthModal(false)}
            />
            <ProfileButton onClickSignIn={() => setOpenAuthModal(true)} />
            {hasCartButton && <CartButton />}
          </div>
        </div>
      </Container>
    </header>
  );
};
