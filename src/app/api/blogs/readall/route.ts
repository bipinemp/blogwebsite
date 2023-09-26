import connectToDB from "@/database/config/db";
import Blog from "@/database/models/postModel";
import User from "@/database/models/userModel";
import { NextResponse } from "next/server";

export async function GET() {
  await connectToDB();
  try {
    const blogs = await Blog.find()
      .populate({
        path: "user",
        model: User,
      })
      .populate({ path: "comments.user", model: User });
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
