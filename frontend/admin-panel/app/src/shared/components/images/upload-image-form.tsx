"use client";

import React, { useState } from "react";
import { Cropper } from "react-cropper";
import "cropperjs/dist/cropper.css";

import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import {
  useImageCropper,
  UseImageCropperProps,
} from "../../hooks/use-image-cropper";

export const UploadImageForm = ({
  width,
  height,
  onSave,
}: UseImageCropperProps) => {
  const [widthState] = useState<number>(width);
  const [heightState] = useState<number>(height);

  const {
    loading,
    image,
    cropperRef,
    handleFileChange,
    handleCrop,
    handleSubmit,
  } = useImageCropper({
    width: widthState,
    height: heightState,
    onSave: onSave,
  });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col lg:flex-row gap-6 lg:max-h-[70vh] "
    >
      {/* Левая часть: Input, Button, Preview */}
      <div className="flex flex-col gap-5 w-full lg:w-1/3">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full border rounded-md p-2 "
        />
        <Button disabled={loading} type="submit" className="w-full lg:w-auto">
          Опубликовать
        </Button>
      </div>

      {/* Правая часть: Cropper */}
      {image && (
        <div className="w-full lg:w-2/3 lg:min-h-96 rounded-lg overflow-hidden">
          <Cropper
            src={image}
            style={{ height: "100%", width: "100%" }}
            initialAspectRatio={widthState / heightState}
            aspectRatio={widthState / heightState}
            guides={false}
            cropend={handleCrop}
            ref={cropperRef}
            viewMode={2}
            autoCropArea={1}
          />
        </div>
      )}
    </form>
  );
};

// {/* Превью изображения */}
// {/* {croppedImage && false && (
//   <div className="flex flex-col items-center justify-center gap-3">
//     <div
//       className={cn(
//         `w-[${widthState}px] h-[${heightState}px]`,
//         " overflow-hidden border rounded-lg max-w-full max-h-[50vh]"
//       )}
//     >
//       <Image
//         src={croppedImage}
//         alt="Cropped Preview"
//         width={widthState}
//         height={heightState}
//         className=" object-contain w-full h-full aspect-[520/800]"
//         quality={100}
//       />
//     </div>
//     <CardDescription>Предпросмотр</CardDescription>
//   </div>
// )} */}
