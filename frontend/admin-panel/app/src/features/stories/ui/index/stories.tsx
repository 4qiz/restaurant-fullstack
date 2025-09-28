"use client";

import React from "react";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";
import { cn } from "@/shared/lib/css";
import { Container } from "@/shared/components/container";
import { IStory } from "@/shared/lib/api/stories";
import { Api } from "@/shared/lib/api/api-client";
import Image from "next/image";

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = React.useState<IStory[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedStory, setSelectedStory] = React.useState<IStory>();

  React.useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
    }

    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);

    if (story.items.length > 0) {
      setOpen(true);
      document.body.style.overflow = "hidden"; // Отключение прокрутки
    }
  };

  const closeStory = () => {
    setOpen(false);
    document.body.style.overflow = ""; // Восстановление прокрутки
  };

  return (
    <>
      <Container
        className={cn(" flex items-center gap-4 overflow-x-auto", className)}
      >
        {stories.length === 0 &&
          [...Array(6)].map((_, index) => (
            <div
              key={index}
              className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse flex-shrink-0"
            />
          ))}

        {stories.map((story) => (
          <Image
            key={story.id}
            onClick={() => onClickStory(story)}
            className="rounded-md cursor-pointer w-[200px] h-[250px] object-cover flex-shrink-0"
            src={story.previewImageUrl}
            alt="Story"
            width={200}
            height={250}
            priority={true}
            quality={100}
          />
        ))}
      </Container>

      {open && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-30"
          onClick={closeStory}
        >
          <div
            className="relative w-[520px]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-5 -right-10 z-40"
              onClick={closeStory}
            >
              <X className="w-8 h-8 text-white/50" />
            </button>
            <div className="hidden rounded-md overflow-hidden">
              <ReactStories
                storyContainerStyles={{
                  height: 800,
                  width: 520,
                  borderRadius: "1rem",
                  overflow: "hidden",
                }}
                onAllStoriesEnd={closeStory}
                stories={
                  selectedStory?.items.map((item) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={5000}
                width={520}
                height={800}
              />
            </div>

            <div className="md:rounded-md overflow-hidden w-full h-full flex justify-center items-center">
              <ReactStories
                storyContainerStyles={{
                  height: "100vh", // Высота экрана для мобильных
                  width: "100vw", // Ширина экрана для мобильных
                  borderRadius: "0", // Убираем скругление на мобильных
                  overflow: "hidden",
                }}
                onAllStoriesEnd={closeStory}
                stories={
                  selectedStory?.items.map((item) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={5000}
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
