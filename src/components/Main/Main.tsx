'use client';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Stack, Typography } from '@mui/material';
import { City } from '@/common/types';
import { addCity, removeCity, RootState, setCities } from '@/store';
import { ComboBox } from '../Combobox';
import { CityList } from '../CityList';

export const Main = (): ReactElement => {
  const [isClientLoaded, setIsClientLoaded] = useState(false);
  const cities = useSelector((state: RootState) => state.cities);
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem('cities');
    if (saved) dispatch(setCities(JSON.parse(saved)));
    setIsClientLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    if (isClientLoaded) {
      localStorage.setItem('cities', JSON.stringify(cities));
    }
  }, [cities, isClientLoaded]);

  const handleAddCity = (city: City) => dispatch(addCity(city));
  const handleRemoveCity = (city: City) => dispatch(removeCity(city));

  return (
    <Stack gap={4} alignItems="center" px={3}>
      <Box sx={{ maxWidth: 1000, width: '100%' }}>
        <ComboBox onSelectCity={handleAddCity} selectedCities={cities} />
      </Box>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: '1.75rem', sm: '2.5rem' },
        }}
      >
        My Cities
      </Typography>

      <CityList
        cities={cities}
        removeCity={handleRemoveCity}
        isLoading={!isClientLoaded}
      />
    </Stack>
  );
};
