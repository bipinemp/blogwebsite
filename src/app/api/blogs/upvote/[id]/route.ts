import connectToDB from "@/database/config/db";
import Blog, { BlogType } from "@/database/models/postModel";
import User from "@/database/models/userModel";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();
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
    const blog = await Blog.findById(blogId).populate({
      path: "user",
      model: User,
    });

    if (!blog) {
      return NextResponse.json(
        { message: "No such blog exists" },
        { status: 400 }
      );
    }

    if (blog && blog.upvotes && blog.downvotes) {
      if (
        !blog?.upvotes.includes(userDetails?._id) &&
        blog?.downvotes.includes(userDetails?._id)
      ) {
        blog.upvotes.push(userDetails?._id);
        blog.downvotes.pull(userDetails?._id);
        await blog.save();
      } else if (
        !blog?.upvotes.includes(userDetails?._id) &&
        !blog?.downvotes.includes(userDetails._id)
      ) {
        blog.upvotes.push(userDetails?._id);
        await blog.save();
      } else {
        blog.upvotes.pull(userDetails?._id);
        await blog.save();
      }
      return NextResponse.json(
        { message: "Blog liked Successfully", blog },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Blog not available" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong : ${error}` },
      { status: 400 }
    );
  }
}
