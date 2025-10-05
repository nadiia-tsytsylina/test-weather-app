'use client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import { store } from '@/store';
import { ThemeContext } from '@/common/context';
import { getTheme } from '@/theme';
import { useTheme } from '@/common/hooks/useTheme';
import { Header } from '../Header';
import { Footer } from '../Footer';

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const { mode, toggleTheme, mounted } = useTheme();
  const theme = getTheme(mode === 'light' ? 'light' : 'dark');

  if (!mounted) return null;

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ mode, toggleTheme }}>
        <ThemeProvider theme={theme}>
          <Box
            display="flex"
            flexDirection="column"
            minHeight="100svh"
            gap={7.5}
          >
            <Header />
            <Box component="main" flexGrow={1}>
              {children}
            </Box>
            <Footer />
          </Box>
        </ThemeProvider>
      </ThemeContext.Provider>
    </Provider>
  );
};
