import type { User } from "../types/user";

export const MOCK_EMAIL = "demo@ordo.dev";
export const MOCK_PASSWORD = "password123";

export const mockUser: User = {
  id: "mock-user-001",
  name: "Demo User",
  email: MOCK_EMAIL,
  role: "user",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const mockLogin = (
  email: string,
  password: string
) => {
  if (
    email !== MOCK_EMAIL ||
    password !== MOCK_PASSWORD
  ) {
    throw new Error("Invalid email or password");
  }

  return {
    token: "mock-jwt-token",
    user: mockUser,
  };
};