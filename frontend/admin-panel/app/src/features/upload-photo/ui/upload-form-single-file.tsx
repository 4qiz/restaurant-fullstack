"use client";

import {
  getPresignedUrls,
  handleUpload,
  MAX_FILE_SIZE_NEXTJS_ROUTE,
  validateFiles,
} from "@/shared/lib/minio/helpers-client";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// upload single file
export default function UploadFormSingleFile() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (file) {
        // Create the expected ShortFileProp array for the API
        const shortFileProp = {
          originalFileName: file.name,
          fileSize: file.size,
        };

        // Validate files before uploading
        const error = validateFiles(
          [shortFileProp],
          MAX_FILE_SIZE_NEXTJS_ROUTE // 4mb
        );
        if (error) {
          toast.error(error);
          return;
        }

        // Get presigned URLs from the API
        const presignedUrls = await getPresignedUrls([shortFileProp]);

        // Upload files using presigned URLs
        await handleUpload([file], presignedUrls, () => {
          toast.success("Files uploaded successfully");
          setFile(null); // Clear files after successful upload
        });

        // reload
        window.location.reload();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList && fileList[0]) {
      setFile(fileList[0]); // Set the single file
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        className="mb-2"
        type="file"
        disabled={loading}
        onChange={handleFileChange}
      />

      <Button type="submit" disabled={loading || !file} className="w-full">
        {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
        Upload
      </Button>
    </form>
  );
}
