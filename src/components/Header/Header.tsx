'use client';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import CloudQueueRoundedIcon from '@mui/icons-material/CloudQueueRounded';
import { ThemeSwitcher } from '../ThemeSwitcher';

export const Header = () => {
  return (
    <AppBar position="static" component="header">
      <Toolbar>
        <CloudQueueRoundedIcon sx={{ mr: 2 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href="/"
          sx={{
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          Weather App
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Typography
          variant="subtitle1"
          sx={{
            cursor: 'default',
            mr: 2,
            display: { xs: 'none', sm: 'block' },
          }}
        >
          Theme:
        </Typography>
        <ThemeSwitcher />
      </Toolbar>
    </AppBar>
  );
};
