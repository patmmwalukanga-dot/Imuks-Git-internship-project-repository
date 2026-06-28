import type { Theme } from "@/lib/theme";
import type { TooltipPayload } from "@/types/dashboard";
import { tooltipLabelStyle, tooltipStyle, tooltipValueStyle } from "./custom-tooltip.styles";

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  unit?: string;
  theme: Theme;
};

export default function CustomTooltip({
  active,
  payload,
  label,
  unit = "",
  theme,
}: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div style={tooltipStyle(theme)}>
      <p style={tooltipLabelStyle(theme)}>{label}</p>
      {payload.map((item, index) => (
        <p key={index} style={tooltipValueStyle(item.color || theme.text)}>
          {item.name}: {item.value}
          {unit}
        </p>
      ))}
    </div>
  );
}
