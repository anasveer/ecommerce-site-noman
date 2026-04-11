import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";
import { OrderModel } from "@/app/model/Order";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    if (!payload?.id || !payload?.user || !Array.isArray(payload.items)) {
      return NextResponse.json({ error: "Invalid order payload" }, { status: 400 });
    }

    await dbConnect();

    const orderData = {
      id: payload.id,
      user: {
        fullName: payload.user.fullName,
        email: payload.user.email,
        phone: payload.user.phone,
        city: payload.user.city,
        address: payload.user.address,
      },
      items: payload.items.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: Number(item.price || 0),
        quantity: Number(item.quantity || 0),
        image: item.image || "",
        barcode: item.barcode || "",
        mainCategory: item.mainCategory || "",
        subCategory: item.subCategory || "",
        kg: Number(item.kg || 1),
      })),
      total: Number(payload.total || 0),
      shippingCost: Number(payload.shippingCost || 0),
      amountPayable: Number(payload.amountPayable || 0),
      paymentMode: payload.paymentMode || "",
      paymentInfo: payload.paymentInfo || "",
      paymentScreenshot: payload.paymentScreenshot || null,
      status: payload.status || "pending",
      createdAt: payload.createdAt ? new Date(payload.createdAt) : new Date(),
    };

    const order = await OrderModel.findOneAndUpdate(
      { id: orderData.id },
      orderData,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Error in POST /api/orders:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Failed to save order", details: errorMessage }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");
    const admin = searchParams.get("admin");

    await dbConnect();

    if (admin === "true") {
      const orders = await OrderModel.find({}).sort({ createdAt: -1 }).lean();
      return NextResponse.json(orders);
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const orders = await OrderModel.find({ "user.phone": phone }).sort({ createdAt: -1 }).lean();

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Error in GET /api/orders:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    await dbConnect();
    await OrderModel.deleteOne({ id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in DELETE /api/orders:", error);
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: "Order ID and status are required" }, { status: 400 });
    }

    await dbConnect();
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { id },
      { status },
      { new: true }
    );

    return NextResponse.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.error("Error in PATCH /api/orders:", error);
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
