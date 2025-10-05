import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppProvider } from '../AppProvider';
import { useTheme } from '@/common/hooks/useTheme';

jest.mock('@/common/hooks/useTheme');
jest.mock('../../Header', () => ({
  Header: () => React.createElement('div', null, 'HeaderMock'),
}));
jest.mock('../../Footer', () => ({
  Footer: () => React.createElement('div', null, 'FooterMock'),
}));

describe('AppProvider', () => {
  it('does not render children when not mounted', () => {
    (useTheme as jest.Mock).mockReturnValue({
      mode: 'light',
      toggleTheme: jest.fn(),
      mounted: false,
    });

    const { container } = render(
      <AppProvider>
        <div>Child</div>
      </AppProvider>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders Header, Footer and children when mounted', () => {
    (useTheme as jest.Mock).mockReturnValue({
      mode: 'light',
      toggleTheme: jest.fn(),
      mounted: true,
    });

    render(
      <AppProvider>
        <div>Child</div>
      </AppProvider>,
    );

    expect(screen.getByText('HeaderMock')).toBeInTheDocument();
    expect(screen.getByText('FooterMock')).toBeInTheDocument();
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
});
