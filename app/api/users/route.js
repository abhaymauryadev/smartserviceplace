import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

// GET current user's profile
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  const user = await User.findById(session.user.id).select("-password");
  return NextResponse.json(user);
}

// PATCH update user profile
export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    // Only allow updating certain fields
    const allowedUpdates = ["name", "phone", "bio"];
    const updates = {};

    for (const key of allowedUpdates) {
      if (body[key] !== undefined) {
        updates[key] = body[key];
      }
    }

    // Validate name
    if (updates.name && updates.name.trim().length < 2) {
      return NextResponse.json(
        { message: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    // Validate bio length
    if (updates.bio && updates.bio.length > 500) {
      return NextResponse.json(
        { message: "Bio must be 500 characters or less" },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    return NextResponse.json(
      { message: "Failed to update profile", error: error.message },
      { status: 500 }
    );
  }
}
