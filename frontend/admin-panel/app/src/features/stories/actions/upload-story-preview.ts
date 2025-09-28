"use server";

import { createStory } from "@/entities/story/services/create-story";
import { routes } from "@/shared/constants/routes";
import { redirect } from "next/navigation";

export const uploadStoryPreview = async (previewUrl: string) => {
  try {
    const createdStoryId = await createStory(previewUrl);
    redirect(routes.storiesId(createdStoryId));
  } catch (error) {
    throw error;
  }
};
