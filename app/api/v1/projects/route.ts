import { NextRequest } from "next/server";
import { connectDB } from "@lib/mongoose";
import { getTokenFromRequest, verifyToken, apiSuccess, apiError } from "@lib/serverAuth";
import Project from "@models/Project.js";

async function auth(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  try { return verifyToken(token); } catch { return null; }
}

export async function GET(req: NextRequest) {
  try {
    const user = await auth(req);
    if (!user) return apiError("Authentication required", 401);

    await connectDB();
    const projects = await Project.find({ members: user.id })
      .populate("owner", "name email")
      .populate("members", "name email")
      .sort({ createdAt: -1 });

    return apiSuccess({ projects }, "Projects retrieved successfully");
  } catch (err: any) {
    return apiError(err.message || "Internal server error", 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await auth(req);
    if (!user) return apiError("Authentication required", 401);

    await connectDB();
    const { name, description } = await req.json();
    if (!name?.trim()) return apiError("Project name is required", 400);

    const project = await Project.create({
      name: name.trim(),
      description: description?.trim() || "",
      owner: user.id,
      members: [user.id],
    });

    const populated = await Project.findById(project._id)
      .populate("owner", "name email")
      .populate("members", "name email");

    return apiSuccess({ project: populated }, "Project created successfully", 201);
  } catch (err: any) {
    return apiError(err.message || "Internal server error", 500);
  }
}
