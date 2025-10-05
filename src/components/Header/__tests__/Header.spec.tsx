import { render, screen } from '@testing-library/react';
import { Header } from '../Header';

jest.mock('../../ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher" />,
}));

describe('Header', () => {
  it('renders app title with correct link', () => {
    render(<Header />);

    const titleLink = screen.getByRole('link', { name: /Weather App/i });
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute('href', '/');
  });

  it('renders Theme label', () => {
    render(<Header />);
    expect(screen.getByText(/Theme:/i)).toBeInTheDocument();
  });

  it('renders ThemeSwitcher component', () => {
    render(<Header />);
    expect(screen.getByTestId('theme-switcher')).toBeInTheDocument();
  });
});
