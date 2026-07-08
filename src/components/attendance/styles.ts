"use client";

import styled, { css, keyframes } from "styled-components";
import type { AttendanceStatus, BadgeConfig } from "./types";

/* ---------- theme tokens & visual constants ---------- */

export const AVATAR_COLORS = ["#15803d", "#0f766e", "#166534", "#047857", "#16a34a"];

export const BADGE_CONFIG: Record<AttendanceStatus, BadgeConfig> = {
  present: { bg: "#d1fae5", color: "#047857", dot: "#10b981", label: "Present" },
  absent: { bg: "#fee2e2", color: "#dc2626", dot: "#ef4444", label: "Absent" },
  late: { bg: "#fef3c7", color: "#b45309", dot: "#fbbf24", label: "Late" },
};

export const STATUS_ICONS: Record<AttendanceStatus, string> = {
  present: "✓",
  absent: "✕",
  late: "⏱",
};

const statusActiveColors: Record<AttendanceStatus, string> = {
  present: "#10b981",
  absent: "#ef4444",
  late: "#fbbf24",
};

/* ---------- theme helpers ---------- */
// Pass `$dark` as a boolean prop to any styled component that needs to branch on dark mode.

export const Page = styled.div<{ $dark: boolean }>`
  min-height: 100vh;
  font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
  background: ${(p) => (p.$dark ? "#0f1c14" : "#f9fafb")};
  color: ${(p) => (p.$dark ? "#ffffff" : "#111827")};
`;

/* ---------- sidebar ---------- */

export const Sidebar = styled.aside<{ $dark: boolean }>`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 14rem;
  display: flex;
  flex-direction: column;
  z-index: 20;
  background: ${(p) => (p.$dark ? "#0d1a10" : "#1a3a22")};
  border-right: 1px solid rgba(255, 255, 255, 0.1);
`;

export const SidebarHeader = styled.div`
  padding: 1.5rem 1.25rem 1rem;
`;

export const LogoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
`;

export const LogoBadge = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: #a8d08d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoTitle = styled.div`
  color: #fff;
  font-weight: 700;
  font-size: 0.875rem;
  line-height: 1.2;
`;

export const LogoSubtitle = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.625rem;
`;

export const Nav = styled.nav`
  flex: 1;
  padding: 0 0.75rem;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const NavButton = styled.button<{ $active: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.15s ease;
  background: ${(p) => (p.$active ? "#2d6a4f" : "transparent")};
  color: ${(p) => (p.$active ? "#fff" : "rgba(255,255,255,0.6)")};

  &:hover {
    background: ${(p) => (p.$active ? "#2d6a4f" : "rgba(255,255,255,0.1)")};
    color: #fff;
  }
`;

export const SidebarFooter = styled.div`
  padding: 0 0.75rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const FooterButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  border: none;
  background: transparent;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;

/* ---------- main / topbar ---------- */

export const Main = styled.div`
  margin-left: 14rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

export const Topbar = styled.header<{ $dark: boolean }>`
  position: sticky;
  top: 0;
  z-index: 10;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  border-bottom: 1px solid ${(p) => (p.$dark ? "rgba(255,255,255,0.1)" : "#e5e7eb")};
  background: ${(p) => (p.$dark ? "#0f1c14" : "#fff")};
`;

export const PageTitle = styled.h1`
  font-weight: 700;
  font-size: 1.125rem;
`;

