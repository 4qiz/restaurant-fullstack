import { prisma } from "@/shared/lib/prisma-client";

export const deleteStoryItem = async (storyItemId: number) => {
  await prisma.storyItem.delete({ where: { id: storyItemId } });
};
