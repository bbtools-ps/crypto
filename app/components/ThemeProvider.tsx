import { ThemeProvider as MUIThemeProvider } from "@emotion/react";
import { createTheme, type LinkProps } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemeContext, useBrowserTheme } from "~/hooks";
import Link from "./Links/Link";

type ColorMode = "light" | "dark";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<ColorMode>(
    (localStorage.getItem("theme") as ColorMode) || "light"
  );

  const toggleTheme = useCallback(() => {
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
  const isDarkTheme = useBrowserTheme();

  useEffect(() => {
    if (localStorage.getItem("theme")) return;

    if (isDarkTheme) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, [isDarkTheme]);

  const contextValue = useMemo(() => ({ toggleTheme }), [toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  );
}
