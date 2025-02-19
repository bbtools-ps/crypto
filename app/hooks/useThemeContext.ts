import { createContext, useContext } from "react";

interface ThemeContext {
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContext | null>(null);

export function useThemeContext() {
  const ctx = useContext(ThemeContext);

  if (!ctx) {
    throw new Error(
      "Theme related components must be wrapped by <ThemeContext />"
    );
  }

  return ctx;
}
