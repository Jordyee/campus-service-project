import React from "react";
import type { RequestStatus, Priority } from "../types/api";

const STATUS_LABELS: Record<RequestStatus, string> = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  ASSIGNED: "Assigned",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

const STATUS_CLASS: Record<RequestStatus, string> = {
  SUBMITTED: "badge badge-submitted",
  UNDER_REVIEW: "badge badge-under-review",
  ASSIGNED: "badge badge-assigned",
  IN_PROGRESS: "badge badge-in-progress",
  RESOLVED: "badge badge-resolved",
  CLOSED: "badge badge-closed",
};

const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
};

const PRIORITY_CLASS: Record<Priority, string> = {
  LOW: "badge badge-low",
  MEDIUM: "badge badge-medium",
  HIGH: "badge badge-high",
};

export function StatusBadge({ status }: { status: RequestStatus }) {
  return <span className={STATUS_CLASS[status]}>{STATUS_LABELS[status]}</span>;
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  return <span className={PRIORITY_CLASS[priority]}>{PRIORITY_LABELS[priority]}</span>;
}

export function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("id-ID", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
