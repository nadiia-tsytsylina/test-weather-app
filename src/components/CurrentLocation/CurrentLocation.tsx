import { useGeolocation } from '@/common/hooks/useGeolocation';
import { getWeatherIcon } from '@/common/utils';
import { useGetWeatherByCityQuery } from '@/store';
import { CircularProgress, Stack, Typography } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import Image from 'next/image';

export const CurrentLocation = () => {
  const { coords, error, isLoading } = useGeolocation();
  const { data, isLoading: isDataLoading } = useGetWeatherByCityQuery(
    coords ? { lat: coords.lat, lon: coords.lon } : skipToken,
  );
  const weather = data?.weather?.[0];
  const iconUrl = weather ? getWeatherIcon(weather.icon) : '';

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" gap={2}>
      {(isLoading || isDataLoading) && (
        <CircularProgress data-testid="loading-indicator" />
      )}

      {!isLoading && (!coords || error) && (
        <Typography
          variant="h6"
          color="text.secondary"
          textAlign="center"
          sx={{
            fontSize: { xs: '1rem', sm: '1.25rem' },
          }}
        >
          Location access failed. Please enable location permissions in your
          browser settings and try again
        </Typography>
      )}
      {!isLoading && data && weather && (
        <>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem' },
            }}
          >
            {data.name}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Image
              src={iconUrl}
              alt={weather.description}
              width={100}
              height={100}
            />
            <Typography variant="body1" color="text.secondary">
              {weather.main}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" gap={2}>
            <Stack direction="column" alignItems="center">
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.25rem', sm: '3rem' },
                }}
              >
                {Math.round(data.main.temp)}°C
              </Typography>
            </Stack>
            <Stack direction="column" gap={{ xs: 0.5, sm: 1 }}>
              <Typography variant="body2">
                Feels like: {Math.round(data.main.feels_like)}°C
              </Typography>
              <Typography variant="body2">
                Humidity: {data.main.humidity}%
              </Typography>
              <Typography variant="body2">
                Wind speed: {data.wind.speed} m/s
              </Typography>
            </Stack>
          </Stack>
        </>
      )}
    </Stack>
  );
};
