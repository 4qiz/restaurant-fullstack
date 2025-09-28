"use client";

import { Button } from "@/shared/ui/button";
import { StoryFormWrapper } from "../story-form-wrapper";
import { useState, useTransition } from "react";
import { removeStory } from "../../actions/remove-story";
import { FormError } from "@/shared/components/form-error";
import { Trash2 } from "lucide-react";

export const EditStoryPreview = ({
  previewUrl,
  storyId,
}: {
  previewUrl: string;
  storyId: number;
}) => {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState<string | undefined>("");
  const onDeleteClick = () => {
    startTransition(() => {
      removeStory(storyId).catch((error: Error) => {
        if (!error.message.includes("NEXT_REDIRECT"))
          setError("Не удалось удалить баннер");
      });
    });
  };
  return (
    <StoryFormWrapper className="lg:w-fit" headerLabel="Обложка баннера">
      <div className="flex flex-col items-center justify-center gap-3 ">
        <img alt="story-preview" src={previewUrl} className="rounded-lg h-80" />
        <Button
          className="w-full"
          variant={"destructive"}
          onClick={onDeleteClick}
          disabled={isPending}
        >
          <Trash2 className="h-4 w-4" />
          Удалить баннер
        </Button>
        <FormError message={error} />
      </div>
    </StoryFormWrapper>
  );
};
