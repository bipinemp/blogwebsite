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

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();
  const { comment } = await req.json();
  const token = await getToken({ req });

  const userDetails = (await User.findOne({ email: token?.email })) as UserData;

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json(
      { message: "No such blog exists" },
      { status: 400 }
    );
  }

  const userId = userDetails?._id;
  const blog = await Blog.findOne({ _id: params.id }).populate("user");

  try {
    if (blog) {
      blog.comments.push({ user: userId, comment });
      await blog.save();
      return NextResponse.json(
        { message: "Comment on Blog Successfull" },
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
