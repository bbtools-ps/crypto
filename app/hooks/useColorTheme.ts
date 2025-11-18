import { createTheme, type LinkProps, type PaletteMode } from "@mui/material";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router";

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: "light",
});

export const useColorTheme = () => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedTheme = localStorage.getItem("theme") as PaletteMode;
    if (savedTheme) return savedTheme;
    // Fall back to browser preference if no saved theme
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const toggleColorMode = useCallback(() => {
    localStorage.setItem("theme", mode === "light" ? "dark" : "light");
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, [mode]);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          h1: {
            fontSize: "2.5rem",
            "@media (min-width:37.5em)": {
              fontSize: "3rem",
            },
            "@media (min-width:56.25em)": {
              fontSize: "4.5rem",
            },
          },
          h2: {
            fontSize: "2rem",
            "@media (min-width:37.5em)": {
              fontSize: "2.5rem",
            },
            "@media (min-width:56.25em)": {
              fontSize: "3rem",
            },
          },
        },
        components: {
          MuiLink: {
            defaultProps: {
              component: Link,
            } as LinkProps,
          },
          MuiButtonBase: {
            defaultProps: {
              LinkComponent: Link,
            },
          },
        },
      }),
    [mode]
  );

  return { toggleColorMode, theme, mode };
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ThemeProvider");
  }
  return context;
};
