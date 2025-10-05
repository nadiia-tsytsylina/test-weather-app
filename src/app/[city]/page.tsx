'use client';
import { useSearchParams } from 'next/navigation';
import { CityDetails } from '@/components/CityDetails';

export default function City() {
  const searchParams = useSearchParams();
  const lat = Number(searchParams.get('lat'));
  const lon = Number(searchParams.get('lon'));

  return <CityDetails lat={lat} lon={lon} />;
}
