"use client";

import { useState, useMemo, useEffect } from "react";
import type { User } from "@/types/user";

export default function UserTable({ users, setUsers }: { users: User[]; setUsers: (u: User[]) => void }) {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newUser, setNewUser] = useState<User>({ id: 0, username: "", email: "", role: "user" });
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    const handleDarkModeChange = (e: Event) => setIsDark((e as CustomEvent).detail);
    window.addEventListener("darkModeChange", handleDarkModeChange);
    return () => window.removeEventListener("darkModeChange", handleDarkModeChange);
  }, []);

  const selectAll = selectedIds.length === users.length && users.length > 0;

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      setSelectedIds(users.map((u) => u.id));
    }
  };

  const handleSelectRow = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = filterRole === "all" || user.role === filterRole;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, filterRole]);

  const handleDelete = (idx: number) => {
    setUsers(users.filter((_, i) => i !== idx));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setNewUser({ ...user });
  };

  const handleSave = () => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === editingUser.id ? newUser : u)));
      setEditingUser(null);
    }
    setShowAddForm(false);
    setNewUser({ id: 0, username: "", email: "", role: "user" });
  };

  const handleAdd = () => {
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setShowAddForm(false);
    setNewUser({ id: 0, username: "", email: "", role: "user" });
  };

  const roles = ["admin", "moderator", "user"];

  const cardBg = isDark ? "#1a1a1a" : "#fff";
  const cardText = isDark ? "#ffffff" : "#01381e";
  const borderColor = isDark ? "#333333" : "#01381e";
  const inputBg = isDark ? "#000000" : "#fff";

  const roleBadgeStyle = (role: string) => ({
    padding: "0.25rem 0.75rem",
    borderRadius: "20px",
    fontSize: "0.8rem",
    backgroundColor:
      role === "admin"
        ? isDark
          ? "#1a4d2e"
          : "#c8d9b5"
        : role === "moderator"
          ? isDark
            ? "#2d4a1a"
            : "#d4e4c5"
          : isDark
            ? "#4a1a2d"
            : "#e8d4c5",
    color: role === "user" ? (isDark ? "#Dee2b1" : "#01381e") : "#Dee2b1",
  });

  const inputStyle = {
    padding: "0.5rem",
    border: `1px solid ${borderColor}`,
    borderRadius: "6px",
    fontSize: "0.9rem",
    backgroundColor: inputBg,
    color: cardText,
  };

  return (
    <div
      style={{
        backgroundColor: cardBg,
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        border: isDark ? "1px solid #333333" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 1, padding: "0.5rem 1rem", border: `1px solid ${borderColor}`, borderRadius: "6px", fontSize: "0.9rem", backgroundColor: inputBg, color: cardText }}
        />
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          style={inputStyle}
        >
          <option value="all">All Grades</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role === "admin" ? "Grade A" : role === "moderator" ? "Grade B" : "Grade C"}
            </option>
          ))}
        </select>
        <button
          onClick={() => setShowAddForm(true)}
          style={{
            backgroundColor: "#01381e",
            color: "white",
            padding: "0.5rem 1.25rem",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          + Add Student
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                backgroundColor: isDark ? "#0a2e1a" : "#e8e9d4",
                borderBottom: "2px solid #c5c994",
              }}
            >
              <th style={{ padding: "0.75rem", textAlign: "left", color: cardText }}>
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
              </th>
              <th style={{ padding: "0.75rem", textAlign: "left", color: cardText }}>Name</th>
              <th style={{ padding: "0.75rem", textAlign: "left", color: cardText }}>Email</th>
              <th style={{ padding: "0.75rem", textAlign: "left", color: cardText }}>Grade</th>
              <th style={{ padding: "0.75rem", textAlign: "left", color: cardText }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr
                key={user.id || idx}
                style={{ borderBottom: "1px solid #c5c994" }}
              >
                <td style={{ padding: "0.75rem" }}>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(user.id)}
                    onChange={() => handleSelectRow(user.id)}
                  />
                </td>
                <td style={{ padding: "0.75rem", fontWeight: 500, color: cardText }}>{user.username}</td>
                <td style={{ padding: "0.75rem", color: isDark ? "#94a3b8" : "#666" }}>{user.email}</td>
                <td style={{ padding: "0.75rem" }}>
                  <span style={roleBadgeStyle(user.role)}>
                    {user.role === "admin" ? "Grade A" : user.role === "moderator" ? "Grade B" : "Grade C"}
                  </span>
                </td>
                <td style={{ padding: "0.75rem" }}>
                  <button
                    onClick={() => handleEdit(user)}
                    style={{ marginRight: "0.5rem", padding: "0.25rem 0.75rem", backgroundColor: "#ffc107", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    style={{ padding: "0.25rem 0.75rem", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(showAddForm || editingUser) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: cardBg,
              padding: "2rem",
              borderRadius: "12px",
              width: "400px",
              border: `1px solid ${borderColor}`,
            }}
          >
            <h3 style={{ marginTop: 0, color: cardText }}>
              {editingUser ? "Edit Student" : "Add New Student"}
            </h3>
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                  color: cardText,
                }}
              >
                Student Name
              </label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: `1px solid ${borderColor}`,
                  borderRadius: "6px",
                  backgroundColor: inputBg,
                  color: cardText,
                }}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                  color: cardText,
                }}
              >
                Email
              </label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: `1px solid ${borderColor}`,
                  borderRadius: "6px",
                  backgroundColor: inputBg,
                  color: cardText,
                }}
              />
            </div>
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontSize: "0.9rem",
                  color: cardText,
                }}
              >
                Grade Level
              </label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  border: `1px solid ${borderColor}`,
                  borderRadius: "6px",
                  backgroundColor: inputBg,
                  color: cardText,
                }}
              >
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role === "admin" ? "Grade A" : role === "moderator" ? "Grade B" : "Grade C"}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingUser(null);
                }}
                style={{ padding: "0.5rem 1rem", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={editingUser ? handleSave : handleAdd}
                style={{ padding: "0.5rem 1rem", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "6px", cursor: "pointer" }}
              >
                {editingUser ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
