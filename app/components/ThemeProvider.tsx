import { ThemeProvider as MUIThemeProvider } from "@emotion/react";
import { ColorModeContext, useColorTheme } from "~/hooks/useColorTheme";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toggleColorMode, theme, mode } = useColorTheme();

  return (
    <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}
