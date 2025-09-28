"use client";

import { toast } from "sonner";
import { uploadStoryPreview } from "../actions/upload-story-preview";
import { StoryFormWrapper } from "../ui/story-form-wrapper";
import { UploadImageForm } from "../../../shared/components/images/upload-image-form";

export const UploadStoryPreview = () => {
  const onSave = async (publicUrl: string) => {
    try {
      await uploadStoryPreview(publicUrl);
    } catch (error) {
      if (
        !(error instanceof Error) ||
        !error.message.includes("NEXT_REDIRECT")
      ) {
        toast.info("Произошла ошибка");
      }
    }
  };

  return (
    <StoryFormWrapper headerLabel="Загрузите обложку баннера">
      <UploadImageForm onSave={onSave} width={400} height={500} />
    </StoryFormWrapper>
  );
};
