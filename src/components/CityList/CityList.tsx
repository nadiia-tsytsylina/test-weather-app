import { FC } from 'react';
import { City } from '@/common/types';
import { CircularProgress, Stack, Typography } from '@mui/material';
import LocationOffRoundedIcon from '@mui/icons-material/LocationOffRounded';
import { CityCard } from '../CityCard';

interface CityListProps {
  cities: City[];
  removeCity: (city: City) => void;
  isLoading: boolean;
}

export const CityList: FC<CityListProps> = ({
  cities,
  removeCity,
  isLoading,
}) => {
  return (
    <Stack
      direction="row"
      flexWrap="wrap"
      gap={2}
      justifyContent="center"
      sx={{
        minHeight: 400,
        alignItems: cities.length === 0 ? 'center' : 'flex-start',
      }}
    >
      {isLoading ? (
        <CircularProgress data-testid="loading-indicator" />
      ) : cities && cities.length > 0 ? (
        cities.map((city) => (
          <CityCard
            key={`${city.lat}_${city.lon}`}
            city={city}
            onDelete={() => removeCity(city)}
          />
        ))
      ) : (
        <Stack alignItems="center" spacing={2}>
          <LocationOffRoundedIcon
            sx={{ fontSize: 60, color: 'text.disabled' }}
          />
          <Typography variant="h5" color="text.secondary">
            No cities yet
          </Typography>
          <Typography
            variant="body2"
            color="text.disabled"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Add your first city to start tracking the weather
          </Typography>
        </Stack>
      )}
    </Stack>
  );
};
