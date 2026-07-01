import { apiError, apiSuccess } from "./foundation";
import {
  handleAcceptTask,
  handleAssignTechnician,
  handleClassifyRequest,
  handleCloseRequest,
  handleAddRequestComment,
  handleCreateRequest,
  handleGetDashboardSummary,
  handleGetRequestDetail,
  handleListTechnicianTasks,
  handleListUsers,
  handleListRequests,
  handleReopenRequest,
  handleReviewRequest,
  handleUpdateWorkStatus,
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

    if (url.pathname === "/api/users" && request.method === "GET") {
      return handleListUsers(request, env.DB);
    }

    if (url.pathname === "/api/technician/tasks" && request.method === "GET") {
      return handleListTechnicianTasks(request, env.DB);
    }

    if (url.pathname === "/api/dashboard/summary" && request.method === "GET") {
      return handleGetDashboardSummary(request, env.DB);
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

    const reviewMatch = url.pathname.match(/^\/api\/requests\/([^/]+)\/review$/);
    if (reviewMatch && request.method === "POST") {
      return handleReviewRequest(
        request,
        env.DB,
        decodeURIComponent(reviewMatch[1]),
      );
    }

    const classificationMatch = url.pathname.match(
      /^\/api\/requests\/([^/]+)\/classification$/,
    );
    if (classificationMatch && request.method === "PATCH") {
      return handleClassifyRequest(
        request,
        env.DB,
        decodeURIComponent(classificationMatch[1]),
      );
    }

    const assignmentMatch = url.pathname.match(
      /^\/api\/requests\/([^/]+)\/assignment$/,
    );
    if (assignmentMatch && request.method === "POST") {
      return handleAssignTechnician(
        request,
        env.DB,
        decodeURIComponent(assignmentMatch[1]),
      );
    }

    const acceptMatch = url.pathname.match(/^\/api\/requests\/([^/]+)\/accept$/);
    if (acceptMatch && request.method === "POST") {
      return handleAcceptTask(
        request,
        env.DB,
        decodeURIComponent(acceptMatch[1]),
      );
    }

    const workStatusMatch = url.pathname.match(
      /^\/api\/requests\/([^/]+)\/work-status$/,
    );
    if (workStatusMatch && request.method === "PATCH") {
      return handleUpdateWorkStatus(
        request,
        env.DB,
        decodeURIComponent(workStatusMatch[1]),
      );
    }

    const closeMatch = url.pathname.match(/^\/api\/requests\/([^/]+)\/close$/);
    if (closeMatch && request.method === "POST") {
      return handleCloseRequest(
        request,
        env.DB,
        decodeURIComponent(closeMatch[1]),
      );
    }

    const reopenMatch = url.pathname.match(
      /^\/api\/requests\/([^/]+)\/reopen$/,
    );
    if (reopenMatch && request.method === "POST") {
      return handleReopenRequest(
        request,
        env.DB,
        decodeURIComponent(reopenMatch[1]),
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
