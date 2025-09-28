import { UserRole } from "@prisma/client";
import bcryptjs from "bcryptjs";

export const usersSeed = [
  {
    fullName: "Иван Петров",
    email: "ivan.petrov@test.ru",
    password: bcryptjs.hashSync("12345678", 10),
    verified: new Date(),
    role: UserRole.USER,
  },
  {
    fullName: "Анна Смирнова",
    email: "anna.smirnova@test.ru",
    password: bcryptjs.hashSync("12345678", 10),
    verified: new Date(),
    role: UserRole.USER,
    address: "г Архангельск",
    phoneNumber: "+7 (960) 212-34-78",
  },
  {
    fullName: "Сергей Иванов",
    email: "sergey.ivanov@test.ru",
    password: bcryptjs.hashSync("12345678", 10),
    verified: new Date(),
    role: UserRole.USER,
  },
  {
    fullName: "Екатерина Соколова",
    email: "ekaterina.sokolova@test.ru",
    password: bcryptjs.hashSync("12345678", 10),
    verified: new Date(),
    role: UserRole.USER,
  },
  {
    fullName: "Дмитрий Кузнецов",
    email: "dmitry.kuznetsov@test.ru",
    password: bcryptjs.hashSync("12345678", 10),
    verified: new Date(),
    role: UserRole.USER,
  },
];
