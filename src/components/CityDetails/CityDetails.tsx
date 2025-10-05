import { ReactElement, useMemo } from 'react';
import { useGetHourlyWeatherByCityQuery } from '@/store';
import { getWeatherIcon } from '@/common/utils';
import { HumidityGraph, TemperatureGraph } from '../Graphs';
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from '@mui/material';
import WaterRoundedIcon from '@mui/icons-material/WaterRounded';
import ThermostatRoundedIcon from '@mui/icons-material/ThermostatRounded';
import { WeatherDetailsColumn } from './WeatherDetailsColumn';
import { BackButton } from '../BackButton';

interface CityDetailsProps {
  lat: number;
  lon: number;
}

export const CityDetails = ({ lat, lon }: CityDetailsProps): ReactElement => {
  const { data, isLoading } = useGetHourlyWeatherByCityQuery({ lat, lon });

  const next1h = data?.list[0];
  const next24h = data?.list.slice(0, 8);

  const column1 = useMemo(() => {
    if (!next1h) return [];
    return [
      { label: 'Temp', value: next1h.main.temp, unit: '°C' },
      { label: 'Feels like', value: next1h.main.feels_like, unit: '°C' },
      { label: 'Min', value: next1h.main.temp_min, unit: '°C' },
      { label: 'Max', value: next1h.main.temp_max, unit: '°C' },
    ];
  }, [next1h]);

  const column2 = useMemo(() => {
    if (!next1h) return [];
    return [
      { label: 'Humidity', value: next1h.main.humidity, unit: '%' },
      { label: 'Pressure', value: next1h.main.pressure, unit: 'hPa' },
      { label: 'Chance of rain', value: next1h.pop * 100, unit: '%' },
      { label: 'Wind', value: `${next1h.wind.speed} m/s, ${next1h.wind.deg}°` },
    ];
  }, [next1h]);

  const column3 = useMemo(() => {
    if (!next1h) return [];
    return [
      { label: 'Clouds', value: next1h.clouds.all, unit: '%' },
      ...(next1h.visibility
        ? [{ label: 'Visibility', value: next1h.visibility, unit: 'm' }]
        : []),
      ...(next1h.main.sea_level
        ? [{ label: 'Sea level', value: next1h.main.sea_level, unit: 'hPa' }]
        : []),
      ...(next1h.main.grnd_level
        ? [
            {
              label: 'Ground level',
              value: next1h.main.grnd_level,
              unit: 'hPa',
            },
          ]
        : []),
    ];
  }, [next1h]);

  if (isLoading || !data || !next1h || !next24h) {
    return (
      <Stack
        gap={2}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: 400 }}
      >
        {isLoading ? (
          <CircularProgress data-testid="loading-indicator" />
        ) : (
          <Typography>No data available</Typography>
        )}
      </Stack>
    );
  }

  const weather = next1h.weather[0];

  return (
    <Stack gap={8} alignItems="center" px={3}>
      <BackButton />
      <Stack
        alignItems="center"
        justifyContent="center"
        direction={{ xs: 'column', md: 'row' }}
        gap={{ xs: 2, sm: 4, lg: 6 }}
        sx={{ width: '100%', maxWidth: 1400 }}
      >
        <Stack gap={2} alignItems="center">
          <Typography
            variant="h3"
            fontWeight="bold"
            color="primary"
            sx={{
              fontSize: { xs: '1.5rem', sm: '2rem', lg: '2.25rem' },
            }}
          >
            {data.city.name}, {data.city.country}
          </Typography>
          <Box
            component="img"
            src={getWeatherIcon(weather?.icon)}
            alt={weather.description}
            sx={{
              width: { xs: 100, sm: 120, lg: 140 },
              height: 'auto',
            }}
          />
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem', lg: '2rem' },
            }}
          >
            {weather.main} ({weather.description})
          </Typography>
        </Stack>

        <Stack gap={2} alignItems={{ xs: 'center', md: 'start' }}>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.25rem', sm: '1.5rem', lg: '2rem' },
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            Detailed Weather Information for next hour
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={{ xs: 1, sm: 2, lg: 3 }}
            justifyContent="center"
          >
            <WeatherDetailsColumn items={column1} />
            <WeatherDetailsColumn items={column2} />
            <WeatherDetailsColumn
              items={column3}
              sx={{ display: { xs: 'none', md: 'flex' } }}
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack
        alignItems="center"
        justifyContent="center"
        direction={{ xs: 'column', lg: 'row' }}
        gap={{ xs: 4, lg: 6 }}
        width="100%"
      >
        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Stack
              gap={{ xs: 1, sm: 2, lg: 3 }}
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <ThermostatRoundedIcon
                sx={{ fontSize: 40, color: 'text.secondary' }}
              />
              <TemperatureGraph next24h={next24h} />
              <Typography
                variant="h5"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  fontSize: { xs: '1.25rem', lg: '1.5rem' },
                }}
              >
                Hourly Temperature Forecast
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card sx={{ width: '100%' }}>
          <CardContent>
            <Stack
              gap={{ xs: 1, sm: 2, lg: 3 }}
              alignItems="center"
              justifyContent="center"
              width="100%"
            >
              <WaterRoundedIcon
                sx={{ fontSize: 40, color: 'text.secondary' }}
              />
              <HumidityGraph next24h={next24h} />
              <Typography
                variant="h5"
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  fontSize: { xs: '1.25rem', lg: '1.5rem' },
                }}
              >
                Hourly Humidity Forecast
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Stack>
  );
};
