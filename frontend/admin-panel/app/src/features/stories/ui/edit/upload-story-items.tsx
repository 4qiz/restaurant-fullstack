"use client";

import { UploadImageForm } from "@/shared/components/images/upload-image-form";
import { StoryFormWrapper } from "../story-form-wrapper";
import { uploadStoryItem } from "../../actions/upload-story-item";
import { toast } from "sonner";

export const UploadStoryItems = ({ storyId }: { storyId: number }) => {
  const onSave = async (publicUrl: string) => {
    try {
      await uploadStoryItem(storyId, publicUrl);
    } catch {
      toast.info("Произошла ошибка");
    }
  };

  return (
    <StoryFormWrapper headerLabel="Загрузить баннер" className="w-full">
      <UploadImageForm
        height={800}
        width={520}
        onSave={onSave}
      ></UploadImageForm>
    </StoryFormWrapper>
  );
};
