import { prisma } from "@/shared/lib/prisma-client";

export const getStories = async () => {
  return await prisma.story.findMany({
    include: {
      items: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
