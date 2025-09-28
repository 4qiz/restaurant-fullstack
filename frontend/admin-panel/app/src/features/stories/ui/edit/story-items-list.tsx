"use client";

import { Button } from "@/shared/ui/button";
import { StoryItem } from "@prisma/client";
import { StoryFormWrapper } from "../story-form-wrapper";
import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { removeStoryItem } from "../../actions/remove-story-item";

export const StoryItemsList = ({ items }: { items: StoryItem[] }) => {
  const [isPending, startTransition] = useTransition();

  const onDeleteClick = (storyItemId: number) => {
    startTransition(async () => {
      await removeStoryItem(storyItemId).catch(() => {
        toast("Не удалось удалить баннер");
      });
    });
  };
  if (items.length === 0) {
    return null;
  }
  return (
    <StoryFormWrapper headerLabel="Баннеры">
      <div className="flex flex-row overflow-x-auto gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col space-y-3 mb-3">
            <img
              alt="story-preview"
              src={item.sourceUrl}
              className="rounded-lg h-80"
            />
            <Button
              className="w-full"
              variant="destructive"
              onClick={() => onDeleteClick(item.id)}
              disabled={isPending}
            >
              <Trash2 className="h-4 w-4" />
              Удалить изображение
            </Button>
          </div>
        ))}
      </div>
    </StoryFormWrapper>
  );
};
