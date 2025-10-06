import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GeoState {
  coords: { lat: number; lon: number } | null;
}

const initialState: GeoState = {
  coords: null,
};

export const geoSlice = createSlice({
  name: 'geo',
  initialState,
  reducers: {
    setCoords: (state, action: PayloadAction<{ lat: number; lon: number }>) => {
      state.coords = action.payload;
    },
  },
});

export const { setCoords } = geoSlice.actions;
export default geoSlice.reducer;
