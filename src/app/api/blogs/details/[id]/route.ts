import connectToDB from "@/database/config/db";
import Blog from "@/database/models/postModel";
import User from "@/database/models/userModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectToDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Blog not found" }, { status: 400 });
  }

  try {
    const blog = await Blog.findById(id)
      .populate({
        path: "user",
        model: User,
      })
      .populate({ path: "comments.user", model: User })
      .populate({ path: "comments.replies.user", model: User });

    return NextResponse.json(
      { message: "Blog Details Read Successfully", blog },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
