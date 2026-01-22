import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { amount } = await req.json();

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const order = await razorpay.orders.create({
            amount: amount * 100, // Amount in paise
            currency: "INR",
            receipt: "receipt_" + Date.now(),
        });

        return NextResponse.json(order);
    } catch (error) {
        return NextResponse.json(
            { error: "Order creation failed" },
            { status: 500 }
        );
    }
}
