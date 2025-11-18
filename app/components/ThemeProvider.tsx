import { ThemeProvider as MUIThemeProvider } from "@emotion/react";
import { ColorModeContext, useColorTheme } from "~/hooks/useColorTheme";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colorMode, theme } = useColorTheme();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}
