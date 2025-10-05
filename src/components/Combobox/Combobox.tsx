import { ReactElement, useState } from 'react';
import { useGetCitiesQuery } from '@/store';
import { City } from '@/common/types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface ComboBoxProps {
  onSelectCity: (city: City) => void;
  selectedCities: City[];
}

export const ComboBox = ({
  onSelectCity,
  selectedCities,
}: ComboBoxProps): ReactElement => {
  const [inputValue, setInputValue] = useState('');

  const { data: apiCities = [], isLoading } = useGetCitiesQuery(inputValue, {
    skip: inputValue.length < 2,
  });

  return (
    <Autocomplete
      disablePortal
      options={apiCities}
      sx={{ width: '100%' }}
      loading={isLoading}
      inputValue={inputValue}
      onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
      onChange={(_, newValue) => {
        if (newValue) {
          onSelectCity(newValue);
          setInputValue('');
        }
      }}
      getOptionLabel={(option) =>
        `${option.name}, ${option.country}${option.state ? ' (' + option.state + ')' : ''}`
      }
      isOptionEqualToValue={(option, value) =>
        option.lat === value?.lat && option.lon === value?.lon
      }
      getOptionDisabled={(option) =>
        selectedCities.some((c) => c.lat === option.lat && c.lon === option.lon)
      }
      renderOption={(props, option, { index }) => (
        <li {...props} key={`${option.lat}_${option.lon}_${index}`}>
          {option.name}, {option.country}
          {option.state ? ` (${option.state})` : ''}
        </li>
      )}
      renderInput={(params) => <TextField {...params} label="Add new city" />}
    />
  );
};
