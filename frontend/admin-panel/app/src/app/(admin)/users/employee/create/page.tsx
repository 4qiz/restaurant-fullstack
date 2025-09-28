import { RegisterForm } from "@/features/users/ui/create/register-form";
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

  return <RegisterForm />;
};

export default Page;
