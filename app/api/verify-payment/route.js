import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSign = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(sign)
    .digest("hex");

  if (expectedSign === razorpay_signature) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json(
      { success: false },
      { status: 400 }
    );
  }
}
