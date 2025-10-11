import { Story, StoryItem } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./api-routes";

export type IStory = Story & {
  items: StoryItem[];
};

export const getAll = async () => {
  const { data } = await axiosInstance.get<IStory[]>(ApiRoutes.STORIES);

  return data;
};
