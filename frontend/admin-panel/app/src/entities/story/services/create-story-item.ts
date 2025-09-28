import { prisma } from "@/shared/lib/prisma-client";

export const createStoryItem = async (storyId: number, itemUrl: string) => {
  const newStoryItem = await prisma.storyItem.create({
    data: {
      storyId,
      sourceUrl: itemUrl,
    },
  });
  return newStoryItem.id;
};
