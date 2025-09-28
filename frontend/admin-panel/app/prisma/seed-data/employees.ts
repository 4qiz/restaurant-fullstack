import { UserRole } from "@prisma/client";
import bcryptjs from "bcryptjs";

export const employeeUsersSeed = [
  {
    name: "Орехова Анна Владимировна",
    email: "admin@shtab.ru",
    password: bcryptjs.hashSync("12345678", 10),
    emailVerified: new Date(),
    role: UserRole.ADMIN,
  },
  {
    name: "Яковлева Виктория Николаевна",
    email: "manager@shtab.ru",
    password: bcryptjs.hashSync("12345678", 10),
    emailVerified: new Date(),
    role: UserRole.MANAGER,
  },
  {
    name: "Белоусов Максим Олегович",
    email: "delivery1@shtab.ru",
    password: bcryptjs.hashSync("12345678", 10),
    emailVerified: new Date(),
    role: UserRole.DELIVERY,
  },
  {
    name: "Петров Даниил Андреевич",
    email: "delivery2@shtab.ru",
    password: bcryptjs.hashSync("12345678", 10),
    emailVerified: new Date(),
    role: UserRole.DELIVERY,
  },
  {
    name: "Иванов Алексей Сергеевич",
    email: "delivery.alexey@shtab.ru",
    password: bcryptjs.hashSync("12345678", 10),
    emailVerified: new Date(),
    role: UserRole.DELIVERY,
  },
  {
    name: "Кузнецова Мария Алексеевна",
    email: "support.maria@shtab.ru",
    password: bcryptjs.hashSync("12345678", 10),
    emailVerified: new Date(),
    role: UserRole.DELIVERY,
  },
  {
    name: "Орлов Николай Дмитриевич",
    email: "admin.nikolay@shtab.ru",
    password: bcryptjs.hashSync("12345678", 10),
    emailVerified: new Date(),
    role: UserRole.ADMIN,
  },
  {
    name: "Тихонова Екатерина Ивановна",
    email: "support.ekaterina@shtab.ru",
    password: bcryptjs.hashSync("12345678", 10),
    emailVerified: new Date(),
    role: UserRole.DELIVERY,
  },
  {
    name: "Громов Андрей Павлович",
    email: "delivery.andrey@shtab.ru",
    password: bcryptjs.hashSync("12345678", 10),
    emailVerified: new Date(),
    role: UserRole.DELIVERY,
  },
  {
    name: "Лебедева Ольга Викторовна",
    email: "manager.olga@shtab.ru",
    password: bcryptjs.hashSync("12345678", 10),
    emailVerified: new Date(),
    role: UserRole.MANAGER,
  },
];
