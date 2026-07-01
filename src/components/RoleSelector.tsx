import React from "react";
import type { Role } from "../types/api";
import { ROLES } from "../types/api";

const ROLE_LABELS: Record<Role, string> = {
  REPORTER: "Reporter",
  ADMINISTRATOR: "Administrator",
  TECHNICIAN: "Technician",
  FACILITY_MANAGER: "Facility Manager",
};

interface RoleSelectorProps {
  currentRole: Role;
  onChange: (role: Role) => void;
}

export default function RoleSelector({ currentRole, onChange }: RoleSelectorProps) {
  return (
    <div className="role-selector">
      <span className="role-selector-label">Peran Aktif:</span>
      <select
        id="actor-role"
        className="role-select"
        value={currentRole}
        onChange={(e) => onChange(e.target.value as Role)}
        aria-label="Pilih peran pengguna"
      >
        {ROLES.map((role) => (
          <option key={role} value={role}>
            {ROLE_LABELS[role]}
          </option>
        ))}
      </select>
    </div>
  );
}
