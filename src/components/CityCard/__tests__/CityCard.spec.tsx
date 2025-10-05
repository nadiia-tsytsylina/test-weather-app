import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CityCard } from '../CityCard';
import { useGetWeatherByCityQuery } from '@/store';
import { City } from '@/common/types';
import * as utils from '@/common/utils';

jest.mock('@/store', () => ({
  useGetWeatherByCityQuery: jest.fn(),
}));

jest.mock('@/common/utils', () => ({
  getWeatherIcon: jest.fn(),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return React.createElement('img', props);
  },
}));

describe('CityCard', () => {
  const city: City = {
    name: 'Riga',
    country: 'LV',
    lat: 56.95,
    lon: 24.11,
    state: 'Riga',
  };

  const onDeleteMock = jest.fn();
  const refetchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      refetch: refetchMock,
    });

    render(<CityCard city={city} onDelete={onDeleteMock} />);
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('renders "No data available" when no weather', () => {
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      refetch: refetchMock,
    });

    render(<CityCard city={city} onDelete={onDeleteMock} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders weather data correctly', () => {
    const weatherData = {
      main: { temp: 10, feels_like: 8, humidity: 60 },
      weather: [{ icon: '01d', main: 'Clear', description: 'clear sky' }],
      wind: { speed: 5 },
    };

    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: weatherData,
      isLoading: false,
      refetch: refetchMock,
    });

    (utils.getWeatherIcon as jest.Mock).mockReturnValue('icon.png');

    render(<CityCard city={city} onDelete={onDeleteMock} />);

    expect(screen.getByText(/Riga, LV/)).toBeInTheDocument();
    expect(screen.getByText('10°C')).toBeInTheDocument();
    expect(screen.getByText('Feels like: 8°C')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 60%')).toBeInTheDocument();
    expect(screen.getByText('Wind speed: 5 m/s')).toBeInTheDocument();

    expect(screen.getByRole('img')).toHaveAttribute('src', 'icon.png');
  });

  it('calls refetch on Refresh button click', () => {
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: {},
      isLoading: false,
      refetch: refetchMock,
    });

    render(<CityCard city={city} onDelete={onDeleteMock} />);
    fireEvent.click(screen.getByText('Refresh'));
    expect(refetchMock).toHaveBeenCalled();
  });

  it('calls onDelete on Delete button click', () => {
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: {},
      isLoading: false,
      refetch: refetchMock,
    });

    render(<CityCard city={city} onDelete={onDeleteMock} />);
    fireEvent.click(screen.getByText('Delete'));
    expect(onDeleteMock).toHaveBeenCalled();
  });
});
