'use client';
import { useEffect, useState } from 'react';
import { ThemeMode } from '@/common/enums';

export const useTheme = () => {
  const [mode, setMode] = useState<ThemeMode>(ThemeMode.DARK);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedMode =
      (localStorage.getItem('theme') as ThemeMode) || ThemeMode.DARK;
    setMode(storedMode);
    document.body.setAttribute('data-theme', storedMode);
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const nextMode =
      mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    setMode(nextMode);
    localStorage.setItem('theme', nextMode);
    document.body.setAttribute('data-theme', nextMode);
  };

  return { mode, toggleTheme, mounted };
};
