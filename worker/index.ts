import { apiError, apiSuccess } from "./foundation";
import {
  handleCreateRequest,
  handleGetRequestDetail,
  handleListRequests,
} from "./requests";

interface Env {
  DB: D1Database;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/api/health" && request.method === "GET") {
      return apiSuccess({ status: "ok" });
    }

    if (url.pathname === "/api/requests" && request.method === "POST") {
      return handleCreateRequest(request, env.DB);
    }

    if (url.pathname === "/api/requests" && request.method === "GET") {
      return handleListRequests(request, env.DB);
    }

    const detailMatch = url.pathname.match(/^\/api\/requests\/([^/]+)$/);
    if (detailMatch && request.method === "GET") {
      return handleGetRequestDetail(
        request,
        env.DB,
        decodeURIComponent(detailMatch[1]),
      );
    }

    return apiError("NOT_FOUND", "Route not found.");
  },
} satisfies ExportedHandler<Env>;
