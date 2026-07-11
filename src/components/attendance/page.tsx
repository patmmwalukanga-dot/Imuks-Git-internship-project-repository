"use client";

import {
  countByStatus,
  formatDisplayDate,
  getAvatarColorIndex,
  getEmployeeInitials,
  todayISO,
  useAttendancePage,
} from "./hooks";
import {
  ATTENDANCE_STATUSES,
  DEFAULT_EMPLOYEES,
  type AttendanceStatus,
} from "./types";
import * as S from "./styles";

function StatusBadge({ status }: { status: AttendanceStatus }) {
  const config = S.BADGE_CONFIG[status];
  return (
    <S.Badge $bg={config.bg} $color={config.color}>
      <S.BadgeDot $color={config.dot} />
      {config.label}
    </S.Badge>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = getEmployeeInitials(name);
  const colorIndex = getAvatarColorIndex(name, S.AVATAR_COLORS.length);
  return <S.AvatarCircle $bg={S.AVATAR_COLORS[colorIndex]}>{initials}</S.AvatarCircle>;
}

export default function AttendancePage() {
  const {
    tab,
    setTab,
    selectedDate,
    rollCall,
    search,
    saving,
    toast,
    page,
    history,
    darkMode,
    filteredRecords,
    paginatedRecords,
    totalPages,
    statCards,
    loadRollCall,
    updateStatus,
    bulkMarkPresent,
    handleSubmit,
    handleExportCSV,
    handleSearchChange,
    handleDateChange,
    toggleDarkMode,
    goToPreviousPage,
    goToNextPage,
    goToPage,
  } = useAttendancePage();

  return (
    <S.Page $dark={darkMode}>
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

      <S.Main>
        <S.Topbar $dark={darkMode}>
          <S.PageTitle>Attendance Tracker</S.PageTitle>
          <S.TopbarRight>
            <S.SearchBox $dark={darkMode}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <S.SearchInput
                placeholder="Search employees..."
                value={search}
                onChange={(event) => handleSearchChange(event.target.value)}
              />
            </S.SearchBox>
            <S.IconButton $dark={darkMode} onClick={toggleDarkMode}>
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
                    onChange={(event) => handleDateChange(event.target.value)}
                  />
                </S.DatePicker>
              </S.HeaderRow>

              <S.StatsGrid>
                {statCards.map((card) => (
                  <S.StatCard key={card.label} $bg={card.bg}>
                    <S.StatIcon>{card.icon}</S.StatIcon>
                    <div>
                      <S.StatValue $color={card.color}>{card.value}</S.StatValue>
                      <S.StatLabel $color={card.color}>{card.label}</S.StatLabel>
                    </div>
                  </S.StatCard>
                ))}
              </S.StatsGrid>

              <S.ListCard $dark={darkMode}>
                <S.ListHeader $dark={darkMode}>
                  <S.ListHeaderTitle>Employee List</S.ListHeaderTitle>
                  <S.ButtonGroup>
                    <S.GhostButton onClick={bulkMarkPresent} disabled={rollCall?.submitted}>
                      Bulk Mark Present
                    </S.GhostButton>
                    <S.SolidButton onClick={handleExportCSV}>Export CSV</S.SolidButton>
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
                  {paginatedRecords.length === 0 && (
                    <S.EmptyRow>No employees match your search.</S.EmptyRow>
                  )}
                  {paginatedRecords.map((record) => {
                    const employee = DEFAULT_EMPLOYEES.find((item) => item.id === record.employeeId);
                    if (!employee) return null;
                    return (
                      <S.TableRow key={record.employeeId} $dark={darkMode}>
                        <S.EmployeeCell>
                          <Avatar name={employee.name} />
                          <div>
                            <S.EmployeeName>{employee.name}</S.EmployeeName>
                            <S.EmployeeId $dark={darkMode}>ID: {employee.id}</S.EmployeeId>
                          </div>
                        </S.EmployeeCell>
                        <S.CellText $dark={darkMode}>{employee.position}</S.CellText>
                        <S.CellText $dark={darkMode}>{employee.shift}</S.CellText>
                        <div>
                          {rollCall?.submitted ? (
                            <StatusBadge status={record.status} />
                          ) : (
                            <S.StatusButtons>
                              {ATTENDANCE_STATUSES.map((status) => (
                                <S.StatusButton
                                  key={status}
                                  title={status.charAt(0).toUpperCase() + status.slice(1)}
                                  onClick={() => updateStatus(record.employeeId, status)}
                                  $status={status}
                                  $active={record.status === status}
                                  $dark={darkMode}
                                >
                                  {S.STATUS_ICONS[status]}
                                </S.StatusButton>
                              ))}
                            </S.StatusButtons>
                          )}
                        </div>
                        <S.TimeLogged $hasLog={!!record.timeLogged} $dark={darkMode}>
                          {record.timeLogged || (record.status === "absent" ? "—" : "No log")}
                        </S.TimeLogged>
                      </S.TableRow>
                    );
                  })}
                </S.TableBody>

                <S.TableFooter $dark={darkMode}>
                  <S.FooterText $dark={darkMode}>
                    Showing {paginatedRecords.length} of {filteredRecords.length} employees
                  </S.FooterText>
                  <S.PaginationRow>
                    <S.PageButton $dark={darkMode} onClick={goToPreviousPage} disabled={page === 1}>‹</S.PageButton>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                      <S.PageButton
                        key={pageNumber}
                        $dark={darkMode}
                        $active={pageNumber === page}
                        onClick={() => goToPage(pageNumber)}
                      >
                        {pageNumber}
                      </S.PageButton>
                    ))}
                    <S.PageButton
                      $dark={darkMode}
                      onClick={() => goToNextPage(totalPages)}
                      disabled={page === totalPages}
                    >
                      ›
                    </S.PageButton>
                  </S.PaginationRow>
                </S.TableFooter>
              </S.ListCard>

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
              <S.HistoryHeader>
                <S.SectionTitle>Attendance History</S.SectionTitle>
                <S.SectionSubtitle $dark={darkMode}>
                  All submitted roll calls — {history.length} record{history.length !== 1 ? "s" : ""} saved.
                </S.SectionSubtitle>
              </S.HistoryHeader>

              {history.length === 0 ? (
                <S.EmptyHistory $dark={darkMode}>
                  <S.EmptyIcon>📋</S.EmptyIcon>
                  <S.EmptyTitle>No records yet</S.EmptyTitle>
                  <S.EmptyText $dark={darkMode}>Submit your first roll call to see history here.</S.EmptyText>
                </S.EmptyHistory>
              ) : (
                <S.HistoryList>
                  {history.map((record) => {
                    const summary = countByStatus(record.records);
                    return (
                      <S.HistoryCard key={record.date} $dark={darkMode}>
                        <S.HistoryCardHeader $dark={darkMode}>
                          <S.HistoryDateRow>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                            <S.HistoryDate>{formatDisplayDate(record.date)}</S.HistoryDate>
                            {record.submitted && <S.SubmittedTag>Submitted</S.SubmittedTag>}
                          </S.HistoryDateRow>
                          <S.HistorySummary>
                            <span className="present">✓ {summary.present} present</span>
                            <span className="absent">✕ {summary.absent} absent</span>
                            <span className="late">⏱ {summary.late} late</span>
                          </S.HistorySummary>
                        </S.HistoryCardHeader>
                        <S.TableBody $dark={darkMode}>
                          {record.records.map((entry) => {
                            const employee = DEFAULT_EMPLOYEES.find((item) => item.id === entry.employeeId);
                            if (!employee) return null;
                            return (
                              <S.HistoryRecordRow key={entry.employeeId}>
                                <S.HistoryEmployeeInfo>
                                  <Avatar name={employee.name} />
                                  <div>
                                    <S.HistoryEmployeeName>{employee.name}</S.HistoryEmployeeName>
                                    <S.HistoryEmployeePosition $dark={darkMode}>{employee.position}</S.HistoryEmployeePosition>
                                  </div>
                                </S.HistoryEmployeeInfo>
                                <S.HistoryRecordRight>
                                  <StatusBadge status={entry.status} />
                                  <S.HistoryTime $dark={darkMode}>{entry.timeLogged || "—"}</S.HistoryTime>
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

      {toast && (
        <S.Toast>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" stroke="#a8d08d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          {toast}
        </S.Toast>
      )}
    </S.Page>
  );
}
