import { renderHook, act } from '@testing-library/react';
import { useTheme } from '../useTheme';
import { ThemeMode } from '../../enums';

describe('useTheme', () => {
  beforeEach(() => localStorage.clear());

  it('initializes with DARK mode by default', () => {
    const { result } = renderHook(() => useTheme());

    expect(result.current.mode).toBe(ThemeMode.DARK);
    expect(result.current.mounted).toBe(true);
  });

  it('reads mode from localStorage', () => {
    localStorage.setItem('theme', ThemeMode.LIGHT);

    const { result } = renderHook(() => useTheme());

    expect(result.current.mode).toBe(ThemeMode.LIGHT);
    expect(result.current.mounted).toBe(true);
  });

  it('toggles theme', () => {
    const { result } = renderHook(() => useTheme());

    act(() => result.current.toggleTheme());
    expect(result.current.mode).toBe(ThemeMode.LIGHT);

    act(() => result.current.toggleTheme());
    expect(result.current.mode).toBe(ThemeMode.DARK);
  });
});
