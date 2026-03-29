import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { OrderModel } from "@/app/model/Order";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!id) return NextResponse.json({ error: "Order ID required" }, { status: 400 });

    await dbConnect();
    const order = await OrderModel.findOne({ id }).lean();
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Error in GET /api/orders/[id]:", error);
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 });
  }
}
