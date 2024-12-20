import { createTheme, type LinkProps } from "@mui/material";
import { createContext, useEffect, useMemo, useState } from "react";
import Link from "../components/Links/Link";
import { useBrowserTheme } from "./useBrowserTheme";

type ColorMode = "light" | "dark";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

export const useColorTheme = () => {
  const [mode, setMode] = useState<ColorMode>(
    (localStorage.getItem("theme") as ColorMode) || "light"
  );
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
  const isDarkTheme = useBrowserTheme();

  // Set the default color theme based on browser's color theme
  useEffect(() => {
    // If the user has already picked the color theme return
    if (localStorage.getItem("theme")) return;

    if (isDarkTheme) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, [isDarkTheme]);

  return { colorMode, theme };
};
