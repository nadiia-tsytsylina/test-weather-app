'use client';
import { useRouter } from 'next/navigation';
import { IconButton } from '@mui/material';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { useTheme } from '@/common/hooks';

export const BackButton = () => {
  const router = useRouter();
  const { mode } = useTheme();

  return (
    <IconButton
      onClick={() => router.push('/')}
      sx={{
        position: 'absolute',
        top: { xs: 64, sm: 80 },
        left: { xs: 8, sm: 16 },
        bgcolor: mode === 'light' ? '#fff' : '#121212',
        color: mode === 'light' ? '#000' : '#fff',
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
  );
};
