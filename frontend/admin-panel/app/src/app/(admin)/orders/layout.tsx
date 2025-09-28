import { OrdersHeader } from "@/features/orders/ui/orders-header";
import React, { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="space-y-3">
      <OrdersHeader />
      {children}
    </div>
  );
};

export default Layout;
