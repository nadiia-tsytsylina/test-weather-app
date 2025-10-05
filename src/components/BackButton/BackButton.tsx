'use client';
import Link from 'next/link';
import { IconButton, useTheme } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

export const BackButton = () => {
  const theme = useTheme();

  return (
    <Link href="/" passHref>
      <IconButton
        sx={{
          position: 'absolute',
          top: { xs: 64, sm: 80 },
          left: { xs: 8, sm: 16 },
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: 3,
          '&:hover': {
            transform: 'scale(1.1)',
            transition: 'all 0.2s ease-in-out',
          },
          borderRadius: '50%',
          p: { xs: 1, sm: 1.5 },
        }}
      >
        <ArrowBackRoundedIcon fontSize="medium" />
      </IconButton>
    </Link>
  );
};
