"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLogo from "./sidebar-logo";
import { sideBarLinks } from "@/shared/constants/sidebar-links";
import { cn } from "@/shared/lib/css";
import { useCurrentRole } from "@/shared/lib/auth-js/use-current-role";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/shared/lib/auth-js/use-current-user";
import { routes } from "@/shared/constants/routes";
import { getAdminSignalR } from "@/shared/lib/signalr/get-admin-signalr";

const Sidebar = () => {
  const pathname = usePathname();
  const role = useCurrentRole();
  const user = useCurrentUser();
  const token = user?.token;
  const userId = user?.id;

  const [orderCount, setOrderCount] = useState<number>(0);

  useEffect(() => {
    if (!token || !userId || !role) return;

    getAdminSignalR(token, undefined, undefined, (count: number) => {
      setOrderCount(count);
    });
  }, [token, userId, role]);

  const isActiveRoute = (route: string) => {
    return pathname === route || pathname.startsWith(`${route}/`);
  };

  return (
    <div className="admin-sidebar border-r">
      <div>
        <SidebarLogo />

        <div className="mt-5 flex flex-col gap-3">
          {role &&
            sideBarLinks
              .filter((link) => link.roles.includes(role))
              .map((link) => {
                const isSelected = isActiveRoute(link.route);
                const isOrderLink = link.route === routes.orders();

                return (
                  <div key={link.route}>
                    <Link href={link.route}>
                      <div
                        className={cn(
                          "link flex items-center justify-between pr-2",
                          isSelected && "bg-primary-admin shadow-sm"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          {isOrderLink ? (
                            <div
                              className={cn(
                                "flex items-center justify-center text-xs font-bold w-5 h-5 rounded-full bg-primary text-background",
                                isSelected && "bg-secondary text-foreground/70"
                              )}
                            >
                              {orderCount > 9 ? "9+" : orderCount}
                            </div>
                          ) : (
                            <div className="relative size-5">
                              <Image
                                src={link.img}
                                alt="icon"
                                fill
                                className={cn(
                                  `${isSelected ? "brightness-0 invert" : ""}`,
                                  "object-contain"
                                )}
                              />
                            </div>
                          )}
                          <p
                            className={cn(
                              isSelected ? "text-onprimary" : "text-foreground"
                            )}
                          >
                            {link.text}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
