"use client";

import DataTable from "@/components/dashboard/common/data-table";
import {
  gradesLayoutStyle,
  statsListStyle,
  statsRowStyle,
  statsValueStyle,
  tableSectionStyle,
  toolbarActionsStyle,
  toolbarRowStyle,
} from "./grades-view.styles";
import { useGradesViewData } from "./grades-view.hooks";

export default function GradesView() {
  const {
    students,
    subject,
    setSubject,
    subjects,
    columns,
    exportCSV,
    avgGrade,
    topGrade,
    lowestGrade,
    handleUpload,
  } = useGradesViewData();

  return (
    <div className="fade-up">
      <div style={gradesLayoutStyle}>
        <div>
          <div className="card">
            <div className="card-title">Record Grades</div>
            <div style={toolbarRowStyle}>
              <select value={subject} onChange={(event) => setSubject(event.target.value)}>
                {subjects.map((subjectOption) => (
                  <option key={subjectOption} value={subjectOption}>
                    {subjectOption}
                  </option>
                ))}
              </select>
              <div style={toolbarActionsStyle}>
                <button className="btn-icon" onClick={handleUpload}>Upload</button>
                <button className="btn-primary" onClick={() => exportCSV(students)}>
                  Export Grades
                </button>
              </div>
            </div>
          </div>

          <div style={tableSectionStyle}>
            <DataTable title="Student Grades" columns={columns} data={students} onExport={exportCSV} />
          </div>
        </div>

        <div>
          <div className="card">
            <div className="card-title">Grade Statistics</div>
            <div style={statsValueStyle}>{avgGrade}%</div>
            <div style={statsListStyle}>
              <div style={statsRowStyle}>
                <div>Top</div>
                <div>{topGrade}%</div>
              </div>
              <div style={statsRowStyle}>
                <div>Lowest</div>
                <div>{lowestGrade}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
