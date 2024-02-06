import { createTheme, LinkProps } from "@mui/material";
import { createContext, useEffect, useMemo, useState } from "react";
import LinkBehavior from "../components/LinkBehavior/LinkBehavior";
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
        components: {
          MuiLink: {
            defaultProps: {
              component: LinkBehavior,
            } as LinkProps,
          },
          MuiButtonBase: {
            defaultProps: {
              LinkComponent: LinkBehavior,
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
