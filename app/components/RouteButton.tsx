'use client';

// SingleButton.tsx

import { useRouter } from 'next/navigation';

type Props = {
  type: 'airport' | 'location' | 'schedule'; // Add more types as needed
  iataCode?: string;
  latitude?: number;
  longitude?: number;
  text: string;
};

const RouteButton = ({ type, iataCode, latitude, longitude, text }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    if (type === 'airport') {
      router.push(`/airports/${iataCode}`);
    }
    if (type === 'location') {
      router.push(`/map/latitude=${latitude}&longitude=${longitude}`);
    }
    if (type === 'schedule') {
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
