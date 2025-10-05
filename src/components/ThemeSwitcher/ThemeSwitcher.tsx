'use client';
import { useThemeContext } from '@/common/context';
import { ThemeMode } from '@/common/enums';
import { Stack, Switch } from '@mui/material';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';

export const ThemeSwitcher = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <Stack direction="row" alignItems="center" gap={0.5}>
      <LightModeRoundedIcon />
      <Switch
        checked={mode === ThemeMode.DARK}
        onChange={toggleTheme}
        slotProps={{ input: { 'aria-label': 'Toggle theme' } }}
      />
      <DarkModeRoundedIcon />
    </Stack>
  );
};
