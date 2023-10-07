import connectToDB from "@/database/config/db";
import Blog from "@/database/models/postModel";
import User from "@/database/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectToDB();

    const blogs = await Blog.find()
      .populate({
        path: "user",
        model: User,
      })
      .populate({ path: "comments.user", model: User })
      .populate({ path: "comments.replies.user", model: User })
      .populate({ path: "upvotes", model: User })
      .populate({ path: "downvotes", model: User });

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    // Search filter
    const filteredBlogs = blogs.filter((blog) => {
      return (
        blog.title.toLowerCase().includes(query?.toLowerCase()) ||
        blog.body.toLowerCase().includes(query?.toLowerCase())
      );
    });

    return NextResponse.json(
      { message: "Search Successfull", filteredBlogs },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
