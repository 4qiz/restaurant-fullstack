import { UserDto, UsersResponse } from "@/entities/user/domain";
import { apiRoutes } from "@/shared/constants/routes";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export const useUsers = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(search && { search }),
      });

      const response = await fetch(`${apiRoutes.getUsers()}?${params}`);
      const data: UsersResponse = await response.json();

      setUsers(data.users);
      setTotalPages(data.totalPages);
    } catch {
      toast.error("Ошибка загрузки пользователей");
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    page,
    totalPages,
    search,
    loading,
    setPage,
    setSearch,
    fetchUsers,
  };
};
