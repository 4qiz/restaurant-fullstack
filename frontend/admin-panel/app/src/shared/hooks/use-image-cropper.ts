import { convertBase64ToFile } from "@/shared/lib/files/convert-base64-to-file";
import {
  getPresignedUrl,
  handleUploadOne,
  MAX_FILE_SIZE_NEXTJS_ROUTE,
  validateFiles,
} from "@/shared/lib/minio/helpers-client";
import { useState, useRef } from "react";
import { toast } from "sonner";

export interface UseImageCropperProps {
  width: number;
  height: number;
  onSave: (publicUrl: string) => Promise<void>;
}

export const useImageCropper = ({
  width,
  height,
  onSave,
}: UseImageCropperProps) => {
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const cropperRef = useRef<HTMLImageElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setLoading(false);
  };

  const handleCrop = () => {
    // @ts-expect-error fix
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      const croppedDataURL = cropper
        .getCroppedCanvas({ width, height })
        .toDataURL();
      setCroppedImage(croppedDataURL);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!croppedImage) {
      toast.info("Необходимо обрезать изображение");
      return;
    }

    try {
      setLoading(true);
      const file = convertBase64ToFile(croppedImage, "story.png");

      if (file) {
        const shortFileProp = {
          originalFileName: file.name,
          fileSize: file.size,
        };
        const error = validateFiles(
          [shortFileProp],
          MAX_FILE_SIZE_NEXTJS_ROUTE
        );
        if (error) {
          toast.error(error);
          return;
        }

        const presignedUrl = await getPresignedUrl(shortFileProp);
        await handleUploadOne(file, presignedUrl, () => {
          toast.success("Файл успешно загружен");
        });

        await onSave(presignedUrl.publicUrl);
      }
    } catch (error) {
      toast.info("Произошла ошибка");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    image,
    croppedImage,
    cropperRef,
    handleFileChange,
    handleCrop,
    handleSubmit,
  };
};
