import { NextRequest } from "next/server";
import { connectDB } from "@lib/mongoose";
import { getTokenFromRequest, verifyToken, apiSuccess, apiError } from "@lib/serverAuth";
import Comment from "@models/Comment.js";

async function auth(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  try { return verifyToken(token); } catch { return null; }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await auth(req);
    if (!user) return apiError("Authentication required", 401);

    const { id } = await params;
    await connectDB();

    const comment = await Comment.findById(id);
    if (!comment) return apiError("Comment not found", 404);

    if (comment.author.toString() !== user.id) {
      return apiError("You can only delete your own comments", 403);
    }

    await Comment.findByIdAndDelete(id);
    return apiSuccess(null, "Comment deleted successfully");
  } catch (err: any) {
    return apiError(err.message || "Internal server error", 500);
  }
}
