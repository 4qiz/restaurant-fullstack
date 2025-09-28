"use server";

import { createStoryItem } from "@/entities/story/services/create-story-item";
import { routes } from "@/shared/constants/routes";
import { revalidatePath } from "next/cache";

export const uploadStoryItem = async (storyId: number, itemUrl: string) => {
  try {
    await createStoryItem(storyId, itemUrl);
    revalidatePath(routes.storiesId(storyId));
  } catch (error) {
    throw error;
  }
};
