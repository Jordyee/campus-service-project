import { apiError, apiSuccess } from "./foundation";

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health" && request.method === "GET") {
      return apiSuccess({ status: "ok" });
    }

    return apiError("NOT_FOUND", "Route not found.");
  },
} satisfies ExportedHandler;
