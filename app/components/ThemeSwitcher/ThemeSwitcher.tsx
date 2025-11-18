import { IconButton } from "@mui/material";
import { Moon, Sun } from "lucide-react";
import { useColorMode } from "~/hooks/useColorTheme";

export default function ThemeSwitcher() {
  const { toggleColorMode, mode } = useColorMode();

  return (
    <IconButton
      sx={{ ml: 1 }}
      onClick={toggleColorMode}
      color="inherit"
      aria-label="Theme switch"
    >
      {mode === "dark" ? <Moon /> : <Sun />}
    </IconButton>
  );
}
