import { getStoryById } from "@/entities/story/services/get-story-by-id";
import { EditStoryPreview } from "@/features/stories/ui/edit/edit-story-preview";
import { StoryItemsList } from "@/features/stories/ui/edit/story-items-list";
import { UploadStoryItems } from "@/features/stories/ui/edit/upload-story-items";
import { routes } from "@/shared/constants/routes";
import { currentRoleAsync } from "@/shared/lib/auth-js/current-role";
import { StoryItem, UserRole } from "@prisma/client";
import { redirect, unauthorized } from "next/navigation";

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const role = await currentRoleAsync();
  const hasAccess = role === UserRole.ADMIN || role === UserRole.MANAGER;

  if (!hasAccess) {
    unauthorized();
  }

  const { id } = await params;
  if (isNaN(Number(id))) {
    redirect(routes.notFound());
  }

  const story = await getStoryById(Number(id));
  if (!story) {
    redirect(routes.notFound());
  }

  return (
    <div className="space-y-3">
      <EditStoryPreview storyId={story.id} previewUrl={story.previewImageUrl} />
      <StoryItemsList items={story.items as StoryItem[]} />
      <UploadStoryItems storyId={story.id} />
    </div>
  );
};

export default Page;
