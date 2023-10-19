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

type Like = {
  _id: string;
  user: UserData;
  createdAt: string;
};

type Comment = {
  user: UserData;
  comment: string;
  _id: string;
  replies: Comment[];
  createdAt: string; // Change to the appropriate type if necessary
};

export type Blog = {
  _id: string;
  user: UserData;
  title: string;
  body: string;
  description: string;
  edited: boolean;
  createdAt: string; // Change to the appropriate type if necessary
  updatedAt: string; // Change to the appropriate type if necessary
  __v: number;
  comments: Comment[];
  likes: Like[]; // Change to the appropriate type if necessary
  save(): Promise<Blog>;
};

type BlogDetails = {
  message: string;
  blog: Blog;
};

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { title, body, description } = await req.json();
  const token = await getToken({ req });
  const userDetails = (await User.findOne({ email: token?.email })) as UserData;

  const { id } = params;
  const blogId = id;

  if (!mongoose.Types.ObjectId.isValid(blogId)) {
    return NextResponse.json(
      { message: "No such blog exists" },
      { status: 400 }
    );
  }

  try {
    const blog = (await Blog.findOne({ _id: blogId }).populate({
      path: "user",
      model: User,
    })) as Blog;
    if (blog?.user?._id.toString() !== userDetails?._id.toString()) {
      return NextResponse.json({ message: "Not authorized" }, { status: 400 });
    }

    if (title) {
      blog.title = title;
    }

    if (body) {
      blog.body = body;
    }

    if (description) {
      blog.description = description;
    }

    blog.edited = true;

    const updatedBlog = await blog.save();
    return NextResponse.json(
      { message: "Blog updated Successfully", updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
