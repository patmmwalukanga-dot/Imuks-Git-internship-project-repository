import type { CSSProperties } from "react";

export const enrollmentLayoutStyle: CSSProperties = {
  display: "flex",
  gap: 20,
  marginBottom: 20,
  flexWrap: "wrap",
};

export const formColumnStyle: CSSProperties = {
  flex: 1,
  minWidth: 320,
};

export const formGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 12,
};

export const formActionsStyle: CSSProperties = {
  marginTop: 12,
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

export const sidebarColumnStyle: CSSProperties = {
  width: 320,
  minWidth: 280,
};

export const quickActionsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
};

export const rowActionsStyle: CSSProperties = {
  display: "flex",
  gap: 8,
};
