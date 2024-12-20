import { ColorModeContext, useColorTheme } from '~/hooks';
import { ThemeProvider as MUIThemeProvider } from '@emotion/react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorMode, theme } = useColorTheme();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ColorModeContext.Provider>
  );
}
