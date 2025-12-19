import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  // Simulated payment success
  return NextResponse.json({
    success: true,
    paymentId: "PAY_" + Date.now(),
    amount: body.amount,
  });
}
