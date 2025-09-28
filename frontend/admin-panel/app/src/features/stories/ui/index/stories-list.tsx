"use client";

import { routes } from "@/shared/constants/routes";
import { useIsMobile } from "@/shared/hooks/use-mobile";
import { Api } from "@/shared/lib/api/api-client";
import { IStory } from "@/shared/lib/api/stories";
import { Badge } from "@/shared/ui/badge";
import { Card } from "@/shared/ui/card";
import { ResponsiveButton } from "@/shared/ui/responsive-button";
import { Separator } from "@/shared/ui/separator";
import { Skeleton } from "@/shared/ui/skeleton";
import { Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const StoriesList = () => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [loading, setLoading] = useState(true);

  const isMobile = useIsMobile();

  useEffect(() => {
    async function fetchStories() {
      const data = await Api.stories.getAll();
      setStories(data);
      setLoading(false);
    }

    fetchStories();
  }, []);
  return (
    <div className="flex flex-col gap-4">
      {loading
        ? Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-full h-[157px]  rounded-lg" />
          ))
        : stories.map((story) => (
            <Link key={story.id} href={routes.storiesId(story.id)}>
              <Card className="flex items-center justify-between p-4 w-full shadow-sm">
                <div className="flex items-center space-x-4">
                  <img
                    src={story.previewImageUrl}
                    alt={`Story ${story.id}`}
                    className="w-[100px] h-[125px] object-cover rounded-lg "
                  />

                  <Separator orientation="vertical" className=" h-24 " />

                  {isMobile ? (
                    <Badge
                      variant={"secondary"}
                      className="px-3 py-1 text-sm  rounded-full"
                    >
                      +{story.items.length}
                    </Badge>
                  ) : (
                    story.items.map((item) => (
                      <Image
                        key={item.id}
                        alt="item"
                        src={item.sourceUrl}
                        className="  h-[125px] object-cover rounded-lg"
                        width={80}
                        height={125}
                      />
                    ))
                  )}
                </div>
                <ResponsiveButton
                  text="Редактировать"
                  icon={<Pencil />}
                  variant="outline"
                />
              </Card>
            </Link>
          ))}
    </div>
  );
};
