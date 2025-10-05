import React from 'react';
import { render, screen } from '@testing-library/react';
import { CurrentLocation } from '../CurrentLocation';
import { useGeolocation } from '@/common/hooks/useGeolocation';
import { useGetWeatherByCityQuery } from '@/store';
import * as utils from '@/common/utils';

jest.mock('@/common/hooks/useGeolocation');
jest.mock('@/store');
jest.mock('@/common/utils', () => ({
  getWeatherIcon: jest.fn(),
}));
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) =>
    React.createElement('img', props),
}));

describe('CurrentLocation', () => {
  const getWeatherIconMock = utils.getWeatherIcon as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading when geolocation or query is loading', () => {
    (useGeolocation as jest.Mock).mockReturnValue({
      coords: null,
      error: null,
      isLoading: true,
    });
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<CurrentLocation />);
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('shows error message if geolocation failed', () => {
    (useGeolocation as jest.Mock).mockReturnValue({
      coords: null,
      error: 'Denied',
      isLoading: false,
    });
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<CurrentLocation />);
    expect(screen.getByText(/Location access failed/i)).toBeInTheDocument();
  });

  it('renders weather data correctly', () => {
    (useGeolocation as jest.Mock).mockReturnValue({
      coords: { lat: 1, lon: 1 },
      error: null,
      isLoading: false,
    });
    (useGetWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: {
        name: 'Riga',
        weather: [{ icon: '01d', main: 'Clear', description: 'clear sky' }],
        main: { temp: 10, feels_like: 8, humidity: 50 },
        wind: { speed: 2 },
      },
      isLoading: false,
    });
    getWeatherIconMock.mockReturnValue('icon.png');

    render(<CurrentLocation />);

    expect(screen.getByText(/Riga/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear/i)).toBeInTheDocument();
    expect(screen.getByText('10°C')).toBeInTheDocument();
    expect(screen.getByText('Feels like: 8°C')).toBeInTheDocument();
    expect(screen.getByText('Humidity: 50%')).toBeInTheDocument();
    expect(screen.getByText('Wind speed: 2 m/s')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'icon.png');
  });
});
