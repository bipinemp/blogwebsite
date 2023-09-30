import Blog, { BlogType } from "@/database/models/postModel";
import User from "@/database/models/userModel";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = await getToken({ req });
  const userDetails = await User.findOne({ email: token?.email });

  const { id } = params;
  const blogId = id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return NextResponse.json(
      { message: "No such Blog exists" },
      { status: 400 }
    );
  }

  try {
    const blog = await Blog.findById(blogId);

    if (blog) {
      if (!blog.likes.includes(userDetails?._id)) {
        blog.likes.push(userDetails?._id);
        await blog.save();
      }
      return NextResponse.json(
        { message: "Blog liked Successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Blog not available" },
        { status: 200 }
      );
    }
  } catch (error) {}
}
