"use client";

import { useEffect, useState } from "react";
import { darkTheme, lightTheme } from "@/hooks/theme";

export const useTheme = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const shouldBeDark = saved !== null
      ? saved === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reading browser-only API on mount, no external subscription needed
    setIsDark(shouldBeDark);
  }, []);

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return { isDark, theme, toggleTheme };
};