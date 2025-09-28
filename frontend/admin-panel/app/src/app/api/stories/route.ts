import { getStories } from "@/entities/story/services/get-stories";
import { apiRoutes } from "@/shared/constants/routes";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const stories = await getStories();

    return NextResponse.json(stories);
  } catch (error) {
    console.log(apiRoutes.getStories, error);
    return NextResponse.json(
      { message: "Error retrieving stories" },
      { status: 500 }
    );
  }
}
