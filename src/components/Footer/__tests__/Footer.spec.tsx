import { render, screen } from '@testing-library/react';
import { Footer } from '../Footer';

describe('Footer', () => {
  it('renders copyright and developer link', () => {
    render(<Footer />);

    const year = new Date().getFullYear().toString();
    expect(
      screen.getByText(new RegExp(`© ${year} My Weather App`)),
    ).toBeInTheDocument();

    const link = screen.getByRole('link', { name: /Nadiia Tsytsylina/i });
    expect(link).toHaveAttribute(
      'href',
      'https://github.com/nadiia-tsytsylina',
    );
  });
});
