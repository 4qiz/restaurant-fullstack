import { UploadStoryPreview } from "@/features/stories/containers/upload-story-preview";
import { currentRoleAsync } from "@/shared/lib/auth-js/current-role";
import { UserRole } from "@prisma/client";
import { unauthorized } from "next/navigation";
import React from "react";

export const dynamic = "force-dynamic";

const Page = async () => {
  const role = await currentRoleAsync();
  const hasAccess = role === UserRole.ADMIN || role === UserRole.MANAGER;

  if (!hasAccess) {
    unauthorized();
  }
  return <UploadStoryPreview />;
};

export default Page;
