import { prisma } from "@/shared/lib/prisma-client";

export const deleteStory = async (id: number) => {
  await prisma.story.delete({ where: { id } });
};
