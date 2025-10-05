import { render, screen } from '@testing-library/react';
import { ForecastItem } from '@/common/types';
import { HumidityGraph } from '../HumidityGraph';

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

export const mockNext24h: ForecastItem[] = [
  {
    dt: 1696464000,
    dt_txt: '2025-10-05 12:00:00',
    main: {
      temp: 15,
      feels_like: 14,
      temp_min: 14,
      temp_max: 16,
      pressure: 1012,
      humidity: 80,
    },
    weather: [
      { id: 800, main: 'Clear', description: 'clear sky', icon: '01d' },
    ],
    clouds: { all: 0 },
    wind: { speed: 3, deg: 180 },
    pop: 0.2,
    sys: { pod: 'd' },
  },
  {
    dt: 1696467600,
    dt_txt: '2025-10-05 13:00:00',
    main: {
      temp: 16,
      feels_like: 15,
      temp_min: 15,
      temp_max: 17,
      pressure: 1011,
      humidity: 75,
    },
    weather: [
      { id: 801, main: 'Clouds', description: 'few clouds', icon: '02d' },
    ],
    clouds: { all: 20 },
    wind: { speed: 4, deg: 190 },
    pop: 0.1,
    sys: { pod: 'd' },
  },
];

describe('HumidityGraph', () => {
  it('renders without crashing', () => {
    render(<HumidityGraph next24h={mockNext24h} />);
  });
  it('renders tooltip content correctly', () => {
    render(<HumidityGraph next24h={mockNext24h} />);
    expect(screen.queryByText(/Humidity:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Chance of rain:/i)).not.toBeInTheDocument();
  });
});
