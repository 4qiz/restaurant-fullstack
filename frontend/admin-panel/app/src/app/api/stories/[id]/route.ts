import { getStoryById } from "@/entities/story/services/get-story-by-id";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const story = await getStoryById(Number(id));

    if (!story) {
      return NextResponse.json({ message: "Story not found" }, { status: 404 });
    }

    return NextResponse.json(story);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error retrieving the story" },
      { status: 500 }
    );
  }
}
