import connectToDB from "@/database/config/db";
import Blog from "@/database/models/postModel";
import User from "@/database/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  await connectToDB();

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = parseInt(searchParams.get("limit") ?? "10");

  const skip = (page - 1) * limit;

  try {
    const blogs = await Blog.find()
      .populate({
        path: "user",
        model: User,
      })
      .populate({ path: "comments.user", model: User })
      .populate({ path: "comments.replies.user", model: User })
      .populate({ path: "upvotes", model: User })
      .populate({ path: "downvotes", model: User })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

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
