import { Story, StoryItem } from "@prisma/client";
import { axiosInstance } from "./instance";
import { apiRoutes } from "@/shared/constants/routes";

export type IStory = Story & {
  items: StoryItem[];
};

export const getAll = async () => {
  const { data } = await axiosInstance.get<IStory[]>(apiRoutes.getStories());

  return data;
};

export const getById = async (storyId: number) => {
  const { data } = await axiosInstance.get<IStory>(apiRoutes.getStory(storyId));

  return data;
};
