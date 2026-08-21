import { NextRequest } from "next/server";
import { connectDB } from "@lib/mongoose";
import { getTokenFromRequest, verifyToken, apiSuccess, apiError } from "@lib/serverAuth";
import User from "@models/User.js";

export async function GET(req: NextRequest) {
  try {
    const token = getTokenFromRequest(req);
    if (!token) return apiError("Authentication required", 401);

    let decoded: { id: string };
    try { decoded = verifyToken(token); } catch { return apiError("Invalid or expired token", 401); }

    await connectDB();
    const user = await User.findById(decoded.id);
    if (!user) return apiError("User not found", 404);

    return apiSuccess(
      { user: { id: user._id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt, updatedAt: user.updatedAt } },
      "User retrieved successfully"
    );
  } catch (err: any) {
    return apiError(err.message || "Internal server error", 500);
  }
}
