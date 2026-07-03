import type { SxProps, Theme } from "@mui/material/styles";
import type { Priority } from "./types";

export const priorityStyles: Record<
  Priority,
  {
    backgroundColor: string;
    color: string;
    borderColor: string;
  }
> = {
  Low: {
    backgroundColor: "#e8f5e9",
    color: "#2e7d32",
    borderColor: "#2e7d32",
  },
  Medium: {
    backgroundColor: "#fff8e1",
    color: "#f57f17",
    borderColor: "#f9a825",
  },
  High: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    borderColor: "#d32f2f",
  },
};

export const containerStyles: SxProps<Theme> = {
  maxWidth: 560,
  p: 3,
  borderRadius: 3,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

export const previewCardStyles: SxProps<Theme> = {
  p: 2.5,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "#fafafa",
};

export const chipStyles = (priority: Priority): SxProps<Theme> => ({
  width: "fit-content",
  fontWeight: 700,
  backgroundColor: priorityStyles[priority].backgroundColor,
  color: priorityStyles[priority].color,
  border: "1px solid",
  borderColor: priorityStyles[priority].borderColor,
});

export const selectStyles = (priority: Priority): SxProps<Theme> => ({
  borderRadius: 2,
  fontWeight: 700,
  "& .MuiSelect-icon": {
    color: priorityStyles[priority].color,
  },
});