export const TopbarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const SearchBox = styled.div<{ $dark: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: ${(p) => (p.$dark ? "rgba(255,255,255,0.1)" : "#f3f4f6")};

  svg {
    color: #9ca3af;
  }
`;

export const SearchInput = styled.input`
  background: transparent;
  outline: none;
  border: none;
  width: 10rem;
  font-size: 0.875rem;
  color: inherit;
`;

export const IconButton = styled.button<{ $dark: boolean }>`
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
  background: ${(p) => (p.$dark ? "rgba(255,255,255,0.1)" : "#f3f4f6")};
  color: inherit;

  &:hover {
    background: ${(p) => (p.$dark ? "rgba(255,255,255,0.2)" : "#e5e7eb")};
  }
`;

export const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const UserAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 9999px;
  background: #2d6a4f;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
`;

export const UserName = styled.div`
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.2;
`;

export const UserRole = styled.div`
  font-size: 0.625rem;
  color: #9ca3af;
`;

export const Content = styled.main`
  flex: 1;
  padding: 1.5rem;
`;

/* ---------- page header ---------- */

export const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
`;

export const SectionSubtitle = styled.p<{ $dark: boolean }>`
  font-size: 0.875rem;
  margin-top: 0.125rem;
  color: ${(p) => (p.$dark ? "rgba(255,255,255,0.5)" : "#6b7280")};
`;

export const SubmittedPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  margin-top: 0.5rem;
  padding: 0.25rem 0.625rem;
  background: #d1fae5;
  color: #047857;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
`;

export const DatePicker = styled.div<{ $dark: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid ${(p) => (p.$dark ? "rgba(255,255,255,0.2)" : "#e5e7eb")};
  background: ${(p) => (p.$dark ? "rgba(255,255,255,0.1)" : "#fff")};
  font-size: 0.875rem;
  font-weight: 500;

  svg {
    color: #9ca3af;
  }
`;

export const DateLabel = styled.span<{ $dark: boolean }>`
  font-size: 0.75rem;
  margin-right: 0.25rem;
  color: ${(p) => (p.$dark ? "rgba(255,255,255,0.5)" : "#9ca3af")};
`;

export const DateInput = styled.input`
  background: transparent;
  outline: none;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  color: inherit;
`;

/* ---------- stats ---------- */

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

export const StatCard = styled.div<{ $bg: string }>`
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: ${(p) => p.$bg};
`;

export const StatIcon = styled.div`
  font-size: 1.5rem;
`;

export const StatValue = styled.div<{ $color: string }>`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(p) => p.$color};
`;

export const StatLabel = styled.div<{ $color: string }>`
  font-size: 0.75rem;
  font-weight: 500;
  color: ${(p) => p.$color};
  opacity: 0.7;
`;

/* ---------- employee list / table ---------- */

export const ListCard = styled.div<{ $dark: boolean }>`
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid ${(p) => (p.$dark ? "rgba(255,255,255,0.1)" : "#e5e7eb")};
  background: ${(p) => (p.$dark ? "#0d1a10" : "#fff")};
`;

export const ListHeader = styled.div<{ $dark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid ${(p) => (p.$dark ? "rgba(255,255,255,0.1)" : "#f3f4f6")};
`;

export const ListHeaderTitle = styled.span`
  font-weight: 600;
  font-size: 0.875rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const GhostButton = styled.button`
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  background: #eaf4ee;
  color: #1a3a22;
  transition: background-color 0.15s ease;

  &:hover {
    background: #d4eada;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const SolidButton = styled.button`
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  background: #1a3a22;
  color: #fff;
  transition: background-color 0.15s ease;

  &:hover {
    background: #2d6a4f;
  }
`;

export const TableHeaderRow = styled.div<{ $dark: boolean }>`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1.5fr 1fr;
  gap: 1rem;
  padding: 0.625rem 1.25rem;
  font-size: 0.6875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: ${(p) => (p.$dark ? "rgba(255,255,255,0.4)" : "#9ca3af")};
`;

export const TableBody = styled.div<{ $dark: boolean }>`
  > * + * {
    border-top: 1px solid ${(p) => (p.$dark ? "rgba(255,255,255,0.05)" : "#f9fafb")};
  }
`;

export const EmptyRow = styled.div`
  padding: 3rem 0;
  text-align: center;
  font-size: 0.875rem;
  color: #9ca3af;
`;

export const TableRow = styled.div<{ $dark: boolean }>`
  display: grid;
  grid-template-columns: 2fr 2fr 2fr 1.5fr 1fr;
  gap: 1rem;
  align-items: center;
  padding: 0.875rem 1.25rem;
  transition: background-color 0.15s ease;

  &:hover {
    background: ${(p) => (p.$dark ? "rgba(255,255,255,0.05)" : "rgba(249,250,251,0.8)")};
  }
`;

export const EmployeeCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

export const EmployeeName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.2;
`;

export const EmployeeId = styled.div<{ $dark: boolean }>`
  font-size: 0.6875rem;
  color: ${(p) => (p.$dark ? "rgba(255,255,255,0.4)" : "#9ca3af")};
`;

export const CellText = styled.div<{ $dark: boolean }>`
  font-size: 0.875rem;
  color: ${(p) => (p.$dark ? "rgba(255,255,255,0.7)" : "#4b5563")};
`;

export const StatusButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
`;

export const StatusButton = styled.button<{
  $status: "present" | "absent" | "late";
  $active: boolean;
  $dark: boolean;
}>`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  transition: all 0.15s ease;

  ${(p) =>
    p.$active
      ? css`
          background: ${statusActiveColors[p.$status]};
          color: #fff;
        `
      : css`
          background: transparent;
          color: ${p.$dark ? "rgba(255,255,255,0.3)" : "#d1d5db"};

          &:hover {
            background: ${statusActiveColors[p.$status]}33;
            color: ${p.$dark ? undefined : statusActiveColors[p.$status]};
          }
        `}
`;

export const TimeLogged = styled.div<{ $hasLog: boolean; $dark: boolean }>`
  font-size: 0.875rem;
  font-family: ui-monospace, monospace;
  color: ${(p) =>
    p.$hasLog ? (p.$dark ? "#fff" : "#1f2937") : "#f87171"};
`;

export const TableFooter = styled.div<{ $dark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  border-top: 1px solid ${(p) => (p.$dark ? "rgba(255,255,255,0.1)" : "#f3f4f6")};
`;

export const FooterText = styled.span<{ $dark: boolean }>`
  font-size: 0.75rem;
  color: ${(p) => (p.$dark ? "rgba(255,255,255,0.4)" : "#9ca3af")};
`;

export const PaginationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const PageButton = styled.button<{ $active?: boolean; $dark: boolean }>`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
  transition: background-color 0.15s ease;
  background: ${(p) => (p.$active ? "#1a3a22" : "transparent")};
  color: ${(p) => (p.$active ? "#fff" : p.$dark ? "rgba(255,255,255,0.6)" : "#4b5563")};

  &:hover {
    background: ${(p) => (p.$active ? "#1a3a22" : p.$dark ? "rgba(255,255,255,0.1)" : "#f3f4f6")};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

/* ---------- bottom actions ---------- */

export const ActionsRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.25rem;
`;

export const CancelButton = styled.button<{ $dark: boolean }>`
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid ${(p) => (p.$dark ? "rgba(255,255,255,0.2)" : "#e5e7eb")};
  background: transparent;
  color: inherit;
  transition: background-color 0.15s ease;

  &:hover {
    background: ${(p) => (p.$dark ? "rgba(255,255,255,0.1)" : "#f9fafb")};
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const SpinningIcon = styled.svg`
  animation: ${spin} 1s linear infinite;
`;

export const SubmitButton = styled.button`
  padding: 0.625rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: #1a3a22;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.15s ease;

  &:hover {
    background: #2d6a4f;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* ---------- status badge (used in table + history) ---------- */

export const Badge = styled.span<{ $bg: string; $color: string }>`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(p) => p.$bg};
  color: ${(p) => p.$color};
`;

export const BadgeDot = styled.span<{ $color: string }>`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  background: ${(p) => p.$color};
`;

/* ---------- avatar ---------- */

export const AvatarCircle = styled.div<{ $bg: string }>`
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 9999px;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  flex-shrink: 0;
`;

/* ---------- history tab ---------- */

export const HistoryHeader = styled.div`
  margin-bottom: 1.5rem;
`;

export const EmptyHistory = styled.div<{ $dark: boolean }>`
  border-radius: 1rem;
  border: 1px solid ${(p) => (p.$dark ? "rgba(255,255,255,0.1)" : "#e5e7eb")};
  background: ${(p) => (p.$dark ? "#0d1a10" : "#fff")};
  padding: 4rem;
  text-align: center;
`;

export const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

export const EmptyTitle = styled.div`
  font-weight: 600;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
`;

export const EmptyText = styled.div<{ $dark: boolean }>`
  font-size: 0.875rem;
  color: ${(p) => (p.$dark ? "rgba(255,255,255,0.5)" : "#9ca3af")};
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const HistoryCard = styled.div<{ $dark: boolean }>`
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid ${(p) => (p.$dark ? "rgba(255,255,255,0.1)" : "#e5e7eb")};
  background: ${(p) => (p.$dark ? "#0d1a10" : "#fff")};
`;

export const HistoryCardHeader = styled.div<{ $dark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.25rem;
  border-bottom: 1px solid ${(p) => (p.$dark ? "rgba(255,255,255,0.1)" : "#f3f4f6")};
`;

export const HistoryDateRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;

  svg {
    color: #2d6a4f;
  }
`;

export const HistoryDate = styled.span`
  font-weight: 700;
`;

export const SubmittedTag = styled.span`
  padding: 0.125rem 0.5rem;
  background: #d1fae5;
  color: #047857;
  border-radius: 9999px;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

export const HistorySummary = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 0.75rem;

  .present { color: #059669; font-weight: 600; }
  .absent { color: #ef4444; font-weight: 600; }
  .late { color: #f59e0b; font-weight: 600; }
`;

export const HistoryRecordRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 1.25rem;
`;

export const HistoryEmployeeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

export const HistoryEmployeeName = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`;

export const HistoryEmployeePosition = styled.div<{ $dark: boolean }>`
  font-size: 0.75rem;
  color: ${(p) => (p.$dark ? "rgba(255,255,255,0.4)" : "#9ca3af")};
`;

export const HistoryRecordRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const HistoryTime = styled.span<{ $dark: boolean }>`
  font-size: 0.75rem;
  font-family: ui-monospace, monospace;
  color: ${(p) => (p.$dark ? "rgba(255,255,255,0.5)" : "#9ca3af")};
`;

/* ---------- toast ---------- */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Toast = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 50;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: #1a3a22;
  color: #fff;
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  font-weight: 500;
  animation: ${fadeIn} 0.2s ease-out;
`;