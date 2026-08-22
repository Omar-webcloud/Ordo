export function GET() {
  return Response.json({
    success: true,
    message: "Ordo API is running",
    data: {
      version: "v1",
      documentation: "/api/docs",
      authentication: "Bearer token required for protected endpoints",
    },
  });
}
