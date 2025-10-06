import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setCoords } from '@/store/geoSlice';

export const useGeolocation = () => {
  const dispatch = useDispatch();
  const savedCoords = useSelector((state: RootState) => state.geo.coords);

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!savedCoords);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        dispatch(setCoords(coords));
        setIsLoading(false);
      },
      (err) => {
        setError(err.message || 'Unable to retrieve your location.');
        setIsLoading(false);
      },
    );
  }, [dispatch]);

  useEffect(() => {
    if (!savedCoords) {
      requestLocation();
    } else {
      setIsLoading(false);
    }
  }, [savedCoords, requestLocation]);

  return { coords: savedCoords, error, isLoading };
};
