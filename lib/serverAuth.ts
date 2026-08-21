import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export function signToken(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
}

export function verifyToken(token: string): { id: string } {
  return jwt.verify(token, JWT_SECRET) as { id: string };
}

export function getTokenFromRequest(req: NextRequest): string | null {
  const auth = req.headers.get("Authorization");
  if (!auth || !auth.startsWith("Bearer ")) return null;
  return auth.split(" ")[1];
}

export function apiSuccess(data: object, message: string, status = 200) {
  return Response.json({ success: true, message, data }, { status });
}

export function apiError(message: string, status: number, errors?: object[]) {
  return Response.json(
    { success: false, message, statusCode: status, ...(errors ? { errors } : {}) },
    { status }
  );
}
