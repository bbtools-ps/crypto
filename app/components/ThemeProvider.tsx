import { ThemeProvider as MUIThemeProvider } from "@emotion/react";
import { ColorModeContext, useColorTheme } from "~/hooks";

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { toggleColorMode, theme } = useColorTheme();

  return (
    <ColorModeContext.Provider value={{ toggleColorMode }}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}
