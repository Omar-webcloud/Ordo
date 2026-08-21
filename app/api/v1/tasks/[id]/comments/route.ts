import { NextRequest } from "next/server";
import { connectDB } from "@lib/mongoose";
import { getTokenFromRequest, verifyToken, apiSuccess, apiError } from "@lib/serverAuth";
import Comment from "@models/Comment.js";
import Task from "@models/Task.js";

async function auth(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  try { return verifyToken(token); } catch { return null; }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await auth(req);
    if (!user) return apiError("Authentication required", 401);

    const { id: taskId } = await params;
    await connectDB();

    const task = await Task.findById(taskId).populate("project", "members");
    if (!task) return apiError("Task not found", 404);

    const project = task.project as any;
    const isMember = project.members.some(
      (m: any) => m.toString() === user.id || m._id?.toString() === user.id
    );
    if (!isMember) return apiError("You do not have access to this task", 403);

    const comments = await Comment.find({ task: taskId })
      .populate("author", "name email")
      .sort({ createdAt: 1 });

    return apiSuccess({ comments }, "Comments retrieved successfully");
  } catch (err: any) {
    return apiError(err.message || "Internal server error", 500);
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await auth(req);
    if (!user) return apiError("Authentication required", 401);

    const { id: taskId } = await params;
    await connectDB();

    const task = await Task.findById(taskId).populate("project", "members");
    if (!task) return apiError("Task not found", 404);

    const project = task.project as any;
    const isMember = project.members.some(
      (m: any) => m.toString() === user.id || m._id?.toString() === user.id
    );
    if (!isMember) return apiError("You do not have access to comment on this task", 403);

    const { content } = await req.json();
    if (!content?.trim()) return apiError("Comment content is required", 400);

    const comment = await Comment.create({ task: taskId, author: user.id, content: content.trim() });
    const populated = await Comment.findById(comment._id).populate("author", "name email");

    return apiSuccess({ comment: populated }, "Comment added successfully", 201);
  } catch (err: any) {
    return apiError(err.message || "Internal server error", 500);
  }
}
