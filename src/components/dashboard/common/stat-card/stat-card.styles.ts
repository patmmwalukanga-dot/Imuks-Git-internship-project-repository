import type { CSSProperties } from "react";
import type { Theme } from "@/lib/theme";

export const statCardAccentStyle = (accentColor: string): CSSProperties => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  height: 3,
  background: accentColor,
});

export const statIconStyle = (accentColor: string): CSSProperties => ({
  background: `${accentColor}18`,
});

export const trendBadgeStyle = (trend: number, theme: Theme): CSSProperties => ({
  color: trend >= 0 ? theme.emerald : theme.rose,
});

export const trendMutedStyle = (theme: Theme): CSSProperties => ({
  color: theme.muted,
  fontWeight: 500,
});
