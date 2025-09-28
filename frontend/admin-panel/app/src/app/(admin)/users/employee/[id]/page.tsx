import { getUserEmployeeById } from "@/entities/employee-user/services/get-employee-user-by";
import { EmployeeCard } from "@/features/users/ui/employee-card/employee-card";
import { routes } from "@/shared/constants/routes";
import { currentUserAsync } from "@/shared/lib/auth-js/current-user";
import { UserRole } from "@prisma/client";
import { redirect, unauthorized } from "next/navigation";

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const employee = await getUserEmployeeById(id);
  if (!employee) {
    redirect(routes.notFound());
  }

  const user = await currentUserAsync();
  const isUserProfile = user?.id === employee.id;
  const isAdmin = user?.role === UserRole.ADMIN;

  //Показываем карточку сотрудника, если это профиль пользователя или админ
  if (isUserProfile || isAdmin) {
    return <EmployeeCard employeeUser={employee} />;
  }

  return unauthorized();
};

export default Page;
