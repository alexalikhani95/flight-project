'use client';
import { useRouter } from 'next/navigation';

type Props = {
  latitude: number;
  longitude: number;
};

export const ViewLocationButton = ({ latitude, longitude }: Props) => {
  const router = useRouter();

  const handleViewOnMap = () => {
    const mapUrl = `/map/latitude=${latitude}&longitude=${longitude}`;

    // Navigate to the Map page with the latitude and longitude as query parameters
    router.push(mapUrl);
  };

  return (
    <button
      className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg mb-3 text-sm w-full"
      onClick={handleViewOnMap}
    >
      View Location on map
    </button>
  );
};
