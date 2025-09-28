export interface UserDto {
  id: string;
  fullName: string;
  email: string;
}

// Определяем тип ответа
export interface UsersResponse {
  users: UserDto[];
  totalPages: number;
  currentPage: number;
  totalUsers: number;
}
