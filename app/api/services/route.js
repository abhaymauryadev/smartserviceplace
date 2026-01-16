import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

export async function GET() {
  try {
    await connectDB();
    const services = await Service.find({ isActive: true }).populate(
      "provider",
      "name"
    );
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { message: "Failed to fetch services", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "provider") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    await connectDB();

    const service = await Service.create({
      provider: session.user.id,
      title: body.title,
      description: body.description,
      price: body.price,
      pricingModel: body.pricingModel,
      duration: body.duration,
      category: body.category,
      images: body.images || [],
    });
    return NextResponse.json(service, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json(
      { message: "Failed to create service", error: error.message },
      { status: 500 }
    );
  }

}