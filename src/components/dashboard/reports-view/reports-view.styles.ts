import type { CSSProperties } from "react";
import type { Theme } from "@/lib/theme";

export const reportsLayoutStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 360px",
  gap: 20,
  marginBottom: 20,
  alignItems: "start",
};

export const secondaryCardStyle: CSSProperties = {
  marginTop: 16,
};

export const exportRowStyle: CSSProperties = {
  marginTop: 12,
  display: "flex",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: 10,
};

export const breakdownGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 12,
  marginBottom: 16,
};

export const breakdownCardStyle = (theme: Theme): CSSProperties => ({
  padding: 12,
  background: theme.surfaceHi,
});

export const breakdownLabelStyle = (theme: Theme): CSSProperties => ({
  fontSize: 12,
  color: theme.muted,
});

export const breakdownValueStyle: CSSProperties = {
  fontSize: 22,
  fontWeight: 700,
};
