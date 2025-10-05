'use client';
import { Box, Link, Stack, Typography, useTheme } from '@mui/material';

export const Footer = () => {
  const theme = useTheme();
  const footerBg = theme.palette.background.paper;

  return (
    <Box
      component="footer"
      sx={{
        p: 3,
        mt: 'auto',
        backgroundColor: footerBg,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        gap={1}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} My Weather App
        </Typography>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography variant="body2" color="text.secondary">
            Developed by
          </Typography>
          <Link
            href="https://github.com/nadiia-tsytsylina"
            target="_blank"
            rel="noopener noreferrer"
            color="primary"
            sx={{ fontWeight: 500 }}
          >
            Nadiia Tsytsylina
          </Link>
        </Stack>
      </Stack>
    </Box>
  );
};
