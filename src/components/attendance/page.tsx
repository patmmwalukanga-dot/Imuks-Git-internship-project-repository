"use client";

import { useState, useEffect, useCallback } from "react";
import {
  AttendanceStatus,
  DailyRollCall,
  DEFAULT_EMPLOYEES,
  getOrCreateRollCall,
  upsertRollCall,
  loadAllRecords,
  todayISO,
  formatDisplayDate,
  now12h,
  countByStatus,
} from "./lib/attendance";
import * as S from "./styles";

const STATUSES: AttendanceStatus[] = ["present", "absent", "late"];

const badgeConfig: Record<
  AttendanceStatus,
  { bg: string; color: string; dot: string; label: string }
> = {
  present: { bg: "#d1fae5", color: "#047857", dot: "#10b981", label: "Present" },
  absent: { bg: "#fee2e2", color: "#dc2626", dot: "#ef4444", label: "Absent" },
  late: { bg: "#fef3c7", color: "#b45309", dot: "#fbbf24", label: "Late" },
};

function StatusBadge({ status }: { status: AttendanceStatus }) {
  const cfg = badgeConfig[status];
  return (
    <S.Badge $bg={cfg.bg} $color={cfg.color}>
      <S.BadgeDot $color={cfg.dot} />
      {cfg.label}
    </S.Badge>
  );
}

const avatarColors = ["#15803d", "#0f766e", "#166534", "#047857", "#16a34a"];

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  const idx = name.charCodeAt(0) % avatarColors.length;
  return <S.AvatarCircle $bg={avatarColors[idx]}>{initials}</S.AvatarCircle>;
}

type Tab = "mark" | "history";

