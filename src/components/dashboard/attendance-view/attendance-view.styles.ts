import type { CSSProperties } from "react";

export const attendanceLayoutStyle: CSSProperties = {
  display: "flex",
  gap: 20,
  marginBottom: 20,
  flexWrap: "wrap",
};

export const formColumnStyle: CSSProperties = {
  flex: 1,
  minWidth: 320,
};

export const toolbarRowStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  flexWrap: "wrap",
};

export const toolbarActionsStyle: CSSProperties = {
  marginLeft: "auto",
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

export const summaryGridStyle: CSSProperties = {
  marginTop: 12,
};

export const summaryCardsStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
  gap: 12,
};

export const summaryCardStyle: CSSProperties = {
  padding: 12,
};

export const summaryLabelStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--muted,#64748b)",
};

export const summaryValueStyle: CSSProperties = {
  fontSize: 20,
  fontWeight: 700,
};

export const sidebarColumnStyle: CSSProperties = {
  width: 320,
  minWidth: 280,
};

export const historyNoteStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--muted,#64748b)",
};

export const rowActionsStyle: CSSProperties = {
  display: "flex",
  gap: 8,
};
