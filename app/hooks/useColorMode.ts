import { type PaletteMode } from "@mui/material";
import { createContext, useContext } from "react";

interface ColorModeContextType {
  toggleColorMode: () => void;
  mode: PaletteMode;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  mode: "light",
});

export const useColorMode = () => {
  const context = useContext(ColorModeContext);

  if (!context) {
    throw new Error("useColorMode must be used within a ThemeProvider");
  }

  return context;
};