export default function AttendancePage() {
  const [tab, setTab] = useState<Tab>("mark");
  const [selectedDate, setSelectedDate] = useState(todayISO());
  const [rollCall, setRollCall] = useState<DailyRollCall | null>(null);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [history, setHistory] = useState<DailyRollCall[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const PER_PAGE = 5;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const loadRollCall = useCallback(() => {
    const rc = getOrCreateRollCall(selectedDate);
    setRollCall(rc);
    setPage(1);
  }, [selectedDate]);

 useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  loadRollCall();
}, [loadRollCall]);

 useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHistory(loadAllRecords());
  }, [tab]);

  const updateStatus = (employeeId: string, status: AttendanceStatus) => {
    if (!rollCall || rollCall.submitted) return;
    const updated: DailyRollCall = {
      ...rollCall,
      records: rollCall.records.map((r) =>
        r.employeeId === employeeId
          ? { ...r, status, timeLogged: status === "present" || status === "late" ? now12h() : undefined }
          : r
      ),
    };
    setRollCall(updated);
  };

  const bulkMarkPresent = () => {
    if (!rollCall || rollCall.submitted) return;
    const t = now12h();
    const updated: DailyRollCall = {
      ...rollCall,
      records: rollCall.records.map((r) => ({ ...r, status: "present", timeLogged: t })),
    };
    setRollCall(updated);
  };

  const handleSubmit = async () => {
    if (!rollCall) return;

    const missing = rollCall.records.filter((r) => !r.status);
    if (missing.length > 0) {
      showToast("Please mark all employees before submitting.");
      return;
    }

    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    const final: DailyRollCall = { ...rollCall, submitted: true };
    upsertRollCall(final);
    setRollCall(final);
    setSaving(false);
    showToast("Roll call submitted successfully!");
  };

  const exportCSV = () => {
    if (!rollCall) return;
    const rows = [["Employee ID", "Name", "Position", "Shift", "Status", "Time Logged", "Date"]];
    rollCall.records.forEach((rec) => {
      const emp = DEFAULT_EMPLOYEES.find((e) => e.id === rec.employeeId)!;
      rows.push([emp.id, emp.name, emp.position, emp.shift, rec.status, rec.timeLogged || "", rec.date]);
    });
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `roll-call-${rollCall.date}.csv`;
    a.click();
  };

  const filtered = (rollCall?.records || []).filter((rec) => {
    if (!search) return true;
    const emp = DEFAULT_EMPLOYEES.find((e) => e.id === rec.employeeId);
    if (!emp) return false;
    return (
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.position.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const stats = rollCall ? countByStatus(rollCall.records) : { total: 0, present: 0, absent: 0, late: 0 };

  const statCards = [
    { label: "Total Crew", value: stats.total, icon: "👥", bg: darkMode ? "rgba(255,255,255,0.1)" : "#eaf4ee", color: darkMode ? "#fff" : "#1a3a22" },
    { label: "Present", value: stats.present, icon: "✓", bg: "#ecfdf5", color: "#047857" },
    { label: "Absent", value: stats.absent, icon: "✕", bg: "#fef2f2", color: "#dc2626" },
    { label: "Late", value: stats.late, icon: "⏱", bg: "#fffbeb", color: "#d97706" },
  ];

  return (
    <S.Page $dark={darkMode}>
      {/* Sidebar */}
      <S.Sidebar $dark={darkMode}>
        <S.SidebarHeader>
          <S.LogoRow>
            <S.LogoBadge>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M12 3C7 3 3 7 3 12s4 9 9 9 9-4 9-9-4-9-9-9z" fill="#1a3a22"/><path d="M9 12l2 2 4-4" stroke="#1a3a22" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </S.LogoBadge>
            <div>
              <S.LogoTitle>GreenShield</S.LogoTitle>
              <S.LogoSubtitle>Enterprise Security</S.LogoSubtitle>
            </div>
          </S.LogoRow>
        </S.SidebarHeader>

        <S.Nav>
          <S.NavButton $active={tab === "mark"} onClick={() => setTab("mark")}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Mark Attendance
          </S.NavButton>
          <S.NavButton $active={tab === "history"} onClick={() => setTab("history")}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            History
          </S.NavButton>
        </S.Nav>

        <S.SidebarFooter>
          <S.FooterButton>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2"/></svg>
            Settings
          </S.FooterButton>
          <S.FooterButton>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Logout
          </S.FooterButton>
        </S.SidebarFooter>
      </S.Sidebar>

      {/* Main */}
      <S.Main>
        {/* Topbar */}
        <S.Topbar $dark={darkMode}>
          <S.PageTitle>Attendance Tracker</S.PageTitle>
          <S.TopbarRight>
            <S.SearchBox $dark={darkMode}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <S.SearchInput
                placeholder="Search employees..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
            </S.SearchBox>
            <S.IconButton $dark={darkMode} onClick={() => setDarkMode(!darkMode)}>
              {darkMode
                ? <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                : <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </S.IconButton>
            <S.UserRow>
              <S.UserAvatar>AU</S.UserAvatar>
              <div>
                <S.UserName>Admin User</S.UserName>
                <S.UserRole>Security Ops</S.UserRole>
              </div>
            </S.UserRow>
          </S.TopbarRight>
        </S.Topbar>

        <S.Content>
          {tab === "mark" && (
            <>
              {/* Page header */}
              <S.HeaderRow>
                <div>
                  <S.SectionTitle>Daily Roll Call</S.SectionTitle>
                  <S.SectionSubtitle $dark={darkMode}>
                    Manage check-ins for the security and maintenance departments.
                  </S.SectionSubtitle>
                  {rollCall?.submitted && (
                    <S.SubmittedPill>
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Submitted
                    </S.SubmittedPill>
                  )}
                </div>
                <S.DatePicker $dark={darkMode}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  <S.DateLabel $dark={darkMode}>SELECT DATE</S.DateLabel>
                  <S.DateInput
                    type="date"
                    value={selectedDate}
                    max={todayISO()}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </S.DatePicker>
              </S.HeaderRow>

              {/* Stats */}
              <S.StatsGrid>
                {statCards.map((s) => (
                  <S.StatCard key={s.label} $bg={s.bg}>
                    <S.StatIcon>{s.icon}</S.StatIcon>
                    <div>
                      <S.StatValue $color={s.color}>{s.value}</S.StatValue>
                      <S.StatLabel $color={s.color}>{s.label}</S.StatLabel>
                    </div>
                  </S.StatCard>
                ))}
              </S.StatsGrid>

              {/* Employee list */}
              <S.ListCard $dark={darkMode}>
                <S.ListHeader $dark={darkMode}>
                  <S.ListHeaderTitle>Employee List</S.ListHeaderTitle>
                  <S.ButtonGroup>
                    <S.GhostButton onClick={bulkMarkPresent} disabled={rollCall?.submitted}>
                      Bulk Mark Present
                    </S.GhostButton>
                    <S.SolidButton onClick={exportCSV}>Export CSV</S.SolidButton>
                  </S.ButtonGroup>
                </S.ListHeader>

                <S.TableHeaderRow $dark={darkMode}>
                  <span>Employee</span>
                  <span>Position</span>
                  <span>Shift</span>
                  <span>Status</span>
                  <span>Time Logged</span>
                </S.TableHeaderRow>

                <S.TableBody $dark={darkMode}>
                  {paginated.length === 0 && <S.EmptyRow>No employees match your search.</S.EmptyRow>}
                  {paginated.map((rec) => {
                    const emp = DEFAULT_EMPLOYEES.find((e) => e.id === rec.employeeId)!;
                    return (
                      <S.TableRow key={rec.employeeId} $dark={darkMode}>
                        <S.EmployeeCell>
                          <Avatar name={emp.name} />
                          <div>
                            <S.EmployeeName>{emp.name}</S.EmployeeName>
                            <S.EmployeeId $dark={darkMode}>ID: {emp.id}</S.EmployeeId>
                          </div>
                        </S.EmployeeCell>
                        <S.CellText $dark={darkMode}>{emp.position}</S.CellText>
                        <S.CellText $dark={darkMode}>{emp.shift}</S.CellText>
                        <div>
                          {rollCall?.submitted ? (
                            <StatusBadge status={rec.status} />
                          ) : (
                            <S.StatusButtons>
                              {STATUSES.map((s) => {
                                const icon = { present: "✓", absent: "✕", late: "⏱" }[s];
                                return (
                                  <S.StatusButton
                                    key={s}
                                    title={s.charAt(0).toUpperCase() + s.slice(1)}
                                    onClick={() => updateStatus(rec.employeeId, s)}
                                    $status={s}
                                    $active={rec.status === s}
                                    $dark={darkMode}
                                  >
                                    {icon}
                                  </S.StatusButton>
                                );
                              })}
                            </S.StatusButtons>
                          )}
                        </div>
                        <S.TimeLogged $hasLog={!!rec.timeLogged} $dark={darkMode}>
                          {rec.timeLogged || (rec.status === "absent" ? "—" : "No log")}
                        </S.TimeLogged>
                      </S.TableRow>
                    );
                  })}
                </S.TableBody>

                {/* Pagination */}
                <S.TableFooter $dark={darkMode}>
                  <S.FooterText $dark={darkMode}>
                    Showing {paginated.length} of {filtered.length} employees
                  </S.FooterText>
                  <S.PaginationRow>
                    <S.PageButton $dark={darkMode} onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>‹</S.PageButton>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <S.PageButton key={p} $dark={darkMode} $active={p === page} onClick={() => setPage(p)}>{p}</S.PageButton>
                    ))}
                    <S.PageButton $dark={darkMode} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>›</S.PageButton>
                  </S.PaginationRow>
                </S.TableFooter>
              </S.ListCard>

              {/* Actions */}
              <S.ActionsRow>
                <S.CancelButton $dark={darkMode} onClick={loadRollCall}>
                  Cancel Changes
                </S.CancelButton>
                <S.SubmitButton onClick={handleSubmit} disabled={saving || rollCall?.submitted}>
                  {saving ? (
                    <S.SpinningIcon as="svg" width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" strokeOpacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></S.SpinningIcon>
                  ) : (
                    <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  )}
                  {rollCall?.submitted ? "Roll Call Submitted" : saving ? "Submitting..." : "Finalize & Submit Roll Call"}
                </S.SubmitButton>
              </S.ActionsRow>
            </>
          )}

          {tab === "history" && (
            <>
              <div style={{ marginBottom: "1.5rem" }}>
                <S.SectionTitle>Attendance History</S.SectionTitle>
                <S.SectionSubtitle $dark={darkMode}>
                  All submitted roll calls — {history.length} record{history.length !== 1 ? "s" : ""} saved.
                </S.SectionSubtitle>
              </div>

              {history.length === 0 ? (
                <S.EmptyHistory $dark={darkMode}>
                  <S.EmptyIcon>📋</S.EmptyIcon>
                  <S.EmptyTitle>No records yet</S.EmptyTitle>
                  <S.EmptyText $dark={darkMode}>Submit your first roll call to see history here.</S.EmptyText>
                </S.EmptyHistory>
              ) : (
                <S.HistoryList>
                  {history.map((rc) => {
                    const s = countByStatus(rc.records);
                    return (
                      <S.HistoryCard key={rc.date} $dark={darkMode}>
                        <S.HistoryCardHeader $dark={darkMode}>
                          <S.HistoryDateRow>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                            <S.HistoryDate>{formatDisplayDate(rc.date)}</S.HistoryDate>
                            {rc.submitted && <S.SubmittedTag>Submitted</S.SubmittedTag>}
                          </S.HistoryDateRow>
                          <S.HistorySummary>
                            <span className="present">✓ {s.present} present</span>
                            <span className="absent">✕ {s.absent} absent</span>
                            <span className="late">⏱ {s.late} late</span>
                          </S.HistorySummary>
                        </S.HistoryCardHeader>
                        <S.TableBody $dark={darkMode}>
                          {rc.records.map((rec) => {
                            const emp = DEFAULT_EMPLOYEES.find((e) => e.id === rec.employeeId);
                            if (!emp) return null;
                            return (
                              <S.HistoryRecordRow key={rec.employeeId}>
                                <S.HistoryEmployeeInfo>
                                  <Avatar name={emp.name} />
                                  <div>
                                    <S.HistoryEmployeeName>{emp.name}</S.HistoryEmployeeName>
                                    <S.HistoryEmployeePosition $dark={darkMode}>{emp.position}</S.HistoryEmployeePosition>
                                  </div>
                                </S.HistoryEmployeeInfo>
                                <S.HistoryRecordRight>
                                  <StatusBadge status={rec.status} />
                                  <S.HistoryTime $dark={darkMode}>{rec.timeLogged || "—"}</S.HistoryTime>
                                </S.HistoryRecordRight>
                              </S.HistoryRecordRow>
                            );
                          })}
                        </S.TableBody>
                      </S.HistoryCard>
                    );
                  })}
                </S.HistoryList>
              )}
            </>
          )}
        </S.Content>
      </S.Main>

      {/* Toast */}
      {toast && (
        <S.Toast>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#a8d08d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {toast}
        </S.Toast>
      )}
    </S.Page>
  );
}
