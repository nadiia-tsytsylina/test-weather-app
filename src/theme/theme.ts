import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: { default: '#fff', paper: '#f9f9f9' },
            text: { primary: '#171717', secondary: '#888888' },
          }
        : {
            background: { default: '#201f1f', paper: '#1b1a1a' },
            text: { primary: '#fff', secondary: '#bbb' },
          }),
    },
    typography: {
      fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
      fontSize: 14,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', borderRadius: 8 },
        },
      },
    },
  });
