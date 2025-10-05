import { render, screen, fireEvent } from '@testing-library/react';
import { CityList } from '../CityList';

jest.mock('../../CityCard', () => ({
  CityCard: jest.fn(({ city, onDelete }) => (
    <div data-testid="city-card">
      {city.name}
      <button onClick={onDelete}>Delete</button>
    </div>
  )),
}));

describe('CityList', () => {
  const cities = [
    { name: 'Riga', country: 'LV', lat: 56.95, lon: 24.11, state: 'Riga' },
    { name: 'Tallinn', country: 'EE', lat: 59.44, lon: 24.75, state: 'Harju' },
  ];

  it('renders loading state', () => {
    render(<CityList cities={[]} removeCity={jest.fn()} isLoading />);
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
  });

  it('renders list of cities', () => {
    const removeCity = jest.fn();
    render(
      <CityList cities={cities} removeCity={removeCity} isLoading={false} />,
    );

    const cityCards = screen.getAllByTestId('city-card');
    expect(cityCards).toHaveLength(2);
    expect(screen.getByText('Riga')).toBeInTheDocument();
    expect(screen.getByText('Tallinn')).toBeInTheDocument();

    fireEvent.click(screen.getAllByText('Delete')[0]);
    expect(removeCity).toHaveBeenCalledWith(cities[0]);
  });

  it('renders no cities message', () => {
    render(<CityList cities={[]} removeCity={jest.fn()} isLoading={false} />);
    expect(screen.getByText(/No cities yet/)).toBeInTheDocument();
    expect(screen.getByText(/Add your first city/)).toBeInTheDocument();
    expect(screen.getByTestId('LocationOffRoundedIcon')).toBeInTheDocument();
  });
});
