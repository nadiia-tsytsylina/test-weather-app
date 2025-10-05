import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { ComboBox } from '../Combobox';
import { useGetCitiesQuery } from '@/store';

jest.mock('@/store');

const mockCities = [
  { name: 'Riga', country: 'LV', lat: 56.95, lon: 24.11, state: 'Riga' },
  { name: 'Tallinn', country: 'EE', lat: 59.44, lon: 24.75, state: 'Harju' },
];

describe('ComboBox', () => {
  const onSelectCity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders TextField', () => {
    (useGetCitiesQuery as jest.Mock).mockReturnValue({
      data: [],
      isLoading: false,
    });
    render(<ComboBox onSelectCity={onSelectCity} selectedCities={[]} />);
    expect(screen.getByLabelText(/Add new city/i)).toBeInTheDocument();
  });

  it('renders options from API', async () => {
    (useGetCitiesQuery as jest.Mock).mockReturnValue({
      data: mockCities,
      isLoading: false,
    });
    render(<ComboBox onSelectCity={onSelectCity} selectedCities={[]} />);

    const input = screen.getByLabelText(/Add new city/i);
    fireEvent.change(input, { target: { value: 'Ri' } });

    await waitFor(() => {
      expect(screen.getByText(/Riga, LV \(Riga\)/)).toBeInTheDocument();
      expect(screen.getByText(/Tallinn, EE \(Harju\)/)).toBeInTheDocument();
    });
  });

  it('calls onSelectCity on selection', async () => {
    (useGetCitiesQuery as jest.Mock).mockReturnValue({
      data: mockCities,
      isLoading: false,
    });
    render(<ComboBox onSelectCity={onSelectCity} selectedCities={[]} />);

    const input = screen.getByLabelText(/Add new city/i);
    fireEvent.change(input, { target: { value: 'Ri' } });

    await waitFor(() => {
      act(() => {
        fireEvent.click(screen.getByText(/Riga, LV \(Riga\)/));
      });
    });

    expect(onSelectCity).toHaveBeenCalledWith(mockCities[0]);
  });

  it('disables options that are already selected', async () => {
    (useGetCitiesQuery as jest.Mock).mockReturnValue({
      data: mockCities,
      isLoading: false,
    });
    render(
      <ComboBox onSelectCity={onSelectCity} selectedCities={[mockCities[0]]} />,
    );

    const input = screen.getByLabelText(/Add new city/i);
    fireEvent.change(input, { target: { value: 'Ri' } });

    await waitFor(() => {
      const rigaOption = screen.getByText(/Riga, LV \(Riga\)/).closest('li');
      expect(rigaOption).toHaveAttribute('aria-disabled', 'true');
    });
  });
});
