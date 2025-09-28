import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { routes } from "@/shared/constants/routes";
import { cn } from "@/shared/lib/css";
import { Skeleton } from "@/shared/ui/skeleton";

const SidebarLogo = () => {
  const { theme } = useTheme();
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  useEffect(() => {
    if (theme) {
      setIsThemeLoaded(true);
    }
  }, [theme]);

  return (
    <Link href={routes.home()}>
      <div className="flex flex-row items-center gap-2 pb-5 justify-center h-[60px] lg:w-[174px]">
        {isThemeLoaded ? (
          <>
            {/* @next/next/no-img-element */}
            <img
              suppressHydrationWarning
              src="/icons/logo.svg"
              alt="logo"
              className={cn(
                theme === "light" ? "" : "invert",
                "hidden lg:flex lg:h-[40px]"
              )}
            />
            {/* @next/next/no-img-element */}
            <img
              suppressHydrationWarning
              src="/icons/sq_black.svg"
              alt="logo"
              className={cn(theme === "light" ? "" : "invert", "lg:hidden h-8")}
            />
          </>
        ) : (
          <Skeleton className="h-[40px] w-[40px] lg:w-[174px] rounded-none" />
        )}
      </div>
    </Link>
  );
};

export default SidebarLogo;
