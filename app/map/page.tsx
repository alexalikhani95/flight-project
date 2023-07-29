'use client';

import Map from '@/app/components/map';
import { useSearchParams } from 'next/navigation';

const MapPage = () => {
  const searchParams = useSearchParams();
  const latitude = parseFloat(searchParams.get('latitude') || '0');
  const longitude = parseFloat(searchParams.get('longitude') || '0');
  const location = searchParams.get('location');

  return (
    <div>
      {latitude && longitude && location && (
        <Map latitude={latitude} longitude={longitude} location={location} />
      )}
    </div>
  );
};

export default MapPage;
