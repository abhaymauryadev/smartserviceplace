import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db.js";
import User from "@/models/User.js";

export async function POST(req) {
    try {
        const body = await req.json();
        const { name, email, password, role } = body;

        await connectDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Registration failed" },
            { status: 500 }
        );
    }
}
