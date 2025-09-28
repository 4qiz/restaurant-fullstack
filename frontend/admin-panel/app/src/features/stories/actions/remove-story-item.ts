"use server";

import { deleteStoryItem } from "@/entities/story/services/delete-story-item";
import { getStoryItemById } from "@/entities/story/services/get-story-item-by-id";
import { routes } from "@/shared/constants/routes";
import { revalidatePath } from "next/cache";

export const removeStoryItem = async (storyItemId: number) => {
  try {
    const storyItem = await getStoryItemById(storyItemId);
    if (!storyItem) {
      return { error: "История не найдена" };
    }
    await deleteStoryItem(storyItemId);
    revalidatePath(routes.storiesId(storyItem.storyId));
  } catch (error) {
    throw error;
  }
};
