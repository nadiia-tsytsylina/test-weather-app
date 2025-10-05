import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  City,
  CityForecastResponse,
  WeatherRequest,
  WeatherResponse,
} from '../common/types';

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.openweathermap.org',
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<WeatherResponse, WeatherRequest>({
      query: ({ lat, lon }) =>
        `/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
    }),
    getCities: builder.query<City[], string>({
      query: (search) => `/geo/1.0/direct?q=${search}&limit=5&appid=${API_KEY}`,
    }),
    getHourlyWeatherByCity: builder.query<CityForecastResponse, WeatherRequest>(
      {
        query: ({ lat, lon }) =>
          `/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`,
      },
    ),
  }),
});

export const {
  useGetWeatherByCityQuery,
  useGetCitiesQuery,
  useGetHourlyWeatherByCityQuery,
} = weatherApi;
