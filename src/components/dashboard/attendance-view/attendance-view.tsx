"use client";

import DataTable from "@/components/dashboard/common/data-table";
import {
  attendanceLayoutStyle,
  formColumnStyle,
  historyNoteStyle,
  sidebarColumnStyle,
  summaryCardStyle,
  summaryCardsStyle,
  summaryGridStyle,
  summaryLabelStyle,
  summaryValueStyle,
  toolbarActionsStyle,
  toolbarRowStyle,
} from "./attendance-view.styles";
import { useAttendanceViewData } from "./attendance-view.hooks";

export default function AttendanceView() {
  const {
    students,
    recordsLength,
    date,
    setDate,
    columns,
    exportCSV,
    summary,
    clearRecords,
  } = useAttendanceViewData();

  return (
    <div className="fade-up">
      <div style={attendanceLayoutStyle}>
        <div style={formColumnStyle}>
          <div className="card">
            <div className="card-title">Mark Attendance</div>
            <div style={toolbarRowStyle}>
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
              <div style={toolbarActionsStyle}>
                <button className="btn-icon" onClick={() => exportCSV(students)}>
                  Export
                </button>
                <button className="btn-icon" onClick={clearRecords}>
                  Clear
                </button>
              </div>
            </div>
            <div style={summaryGridStyle}>
              <div style={summaryCardsStyle}>
                <div className="card" style={summaryCardStyle}>
                  <div style={summaryLabelStyle}>Present</div>
                  <div style={summaryValueStyle}>{summary.present}</div>
                </div>
                <div className="card" style={summaryCardStyle}>
                  <div style={summaryLabelStyle}>Absent</div>
                  <div style={summaryValueStyle}>{summary.absent}</div>
                </div>
                <div className="card" style={summaryCardStyle}>
                  <div style={summaryLabelStyle}>Late</div>
                  <div style={summaryValueStyle}>{summary.late}</div>
                </div>
                <div className="card" style={summaryCardStyle}>
                  <div style={summaryLabelStyle}>Total</div>
                  <div style={summaryValueStyle}>{summary.total}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={sidebarColumnStyle}>
          <div className="card">
            <div className="card-title">Attendance History</div>
            <div style={historyNoteStyle}>
              Recent records: {recordsLength}
            </div>
          </div>
        </div>
      </div>

      <DataTable title={`Attendance â€” ${date}`} columns={columns} data={students} onExport={exportCSV} />
    </div>
  );
}
