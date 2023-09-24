import connectToDB from "@/database/config/db";
import Blog from "@/database/models/postModel";
import User from "@/database/models/userModel";
import mongoose from "mongoose";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectToDB();

  // extracting the blog's id
  const { id } = params;

  // validating the blog's id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "No such Blog exists" },
      { status: 404 }
    );
  }

  // token for userId who's is logged In
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: "Not authorized" }, { status: 400 });
  }

  const user = await User.findOne({ email: token?.email });
  const userId = String(user?._id);

  // extracting blog from given id
  const blog = await Blog.findOne({ _id: id });
  const blogId = String(blog?.user?._id);

  // if logged In user's id matches the blog's author id
  if (userId !== blogId) {
    return NextResponse.json(
      { message: "Not authorized to DeleteBLog", userId, blogId },
      { status: 400 }
    );
  }

  try {
    await Blog.findByIdAndDelete({ _id: id });

    return NextResponse.json(
      { message: "Blog Deleted Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
