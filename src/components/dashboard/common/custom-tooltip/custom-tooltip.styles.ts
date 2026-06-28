import type { CSSProperties } from "react";
import type { Theme } from "@/lib/theme";

export const tooltipStyle = (theme: Theme): CSSProperties => ({
  background: theme.surface,
  border: `1px solid ${theme.border}`,
  borderRadius: 10,
  padding: "10px 14px",
  fontFamily: "'Inter', sans-serif",
});

export const tooltipLabelStyle = (theme: Theme): CSSProperties => ({
  fontSize: 11,
  color: theme.muted,
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
});

export const tooltipValueStyle = (color: string): CSSProperties => ({
  fontSize: 13,
  fontWeight: 600,
  color,
});
