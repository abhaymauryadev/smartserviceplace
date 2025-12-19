import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

export async function GET() {
  await connectDB();
  const services = await Service.find({ isActive: true }).populate(
    "provider",
    "name"
  );
  return NextResponse.json(services);
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "provider") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const body = await req.json();
  await connectDB();

  const service = await Service.create({
    ...body,
    provider: session.user.id,
  });

  return NextResponse.json(service, { status: 201 });
}
