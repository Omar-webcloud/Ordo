import request from "supertest";
import app from "../src/app.js";

describe("Auth Endpoints Validation", () => {
  it("POST /api/v1/auth/register should fail validation if missing fields", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send({
        email: "notanemail",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.errors).toBeDefined();
  });

  it("POST /api/v1/auth/login should fail validation if missing password", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: "test@example.com",
      });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("GET /api/v1/auth/me should reject request without Bearer token", async () => {
    const res = await request(app).get("/api/v1/auth/me");
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
