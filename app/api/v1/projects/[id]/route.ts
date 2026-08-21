import { NextRequest } from "next/server";
import { connectDB } from "@lib/mongoose";
import { getTokenFromRequest, verifyToken, apiSuccess, apiError } from "@lib/serverAuth";
import Project from "@models/Project.js";
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

    const project = await Project.findOne({ _id: id, members: user.id })
      .populate("owner", "name email")
      .populate("members", "name email");

    if (!project) return apiError("Project not found", 404);
    return apiSuccess({ project }, "Project retrieved successfully");
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

    const project = await Project.findOne({ _id: id, owner: user.id });
    if (!project) return apiError("Project not found or you are not the owner", 404);

    const { name, description } = await req.json();
    if (name !== undefined) project.name = name.trim();
    if (description !== undefined) project.description = description.trim();

    await project.save();
    return apiSuccess({ project }, "Project updated successfully");
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

    const project = await Project.findOne({ _id: id, owner: user.id });
    if (!project) return apiError("Project not found or you are not the owner", 404);

    await Task.deleteMany({ project: id });
    await Project.findByIdAndDelete(id);

    return apiSuccess(null, "Project deleted successfully");
  } catch (err: any) {
    return apiError(err.message || "Internal server error", 500);
  }
}
