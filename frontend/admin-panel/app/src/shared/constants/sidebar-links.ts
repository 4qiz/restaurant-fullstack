import { UserRole } from "@prisma/client";
import { routes } from "./routes";

type SidebarLink = {
  img: string;
  route: string;
  text: string;
  roles: UserRole[]; // Массив ролей, которые имеют доступ
};

export const sideBarLinks = [
  {
    img: "/icons/admin/home.svg",
    route: routes.home(),
    text: "Главная",
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  {
    img: "/icons/admin/menu.svg",
    route: routes.menu(),
    text: "Меню",
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  {
    img: "/icons/admin/stories.svg",
    route: routes.stories(),
    text: "Баннеры",
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  {
    img: "/icons/admin/orders.svg",
    route: routes.orders(),
    text: "Заказы",
    roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.DELIVERY], // Доступно всем
  },
  {
    img: "/icons/admin/stats.svg",
    route: routes.stats(),
    text: "Статистика",
    roles: [UserRole.ADMIN, UserRole.MANAGER],
  },
  {
    img: "/icons/admin/users.svg",
    route: routes.users(),
    text: "Пользователи",
    roles: [UserRole.ADMIN],
  },
] as SidebarLink[];

// icons color #8c8e98
