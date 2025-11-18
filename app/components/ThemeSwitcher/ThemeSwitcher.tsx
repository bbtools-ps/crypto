import { IconButton, useTheme } from "@mui/material";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import { useColorTheme } from "~/hooks/useColorTheme";

export default function ThemeSwitcher() {
  const theme = useTheme();
  const { colorMode } = useColorTheme();

  useEffect(() => {
    if (theme.palette.mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme.palette.mode]);

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={colorMode.toggleColorMode}
      color="inherit"
      aria-label="Theme switch"
      data-cy="theme-switch-btn"
    >
      {theme.palette.mode === "dark" ? <Moon /> : <Sun />}
    </IconButton>
  );
}
