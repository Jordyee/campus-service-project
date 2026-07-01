import { apiError, apiSuccess } from "./foundation";
import {
  handleAddRequestComment,
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

    const commentMatch = url.pathname.match(
      /^\/api\/requests\/([^/]+)\/comments$/,
    );
    if (commentMatch && request.method === "POST") {
      return handleAddRequestComment(
        request,
        env.DB,
        decodeURIComponent(commentMatch[1]),
      );
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
