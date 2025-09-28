import { UsersPage } from "@/features/users/containers/users-page";
import { currentRoleAsync } from "@/shared/lib/auth-js/current-role";
import { UserRole } from "@prisma/client";
import { unauthorized } from "next/navigation";

export const dynamic = "force-dynamic";

const Page = async () => {
  const role = await currentRoleAsync();
  const isAdmin = role === UserRole.ADMIN;

  if (!isAdmin) {
    unauthorized();
  }

  return <UsersPage />;
};

export default Page;
