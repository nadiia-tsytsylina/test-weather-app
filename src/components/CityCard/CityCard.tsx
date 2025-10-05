'use client';
import Link from 'next/link';
import { ReactElement } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AutorenewRoundedIcon from '@mui/icons-material/AutorenewRounded';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import {
  CardActionArea,
  CardActions,
  CircularProgress,
  Stack,
} from '@mui/material';
import { useGetWeatherByCityQuery } from '@/store';
import { City } from '@/common/types';
import { getWeatherIcon } from '@/common/utils';

interface CityCardProps {
  city: City;
  onDelete: () => void;
}

export const CityCard = ({ city, onDelete }: CityCardProps): ReactElement => {
  const { country, lat, lon, name } = city;
  const { data, isLoading, refetch } = useGetWeatherByCityQuery({ lat, lon });

  const weather = data?.weather?.[0];
  const iconUrl = weather ? getWeatherIcon(weather.icon) : '';

  return (
    <Card sx={{ width: { xs: '100%', sm: 400 } }}>
      <CardActionArea
        component={Link}
        href={`/${city.name}?lat=${city.lat}&lon=${city.lon}`}
        disabled={isLoading || !data}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
            minHeight: { xs: '100%', sm: 300 },
            justifyContent: 'center',
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : !data || !weather ? (
            <Typography variant="h6" color="text.secondary">
              No data available
            </Typography>
          ) : (
            <>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: '1.5rem', sm: '2rem' },
                }}
              >
                {name}, {country}
              </Typography>
              <Stack direction="column" alignItems="center">
                <img src={iconUrl} alt={weather.description} />
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
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
        }}
      >
        <Button
          size="large"
          variant="text"
          onClick={refetch}
          loading={isLoading}
          startIcon={<AutorenewRoundedIcon />}
        >
          Refresh
        </Button>
        <Button
          size="large"
          variant="text"
          onClick={onDelete}
          startIcon={<DeleteOutlineRoundedIcon />}
          color="error"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};
