import { NextRequest } from "next/server";
import { connectDB } from "@lib/mongoose";
import { getTokenFromRequest, verifyToken, apiSuccess, apiError } from "@lib/serverAuth";
import Task from "@models/Task.js";
import Project from "@models/Project.js";

async function auth(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  try { return verifyToken(token); } catch { return null; }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await auth(req);
    if (!user) return apiError("Authentication required", 401);

    const { id: projectId } = await params;
    await connectDB();

    const project = await Project.findOne({ _id: projectId, members: user.id });
    if (!project) return apiError("Project not found or you are not a member", 404);

    const { searchParams } = new URL(req.url);
    const filter: Record<string, any> = { project: projectId };
    if (searchParams.get("status")) filter.status = searchParams.get("status");
    if (searchParams.get("priority")) filter.priority = searchParams.get("priority");
    if (searchParams.get("assignedTo")) filter.assignedTo = searchParams.get("assignedTo");
    if (searchParams.get("search")) {
      const q = searchParams.get("search") as string;
      filter.$or = [{ title: { $regex: q, $options: "i" } }, { description: { $regex: q, $options: "i" } }];
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    return apiSuccess({ tasks }, "Tasks retrieved successfully");
  } catch (err: any) {
    return apiError(err.message || "Internal server error", 500);
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await auth(req);
    if (!user) return apiError("Authentication required", 401);

    const { id: projectId } = await params;
    await connectDB();

    const project = await Project.findOne({ _id: projectId, members: user.id });
    if (!project) return apiError("Project not found or you are not a member", 404);

    const { title, description, assignedTo, status, priority, dueDate } = await req.json();
    if (!title?.trim()) return apiError("Task title is required", 400);

    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || "",
      assignedTo: assignedTo || undefined,
      status: status || "todo",
      priority: priority || "medium",
      dueDate: dueDate || null,
      project: projectId,
      createdBy: user.id,
    });

    const populated = await Task.findById(task._id)
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    return apiSuccess({ task: populated }, "Task created successfully", 201);
  } catch (err: any) {
    return apiError(err.message || "Internal server error", 500);
  }
}
