"use client";

import React from "react";

import { ToggleTheme } from "../ui/toggle-theme";
import { SidebarUser } from "./sidebar/sidebar-user";

const Header = () => {
  return (
    <header className="flex shadow-sm items-center justify-end bg-background rounded-full gap-5  mb-5">
      <ToggleTheme />
      {/* Пользователь */}
      <div className=" border rounded-full shadow-md ">
        <SidebarUser />
      </div>
    </header>
  );
};
export default Header;
