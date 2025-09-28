import { prisma } from "@/shared/lib/prisma-client";

export const getStoryById = async (storyId: number) => {
  return await prisma.story.findUnique({
    where: { id: storyId },
    include: {
      items: true,
    },
  });
};
