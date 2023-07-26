'use client';

// SingleButton.tsx

import { useRouter } from 'next/navigation';

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
  //   type,
  airport,
  location,
  iataCode,
  latitude,
  longitude,
  text,
  schedule,
}: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (airport) {
      router.push(`/airports/${iataCode}`);
    }
    if (location === 'airport') {
      router.push(`/airports/map/latitude=${latitude}&longitude=${longitude}`);
    }
    if (location === 'flight') {
      router.push(`/flights/map/latitude=${latitude}&longitude=${longitude}`);
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
