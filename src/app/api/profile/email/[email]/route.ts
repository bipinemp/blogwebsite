import connectToDB from "@/database/config/db";
import User from "@/database/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { email: string } }
) {
  await connectToDB();
  try {
    const userData = await User.find({ email: params.email });
    return NextResponse.json(
      { message: "User Profile", userData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Internal Server Error, Try again later : ${error}` },
      { status: 500 }
    );
  }
}
