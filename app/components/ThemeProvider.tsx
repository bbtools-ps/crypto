import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  type LinkProps,
  type PaletteMode,
} from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import { Link } from "react-router";
import { ColorModeContext } from "~/hooks/useColorMode";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedTheme = localStorage.getItem("theme") as PaletteMode;

    if (savedTheme) return savedTheme;

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

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}
