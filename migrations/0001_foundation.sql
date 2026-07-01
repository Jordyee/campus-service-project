CREATE TABLE app_users (
  id TEXT PRIMARY KEY,
  role TEXT NOT NULL CHECK (
    role IN ('REPORTER', 'ADMINISTRATOR', 'TECHNICIAN', 'FACILITY_MANAGER')
  ),
  display_name TEXT NOT NULL,
  contact TEXT,
  is_active INTEGER NOT NULL DEFAULT 1 CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE service_requests (
  id TEXT PRIMARY KEY,
  request_number TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  location TEXT NOT NULL,
  category TEXT NOT NULL CHECK (
    category IN ('INTERNET', 'AC', 'PERALATAN_KELAS', 'KEBERSIHAN', 'LABORATORIUM', 'LAINNYA')
  ),
  priority TEXT NOT NULL DEFAULT 'MEDIUM' CHECK (
    priority IN ('LOW', 'MEDIUM', 'HIGH')
  ),
  status TEXT NOT NULL DEFAULT 'SUBMITTED' CHECK (
    status IN ('SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')
  ),
  reporter_user_id TEXT REFERENCES app_users(id),
  reporter_name TEXT NOT NULL,
  reporter_contact TEXT NOT NULL,
  reviewed_by_user_id TEXT REFERENCES app_users(id),
  reviewed_at TEXT,
  assigned_technician_id TEXT REFERENCES app_users(id),
  assigned_by_user_id TEXT REFERENCES app_users(id),
  assigned_at TEXT,
  accepted_at TEXT,
  resolved_at TEXT,
  closed_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE request_comments (
  id TEXT PRIMARY KEY,
  service_request_id TEXT NOT NULL REFERENCES service_requests(id),
  author_user_id TEXT REFERENCES app_users(id),
  author_role TEXT NOT NULL CHECK (
    author_role IN ('REPORTER', 'ADMINISTRATOR', 'TECHNICIAN', 'FACILITY_MANAGER')
  ),
  comment_type TEXT NOT NULL DEFAULT 'COMMENT' CHECK (
    comment_type IN ('COMMENT', 'NOTE')
  ),
  body TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE request_status_history (
  id TEXT PRIMARY KEY,
  service_request_id TEXT NOT NULL REFERENCES service_requests(id),
  from_status TEXT CHECK (
    from_status IS NULL OR from_status IN ('SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')
  ),
  to_status TEXT NOT NULL CHECK (
    to_status IN ('SUBMITTED', 'UNDER_REVIEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')
  ),
  changed_by_user_id TEXT REFERENCES app_users(id),
  changed_by_role TEXT NOT NULL CHECK (
    changed_by_role IN ('REPORTER', 'ADMINISTRATOR', 'TECHNICIAN', 'FACILITY_MANAGER')
  ),
  reason TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_service_requests_status ON service_requests(status);
CREATE INDEX idx_service_requests_category ON service_requests(category);
CREATE INDEX idx_service_requests_priority ON service_requests(priority);
CREATE INDEX idx_service_requests_location ON service_requests(location);
CREATE INDEX idx_service_requests_assigned_technician ON service_requests(assigned_technician_id);
CREATE INDEX idx_service_requests_created_at ON service_requests(created_at);
CREATE INDEX idx_request_comments_request ON request_comments(service_request_id, created_at);
CREATE INDEX idx_status_history_request ON request_status_history(service_request_id, created_at);

INSERT INTO app_users (id, role, display_name, contact) VALUES
  ('user-reporter-1', 'REPORTER', 'Demo Reporter', 'reporter@example.edu'),
  ('user-admin-1', 'ADMINISTRATOR', 'Demo Administrator', 'admin@example.edu'),
  ('user-tech-1', 'TECHNICIAN', 'Demo Technician', 'technician@example.edu'),
  ('user-manager-1', 'FACILITY_MANAGER', 'Demo Facility Manager', 'manager@example.edu');
