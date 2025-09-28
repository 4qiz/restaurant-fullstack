import { prisma } from "@/shared/lib/prisma-client";

export const getStoryItemById = async (storyItemId: number) => {
  const storyItem = await prisma.storyItem.findUnique({
    where: { id: storyItemId },
  });
  return storyItem;
};
