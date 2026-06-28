import type { CSSProperties } from "react";
import type { Theme } from "@/lib/theme";

export const alertBoxStyle = (theme: Theme): CSSProperties => ({
  background: `${theme.rose}10`,
  borderColor: `${theme.rose}44`,
  color: theme.rose,
});

export const alertIconWrapStyle: CSSProperties = {
  marginTop: 2,
};

export const alertTitleStyle: CSSProperties = {
  fontWeight: 700,
  marginBottom: 3,
};

export const alertBodyStyle: CSSProperties = {
  fontSize: 13,
  opacity: 0.9,
};
