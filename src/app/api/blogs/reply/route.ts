import connectToDB from "@/database/config/db";
import Blog from "@/database/models/postModel";
import User from "@/database/models/userModel";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

type UserData = {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  emailVerified: string | null | undefined;
};

export async function POST(req: NextRequest) {
  const url = new URL(req.url);

  const blogId = url.searchParams.get("blogId") as string;
  const commentId = url.searchParams.get("commentId") as string;

  await connectToDB();

  const { reply } = await req.json();

  const token = await getToken({ req });

  const userDetails = (await User.findOne({ email: token?.email })) as UserData;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return NextResponse.json(
      { message: "No such blog exists" },
      { status: 400 }
    );
  }

  const userId = userDetails?._id;
  const blog = await Blog.findOne({ _id: blogId }).populate({
    path: "user",
    model: User,
  });

  const comment = await blog.comments.find(
    (c: any) => c._id.toString() === commentId
  );

  if (!blog) {
    return NextResponse.json(
      { message: "No such blog exists" },
      { status: 400 }
    );
  }

  if (!comment) {
    return NextResponse.json(
      { message: "No such comment exists" },
      { status: 400 }
    );
  }

  try {
    if (blog && comment) {
      comment.replies.unshift({ user: userId, reply });
      await blog.save();
      const replyData = { userId, commentId };
      return NextResponse.json(
        { message: "Comment on Blog Successfull", replyData },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "No such Blog exists" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "something went wrong" },
      { status: 500 }
    );
  }
}
