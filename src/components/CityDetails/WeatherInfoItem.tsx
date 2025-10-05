import { FC } from 'react';
import { Typography } from '@mui/material';

export interface WeatherInfoItemProps {
  label: string;
  value: string | number;
  unit?: string;
}

export const WeatherInfoItem: FC<WeatherInfoItemProps> = ({
  label,
  value,
  unit,
}) => (
  <Typography
    variant="h5"
    color="textSecondary"
    sx={{
      fontSize: { xs: '1.25rem', lg: '1.5rem' },
    }}
  >
    {label}:{' '}
    <Typography
      component="span"
      color="primary"
      fontWeight="bold"
      fontSize="inherit"
    >
      {value}
      {unit}
    </Typography>
  </Typography>
);
