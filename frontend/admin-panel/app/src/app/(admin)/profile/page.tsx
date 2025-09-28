import { logout } from "@/features/auth/actions/logout";
import { routes } from "@/shared/constants/routes";
import { currentUserAsync } from "@/shared/lib/auth-js/current-user";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUserAsync();
  if (!user || !user.id) {
    await logout();
    return;
  }
  redirect(routes.employeeUserId(user.id));
};

export default Page;
