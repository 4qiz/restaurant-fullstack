import { prisma } from "@/shared/lib/prisma-client";

export const createStory = async (previewUrl: string) => {
  const newStory = await prisma.story.create({
    data: {
      previewImageUrl: previewUrl,
    },
  });
  return newStory.id;
};
