import { UserRole } from "@prisma/client";

export const roleTranslations: Record<UserRole, string> = {
  [UserRole.ADMIN]: "Администратор",
  [UserRole.MANAGER]: "Менеджер",
  [UserRole.DELIVERY]: "Курьер",
  [UserRole.USER]: "Пользователь",
};

export const roleColor: Record<UserRole, string> = {
  [UserRole.ADMIN]: "bg-red", // Администратор
  [UserRole.MANAGER]: "bg-yellow text-black", // Менеджер
  [UserRole.DELIVERY]: "bg-chart-100", // Доставка
  [UserRole.USER]: "bg-chart-2", // Пользователь
};
