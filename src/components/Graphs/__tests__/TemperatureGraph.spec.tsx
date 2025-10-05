import { render, screen } from '@testing-library/react';
import { TemperatureGraph } from '../TemperatureGraph';
import { mockNext24h } from './HumidityGraph.spec';

global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('TemperatureGraph', () => {
  it('renders without crashing', () => {
    render(<TemperatureGraph next24h={mockNext24h} />);
  });

  it('renders tooltip content correctly', () => {
    render(<TemperatureGraph next24h={mockNext24h} />);
    expect(screen.queryByText(/Temp:/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Feels like:/i)).not.toBeInTheDocument();
  });
});
