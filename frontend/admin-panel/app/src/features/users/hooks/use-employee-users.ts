import {
  EmployeeUserDto,
  EmployeeUsersResponse,
} from "@/entities/employee-user/domain";
import { apiRoutes } from "@/shared/constants/routes";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useEmployeeUsers = () => {
  const [users, setUsers] = useState<EmployeeUserDto[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string | null>("ALL");
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search }),
        ...(role && { role }),
      });

      const response = await fetch(`${apiRoutes.getEmployeeUsers()}?${params}`);
      const data: EmployeeUsersResponse = await response.json();

      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch {
      toast.error("Ошибка загрузки пользователей");
    } finally {
      setLoading(false);
    }
  }, [page, search, role]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
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
  };
};
