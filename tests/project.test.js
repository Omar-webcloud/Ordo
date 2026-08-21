import request from "supertest";
import app from "../src/app.js";

describe("Project Endpoints Guard & Validation", () => {
  it("GET /api/v1/projects should reject unauthorized request", async () => {
    const res = await request(app).get("/api/v1/projects");
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("POST /api/v1/projects should reject unauthorized request", async () => {
    const res = await request(app)
      .post("/api/v1/projects")
      .send({ name: "My Project" });
    expect(res.statusCode).toBe(401);
  });
});
