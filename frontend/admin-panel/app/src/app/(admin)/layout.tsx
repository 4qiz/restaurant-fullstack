import React, { ReactNode } from "react";

import Header from "@/shared/components/header";
import Sidebar from "@/shared/components/sidebar/sidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-row">
      <Sidebar />

      <div className="admin-container">
        <Header />
        <div className="flex flex-col gap-3">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
