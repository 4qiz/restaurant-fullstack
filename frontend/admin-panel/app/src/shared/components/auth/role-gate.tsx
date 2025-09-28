"use client";

import { useCurrentRole } from "@/shared/lib/auth-js/use-current-role";
import { UserRole } from "@prisma/client";

export const RoleGate = ({
  allowedRole,
  children,
}: {
  allowedRole: UserRole;
  children: React.ReactNode;
}) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return null;
  }

  return <>{children}</>;
};
