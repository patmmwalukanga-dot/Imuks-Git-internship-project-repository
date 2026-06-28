import type { CSSProperties } from "react";

export const gradesLayoutStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 300px",
  gap: 20,
  marginBottom: 20,
  flexWrap: "wrap",
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

export const tableSectionStyle: CSSProperties = {
  marginTop: 16,
};

export const gradeCellStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
};

export const gradeInputStyle: CSSProperties = {
  width: 72,
  padding: 6,
  borderRadius: 8,
};

export const gradeValueStyle: CSSProperties = {
  fontSize: 13,
  color: "var(--muted,#64748b)",
};

export const statsValueStyle: CSSProperties = {
  fontSize: 28,
  fontWeight: 700,
};

export const statsListStyle: CSSProperties = {
  marginTop: 12,
  display: "grid",
  gap: 8,
};

export const statsRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
};
