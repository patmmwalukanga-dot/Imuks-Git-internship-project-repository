import type { ReactNode } from "react";
import type { Theme } from "@/hooks/theme";
import {
  statCardAccentStyle,
  statIconStyle,
  trendBadgeStyle,
  trendMutedStyle,
} from "./stat-card.styles";

type StatCardProps = {
  label: string;
  value: string | number;
  sub: string;
  icon: ReactNode;
  accentColor: string;
  trend?: number;
  theme: Theme;
};

export default function StatCard({
  label,
  value,
  sub,
  icon,
  accentColor,
  trend,
  theme,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div style={statCardAccentStyle(accentColor)} />
      <div className="stat-icon" style={statIconStyle(accentColor)}>
        {icon}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-sub">{sub}</div>
      {trend !== undefined && (
        <div className="trend-badge" style={trendBadgeStyle(trend, theme)}>
          <span>
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </span>
          <span style={trendMutedStyle(theme)}>vs last term</span>
        </div>
      )}
    </div>
  );
}


