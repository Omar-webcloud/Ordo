import { NextRequest } from "next/server";
import { connectDB } from "@lib/mongoose";
import { getTokenFromRequest, verifyToken, apiSuccess, apiError } from "@lib/serverAuth";
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

    const { id } = await params;
    await connectDB();

    const task = await Task.findById(id)
      .populate("project", "name owner members")
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    if (!task) return apiError("Task not found", 404);

    const project = task.project as any;
    const isMember = project.members.some(
      (m: any) => m.toString() === user.id || m._id?.toString() === user.id
    );
    if (!isMember) return apiError("You do not have access to this task", 403);

    return apiSuccess({ task }, "Task retrieved successfully");
  } catch (err: any) {
    return apiError(err.message || "Internal server error", 500);
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await auth(req);
    if (!user) return apiError("Authentication required", 401);

    const { id } = await params;
    await connectDB();

    const task = await Task.findById(id).populate("project", "owner members");
    if (!task) return apiError("Task not found", 404);

    const project = task.project as any;
    const isMember = project.members.some(
      (m: any) => m.toString() === user.id || m._id?.toString() === user.id
    );
    if (!isMember) return apiError("You do not have access to this task", 403);

    const body = await req.json();
    const allowed = ["title", "description", "assignedTo", "status", "priority", "dueDate"];
    for (const field of allowed) {
      if (body[field] !== undefined) (task as any)[field] = body[field];
    }
    await task.save();

    const updated = await Task.findById(id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    return apiSuccess({ task: updated }, "Task updated successfully");
  } catch (err: any) {
    return apiError(err.message || "Internal server error", 500);
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await auth(req);
    if (!user) return apiError("Authentication required", 401);

    const { id } = await params;
    await connectDB();

    const task = await Task.findById(id).populate("project", "owner members");
    if (!task) return apiError("Task not found", 404);

    const project = task.project as any;
    const isOwner = project.owner.toString() === user.id;
    const isCreator = task.createdBy.toString() === user.id;

    if (!isOwner && !isCreator) {
      return apiError("Only the project owner or task creator can delete this task", 403);
    }

    await Task.findByIdAndDelete(id);
    return apiSuccess(null, "Task deleted successfully");
  } catch (err: any) {
    return apiError(err.message || "Internal server error", 500);
  }
}
