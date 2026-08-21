import request from "supertest";
import app from "../src/app.js";

describe("Ordo API Health & General Endpoints", () => {
  it("GET /health should return 200 and running message", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Ordo API is running");
  });

  it("GET /non-existent-route should return 404", async () => {
    const res = await request(app).get("/api/v1/non-existent");
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.statusCode).toBe(404);
  });

  it("GET /api/docs should serve swagger UI documentation", async () => {
    const res = await request(app).get("/api/docs/");
    expect(res.statusCode).toBe(200);
  });
});
