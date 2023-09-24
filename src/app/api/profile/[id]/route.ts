import User from "@/database/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: any } }
) {
  const { id } = params;

  const userData = await User.findOne({ _id: id });

  if (!userData) {
    return NextResponse.json({ message: "User  not found " }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Profile Data", userData },
    { status: 200 }
  );
}
