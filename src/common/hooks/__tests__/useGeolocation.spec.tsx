import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { useGeolocation } from '../useGeolocation';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import geoReducer from '@/store/geoSlice';

const createWrapper = (
  preloadedState: { geo: { coords: { lat: number; lon: number } | null } } = {
    geo: { coords: null },
  },
) => {
  const store = configureStore({
    reducer: { geo: geoReducer },
    preloadedState,
  });

  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return Wrapper;
};

describe('useGeolocation hook', () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
  };

  beforeAll(() => {
    // @ts-expect-error navigator is mocked
    global.navigator.geolocation = mockGeolocation;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initially sets isLoading to true when coords not in store', () => {
    const { result } = renderHook(() => useGeolocation(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.coords).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('uses existing coords from store and sets isLoading false', () => {
    const { result } = renderHook(() => useGeolocation(), {
      wrapper: createWrapper({ geo: { coords: { lat: 1, lon: 2 } } }),
    });

    expect(result.current.coords).toEqual({ lat: 1, lon: 2 });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets coords when geolocation succeeds', async () => {
    const fakePosition = { coords: { latitude: 10, longitude: 20 } };
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success(fakePosition),
    );

    const { result } = renderHook(() => useGeolocation(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.coords).toEqual({ lat: 10, lon: 20 });
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('sets error when geolocation fails', async () => {
    const fakeError = { message: 'User denied geolocation' };
    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (_, errorCallback) => errorCallback(fakeError),
    );

    const { result } = renderHook(() => useGeolocation(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.coords).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('User denied geolocation');
    });
  });

  it('handles unsupported geolocation', async () => {
    // @ts-expect-error navigator is mocked
    global.navigator.geolocation = undefined;

    const { result } = renderHook(() => useGeolocation(), {
      wrapper: createWrapper(),
    });

    expect(result.current.coords).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(
      'Geolocation is not supported by your browser.',
    );

    // восстанавливаем
    // @ts-expect-error navigator is mocked
    global.navigator.geolocation = mockGeolocation;
  });
});
