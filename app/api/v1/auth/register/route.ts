import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import { connectDB } from "@lib/mongoose";
import { signToken, apiSuccess, apiError } from "@lib/serverAuth";
import User from "@models/User.js";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!name?.trim() || !email?.trim() || !password) {
      return apiError("Name, email, and password are required", 400);
    }
    if (password.length < 6) {
      return apiError("Password must be at least 6 characters", 400);
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) return apiError("Email is already registered", 409);

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({ name: name.trim(), email: normalizedEmail, password: hashedPassword });

    const token = signToken({ id: user._id.toString() });

    return apiSuccess(
      { user: { id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt, updatedAt: user.updatedAt }, token },
      "User registered successfully",
      201
    );
  } catch (err: any) {
    console.error("[register]", err);
    return apiError(err.message || "Internal server error", 500);
  }
}
