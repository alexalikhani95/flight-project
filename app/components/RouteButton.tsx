'use client';

import { useRouter } from 'next/navigation';
import { stringify } from 'querystring';

type Props = {
  airport?: boolean;
  schedule?: boolean;
  location?: 'airport' | 'flight';
  iataCode?: string;
  latitude?: number;
  longitude?: number;
  text: string;
};

const RouteButton = ({
  airport,
  location,
  iataCode,
  latitude,
  longitude,
  text,
  schedule,
}: Props) => {
  const router = useRouter();

  const queryParams = stringify({ location, latitude, longitude });

  const handleClick = () => {
    if (airport) {
      router.push(`/airports/${iataCode}`);
    }
    if (location === 'airport') {
      router.push(`/map?${queryParams}`);
    }
    if (location === 'flight') {
      router.push(`/map?${queryParams}`);
    }
    if (schedule) {
      router.push(`/flights/${iataCode}`);
    }
  };

  return (
    <button
      className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mb-3 w-full"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default RouteButton;
