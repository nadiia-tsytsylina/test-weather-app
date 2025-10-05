import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { ThemeContext } from '@/common/context';
import { ThemeMode } from '@/common/enums';
import { ReactNode, useState } from 'react';

const TestThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>(ThemeMode.LIGHT);
  const toggleTheme = () =>
    setMode((prev) =>
      prev === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT,
    );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

describe('ThemeSwitcher', () => {
  it('toggles theme between light and dark', () => {
    render(
      <TestThemeProvider>
        <ThemeSwitcher />
      </TestThemeProvider>,
    );

    const switchInput = screen.getByLabelText(
      /toggle theme/i,
    ) as HTMLInputElement;

    expect(switchInput.checked).toBe(false);

    fireEvent.click(switchInput);
    expect(switchInput.checked).toBe(true);

    fireEvent.click(switchInput);
    expect(switchInput.checked).toBe(false);
  });
});
