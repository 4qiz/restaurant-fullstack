"use server";

import * as z from "zod";
import { CreateCategorySchema } from "../schemas/create-category-schema";
import { prisma } from "@/shared/lib/prisma-client";
import { revalidatePath } from "next/cache";

export const createCategoryAction = async (
  values: z.infer<typeof CreateCategorySchema>,
  route?: string
) => {
  await prisma.category.create({ data: values });

  if (route) {
    revalidatePath(route);
  }
  return { success: "Категория создана" };
};
