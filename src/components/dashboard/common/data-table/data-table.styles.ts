import type { CSSProperties } from "react";

export const headerRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 12,
};

export const recordCountStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--muted, #64748b)",
};

export const toolbarStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
};

export const searchInputStyle: CSSProperties = {
  padding: 8,
  borderRadius: 8,
  border: "1px solid var(--border, #e2e8f0)",
};

export const tableWrapStyle: CSSProperties = {
  overflowX: "auto",
};

export const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
};

export const headerCellStyle = (sortable?: boolean): CSSProperties => ({
  textAlign: "left",
  padding: "10px 8px",
  cursor: sortable ? "pointer" : "default",
});

export const bodyCellStyle: CSSProperties = {
  padding: "10px 8px",
  verticalAlign: "middle",
};

export const rowStyle: CSSProperties = {
  borderTop: "1px solid var(--border, #e2e8f0)",
};

export const emptyCellStyle: CSSProperties = {
  padding: 32,
  textAlign: "center",
  color: "var(--muted, #64748b)",
};


