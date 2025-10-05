import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BackButton } from '../BackButton';
import { useTheme } from '@/common/hooks';
import { useRouter } from 'next/navigation';

jest.mock('@/common/hooks');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('BackButton', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (useTheme as jest.Mock).mockReturnValue({ mode: 'light' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the arrow icon', () => {
    render(<BackButton />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
  });

  it('calls router.push("/") when clicked', () => {
    render(<BackButton />);
    fireEvent.click(screen.getByRole('button'));
    expect(pushMock).toHaveBeenCalledWith('/');
  });
});
