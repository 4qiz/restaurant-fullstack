import { UserRole } from "@prisma/client";

export interface EmployeeUserDto {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Определяем тип ответа
export interface EmployeeUsersResponse {
  users: EmployeeUserDto[];
  totalPages: number;
  currentPage: number;
  totalUsers: number;
}
