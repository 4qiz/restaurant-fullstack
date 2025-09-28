"use server";

import { deleteStory } from "@/entities/story/services/delete-story";
import { routes } from "@/shared/constants/routes";
import { redirect } from "next/navigation";

export const removeStory = async (id: number) => {
  try {
    await deleteStory(id);
    await redirect(routes.stories());
  } catch (error) {
    throw error;
  }
};
