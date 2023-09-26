import connectToDB from "@/database/config/db";
import Blog from "@/database/models/postModel";
import { blogSchema } from "@/types/postTypes";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import User from "@/database/models/userModel";
import { ObjectId } from "mongodb";

type UserData = {
  _id: ObjectId;
  name: string;
  email: string;
  image: string;
  emailVerified: string | null | undefined;
};

export async function POST(req: NextRequest) {
  const { title, body } = await req.json();
  const data = { title, body };
  const token = await getToken({ req });
  const userDetails = (await User.findOne({ email: token?.email })) as UserData;

  try {
    await connectToDB();

    // Validating the input using zod
    const validatedData = blogSchema.parse(data);
    const { title, body } = validatedData;

    // Saving to Database
    const blog = await Blog.create({ user: userDetails?._id, title, body });

    // Sending Success message
    return NextResponse.json(
      { message: "Blog Created Successfully", blog },
      { status: 201 }
    );
  } catch (error) {
    // Handling Validation error using zod
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: `Something bad happened, Try again : ${error}` },
      { status: 400 }
    );
  }
}
