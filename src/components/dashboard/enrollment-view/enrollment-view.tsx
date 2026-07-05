"use client";

import DataTable from "@/components/dashboard/common/data-table";
import {
  enrollmentLayoutStyle,
  formActionsStyle,
  formColumnStyle,
  formGridStyle,
  quickActionsStyle,
  sidebarColumnStyle,
} from "./enrollment-view.styles";
import { useEnrollmentViewData } from "./enrollment-view.hooks";

export default function EnrollmentView() {
  const {
    students,
    editing,
    form,
    setForm,
    startAdd,
    cancel,
    save,
    columns,
    exportCSV,
    clearAll,
  } = useEnrollmentViewData();

  return (
    <div className="fade-up">
      <div style={enrollmentLayoutStyle}>
        <div style={formColumnStyle}>
          <div className="card">
            <div className="card-title">Student Registration</div>
            <div style={formGridStyle}>
              <input
                placeholder="Full name"
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
              <input
                placeholder="Student ID"
                value={form.studentId}
                onChange={(event) => setForm({ ...form, studentId: event.target.value })}
              />
              <input
                placeholder="Class (e.g. Grade 10A)"
                value={form.class}
                onChange={(event) => setForm({ ...form, class: event.target.value })}
              />
              <select
                value={form.gender}
                onChange={(event) => setForm({ ...form, gender: event.target.value })}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
              <select
                value={form.status}
                onChange={(event) => setForm({ ...form, status: event.target.value })}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div style={formActionsStyle}>
              <button className="btn-primary" onClick={save}>
                {editing ? "Save" : "Add Student"}
              </button>
              <button className="btn-icon" onClick={cancel}>Cancel</button>
            </div>
          </div>
        </div>

        <div style={sidebarColumnStyle}>
          <div className="card">
            <div className="card-title">Quick Actions</div>
            <div style={quickActionsStyle}>
              <button className="btn-icon" onClick={startAdd}>
                New Student
              </button>
              <button
                className="btn-icon"
                onClick={clearAll}
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>

      <DataTable title="Student Directory" columns={columns} data={students} onExport={exportCSV} />
    </div>
  );
}


