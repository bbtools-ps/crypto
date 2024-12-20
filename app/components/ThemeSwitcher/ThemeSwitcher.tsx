import { ColorModeContext } from '~/hooks/useColorTheme';
import { IconButton, useTheme } from '@mui/material';
import { useContext } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeSwitcher() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit" aria-label="Theme switch" data-cy="theme-switch-btn">
      {theme.palette.mode === 'dark' ? <Moon /> : <Sun />}
    </IconButton>
  );
}
