import { renderHook, act } from '@testing-library/react';
import { useGeolocation } from '../useGeolocation';

describe('useGeolocation hook', () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn(),
  };

  beforeAll(() => {
    // @ts-expect-error navigator is mocked for test
    global.navigator.geolocation = mockGeolocation;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initially sets isLoading to true', () => {
    const { result } = renderHook(() => useGeolocation());
    expect(result.current.isLoading).toBe(true);
    expect(result.current.coords).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('sets coords when geolocation succeeds', async () => {
    const fakePosition = { coords: { latitude: 10, longitude: 20 } };
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) =>
      success(fakePosition),
    );

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {});

    expect(result.current.coords).toEqual({ lat: 10, lon: 20 });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets error when geolocation fails', async () => {
    const fakeError = { message: 'User denied geolocation' };
    mockGeolocation.getCurrentPosition.mockImplementationOnce(
      (_, errorCallback) => errorCallback(fakeError),
    );

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {});

    expect(result.current.coords).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('User denied geolocation');
  });

  it('handles unsupported geolocation', async () => {
    // @ts-expect-error navigator is mocked for test
    global.navigator.geolocation = undefined;

    const { result } = renderHook(() => useGeolocation());

    await act(async () => {});

    expect(result.current.coords).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(
      'Geolocation is not supported by your browser.',
    );

    // @ts-expect-error navigator is mocked for test
    global.navigator.geolocation = mockGeolocation;
  });
});
