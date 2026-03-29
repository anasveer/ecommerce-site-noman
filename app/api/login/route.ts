import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Admin } from "@/lib/admin";
import { dbConnect } from "@/lib/mongodb";
import { createSessionToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    // ✅ DB connect
    await dbConnect();

    // ✅ Body parse
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    // ✅ Validation
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    // ✅ Find admin (correct way)
    const admin = await Admin.findOne({ email }).lean();

    if (!admin) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Compare password
    const isValid = await bcrypt.compare(password, admin.password);

    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }

    // ✅ Create token
    const token = await createSessionToken({
      userId: String(admin._id),
      email: admin.email,
      role: admin.role,
    });

    // ✅ Response
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      redirectTo: "/dashboard",
    });

    // ✅ Cookie set
    response.cookies.set("admin_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("LOGIN_ERROR", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}