import { createContext, useContext } from "react";

interface ColorModeContext {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContext | null>(null);

export function useColorModeContext() {
  const ctx = useContext(ColorModeContext);

  if (!ctx) {
    throw new Error(
      "Dropdown related components must be wrapped by <ColorModeContext />"
    );
  }

  return ctx;
}
