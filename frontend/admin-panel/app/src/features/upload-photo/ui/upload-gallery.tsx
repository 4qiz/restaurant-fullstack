import { prisma } from "@/shared/lib/prisma-client";
import { toast } from "sonner";

export default async function UploadGallery() {
  const files = await prisma.file.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!files) {
    toast.error("Something went wrong");
    return <div>Something went wrong</div>;
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {files.map((file) => (
        // @next/next/no-img-element
        <img
          className="h-full rounded-md object-cover"
          key={file.fileId}
          alt="Image uploaded by user"
          src={file.url!}
        />
      ))}
    </div>
  );
}
