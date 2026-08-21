import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@lib/mongoose";
import { signToken, apiSuccess, apiError } from "@lib/serverAuth";
import User from "@models/User.js";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    if (!email?.trim() || !password) return apiError("Email and password are required", 400);

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail }).select("+password");
    if (!user) return apiError("Invalid email or password", 401);

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return apiError("Invalid email or password", 401);

    const token = signToken({ id: user._id.toString() });

    return apiSuccess(
      { user: { id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt, updatedAt: user.updatedAt }, token },
      "Login successful"
    );
  } catch (err: any) {
    console.error("[login]", err);
    return apiError(err.message || "Internal server error", 500);
  }
}
