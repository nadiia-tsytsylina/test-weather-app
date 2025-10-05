import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../common/types';

const initialState: City[] = [];

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setCities: (_, action: PayloadAction<City[]>) => action.payload,
    addCity: (state, action: PayloadAction<City>) => {
      const exists = state.some(
        (c) => c.lat === action.payload.lat && c.lon === action.payload.lon,
      );
      if (!exists) state.push(action.payload);
    },
    removeCity: (state, action: PayloadAction<City>) =>
      state.filter(
        (c) => c.lat !== action.payload.lat || c.lon !== action.payload.lon,
      ),
  },
});

export const { setCities, addCity, removeCity } = citiesSlice.actions;
export default citiesSlice.reducer;
