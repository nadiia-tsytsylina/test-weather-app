import { FC } from 'react';
import { Stack, SxProps } from '@mui/material';
import { WeatherInfoItem, WeatherInfoItemProps } from './WeatherInfoItem';

interface WeatherDetailsColumnProps {
  items: WeatherInfoItemProps[];
  sx?: SxProps;
}

export const WeatherDetailsColumn: FC<WeatherDetailsColumnProps> = ({
  items,
  sx,
}) => (
  <Stack
    gap={{ xs: 1, sm: 2, lg: 3 }}
    alignItems={{ xs: 'center', md: 'start' }}
    sx={sx}
  >
    {items.map((item) => (
      <WeatherInfoItem
        key={item.label}
        label={item.label}
        value={item.value}
        unit={item.unit}
      />
    ))}
  </Stack>
);
