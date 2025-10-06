import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from './weatherApi';
import citiesReducer from './citiesSlice';
import geoReducer from './geoSlice';

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    cities: citiesReducer,
    geo: geoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
