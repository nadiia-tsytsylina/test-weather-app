import { render, screen } from '@testing-library/react';
import { CityDetails } from '../CityDetails';
import { useGetHourlyWeatherByCityQuery } from '@/store';
import { getWeatherIcon } from '@/common/utils';
import { useRouter } from 'next/navigation';

jest.mock('@/store');
jest.mock('@/common/utils');

jest.mock('../../Graphs', () => ({
  TemperatureGraph: () => <div data-testid="temperature-graph" />,
  HumidityGraph: () => <div data-testid="humidity-graph" />,
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

(useRouter as jest.Mock).mockReturnValue({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
});

describe('CityDetails', () => {
  const lat = 56.95;
  const lon = 24.11;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders weather data correctly', () => {
    (useGetHourlyWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: {
        city: { name: 'Riga', country: 'LV' },
        list: [
          {
            main: {
              temp: 10,
              feels_like: 8,
              temp_min: 9,
              temp_max: 11,
              humidity: 80,
              pressure: 1012,
            },
            weather: [
              { main: 'Clouds', description: 'broken clouds', icon: '01d' },
            ],
            wind: { speed: 3.5, deg: 180 },
            clouds: { all: 75 },
            pop: 0.2,
          },
          {
            main: { temp: 11, humidity: 75 },
            weather: [
              { main: 'Clouds', description: 'few clouds', icon: '01d' },
            ],
            wind: { speed: 3, deg: 90 },
            clouds: { all: 40 },
            pop: 0.1,
          },
        ],
      },
      isLoading: false,
    });

    (getWeatherIcon as jest.Mock).mockReturnValue('/icon.png');

    render(<CityDetails lat={56.95} lon={24.11} />);

    expect(screen.getByText(/Riga, LV/)).toBeInTheDocument();
    expect(screen.getByText(/Clouds \(broken clouds\)/)).toBeInTheDocument();
    expect(screen.getByTestId('temperature-graph')).toBeInTheDocument();
    expect(screen.getByTestId('humidity-graph')).toBeInTheDocument();
  });

  it('renders loading state', () => {
    (useGetHourlyWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<CityDetails lat={lat} lon={lon} />);

    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('renders "No data available" when no weather', () => {
    (useGetHourlyWeatherByCityQuery as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<CityDetails lat={lat} lon={lon} />);

    expect(screen.getByText(/No data available/)).toBeInTheDocument();
  });
});
