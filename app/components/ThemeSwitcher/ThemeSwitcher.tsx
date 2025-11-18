import { IconButton, useTheme } from "@mui/material";
import { Moon, Sun } from "lucide-react";
import { useColorMode } from "~/hooks/useColorMode";

export default function ThemeSwitcher() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={toggleColorMode}
      color="inherit"
      aria-label="Theme switch"
    >
      {theme.palette.mode === "dark" ? <Moon /> : <Sun />}
    </IconButton>
  );
}
