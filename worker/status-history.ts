import type { ActorContext, RequestStatus } from "./foundation";
import { canTransitionStatus } from "./foundation";

export class StatusTransitionError extends Error {
  constructor(
    readonly fromStatus: RequestStatus | null,
    readonly toStatus: RequestStatus,
  ) {
    super(`Invalid status transition: ${fromStatus ?? "NONE"} -> ${toStatus}`);
    this.name = "StatusTransitionError";
  }
}

export class StatusTransitionWriteError extends Error {
  constructor(readonly requestId: string) {
    super(`Status transition did not update request: ${requestId}`);
    this.name = "StatusTransitionWriteError";
  }
}

export interface TransitionRequestStatusInput {
  db: D1Database;
  requestId: string;
  fromStatus: RequestStatus | null;
  toStatus: RequestStatus;
  actor: ActorContext;
  reason?: string;
  now?: string;
}

const STATUS_TIMESTAMP_COLUMN: Partial<Record<RequestStatus, string>> = {
  UNDER_REVIEW: "reviewed_at",
  ASSIGNED: "assigned_at",
  RESOLVED: "resolved_at",
  CLOSED: "closed_at",
};

export async function transitionRequestStatus({
  db,
  requestId,
  fromStatus,
  toStatus,
  actor,
  reason,
  now = new Date().toISOString(),
}: TransitionRequestStatusInput): Promise<void> {
  if (!canTransitionStatus(fromStatus, toStatus)) {
    throw new StatusTransitionError(fromStatus, toStatus);
  }

  const timestampColumn = STATUS_TIMESTAMP_COLUMN[toStatus];
  const timestampAssignment = timestampColumn ? `, ${timestampColumn} = ?` : "";
  const timestampValues = timestampColumn ? [now] : [];
  const statusMatch = fromStatus === null ? "" : " AND status = ?";
  const statusMatchValues = fromStatus === null ? [] : [fromStatus];

  const update = await db
    .prepare(
      `UPDATE service_requests SET status = ?, updated_at = ?${timestampAssignment} WHERE id = ?${statusMatch}`,
    )
    .bind(toStatus, now, ...timestampValues, requestId, ...statusMatchValues)
    .run();

  if (update.meta.changes !== 1) {
    throw new StatusTransitionWriteError(requestId);
  }

  await db
    .prepare(
      `INSERT INTO request_status_history (
        id,
        service_request_id,
        from_status,
        to_status,
        changed_by_user_id,
        changed_by_role,
        reason,
        created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      crypto.randomUUID(),
      requestId,
      fromStatus,
      toStatus,
      actor.id,
      actor.role,
      reason ?? null,
      now,
    )
    .run();
}
