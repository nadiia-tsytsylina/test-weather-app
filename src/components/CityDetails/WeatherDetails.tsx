import { FC } from 'react';
import { Box } from '@mui/system';
import { WeatherInfoItem, WeatherInfoItemProps } from './WeatherInfoItem';

interface WeatherDetailsProps {
  items: WeatherInfoItemProps[];
}

export const WeatherDetails: FC<WeatherDetailsProps> = ({ items }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: {
        xs: '1fr',
        sm: 'repeat(2, 1fr)',
        md: 'repeat(3, 1fr)',
      },
      gap: { xs: 1, sm: 2, lg: 3 },
      justifyContent: 'center',
      textAlign: { xs: 'center', md: 'start' },
    }}
  >
    {items.map(({ label, value, unit }) => (
      <WeatherInfoItem key={label} label={label} value={value} unit={unit} />
    ))}
  </Box>
);
