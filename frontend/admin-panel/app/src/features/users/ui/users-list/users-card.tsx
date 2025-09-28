"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { useUsers } from "../../hooks/use-users";
import { UsersFilters } from "./users-filters";
import { PaginationControls } from "../pagination-controls";
import { UsersTable } from "./users-table";

export const UsersCard = () => {
  const {
    users,
    page,
    totalPages,
    search,
    loading,
    setPage,
    setSearch,
    fetchUsers,
  } = useUsers();

  return (
    <Card className="md:min-h-[80vh] md:h-full flex flex-col">
      <CardHeader>
        <CardTitle>Список клиентов</CardTitle>
      </CardHeader>
      <CardContent className="md:flex-grow">
        <UsersFilters
          search={search}
          setSearch={setSearch}
          fetchUsers={fetchUsers}
        />
        <UsersTable users={users} loading={loading} />
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
