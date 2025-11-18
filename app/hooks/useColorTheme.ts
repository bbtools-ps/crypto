import { createTheme, type LinkProps } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { Link } from "react-router";

type ColorMode = "light" | "dark";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorTheme = () => {
  const [mode, setMode] = useState<ColorMode>(() => {
    const savedTheme = localStorage.getItem("theme") as ColorMode;
    if (savedTheme) return savedTheme;
    // Fall back to browser preference if no saved theme
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        localStorage.setItem("theme", mode === "light" ? "dark" : "light");
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );
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

  return { colorMode, theme };
};
