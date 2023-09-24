import connectToDB from "@/database/config/db";
import Blog from "@/database/models/postModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  try {
    const blogs = await Blog.find({ user: params.id }).populate("user");
    return NextResponse.json(
      { message: "All Blogs fetched", blogs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error, Try again later : ${error}` },
      { status: 500 }
    );
  }
}
