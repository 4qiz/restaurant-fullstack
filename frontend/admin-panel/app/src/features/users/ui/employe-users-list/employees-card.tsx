"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { useEmployeeUsers } from "../../hooks/use-employee-users";
import { EmployeeFilters } from "./employee-filters";
import { PaginationControls } from "../pagination-controls";
import { EmployeeTable } from "./employee-table";
import Link from "next/link";
import { routes } from "@/shared/constants/routes";
import { ResponsiveButton } from "@/shared/ui/responsive-button";
import { Plus } from "lucide-react";

export const EmployeesCard = () => {
  const {
    users,
    page,
    totalPages,
    search,
    role,
    loading,
    setPage,
    setSearch,
    setRole,
    fetchUsers,
  } = useEmployeeUsers();

  return (
    <Card className="md:min-h-[80vh] md:h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between gap-3">
        <CardTitle>Список пользователей</CardTitle>
        <Link href={routes.createEmployee()}>
          <ResponsiveButton icon={<Plus />} text="Добавить сотрудника" />
        </Link>
      </CardHeader>
      <CardContent className="md:flex-grow">
        <EmployeeFilters
          search={search}
          role={role}
          setSearch={setSearch}
          setRole={setRole}
          fetchUsers={fetchUsers}
        />
        <EmployeeTable users={users} loading={loading} />
      </CardContent>
      <CardFooter>
        <PaginationControls
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </CardFooter>
    </Card>
  );
};
