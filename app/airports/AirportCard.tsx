'use client';
import { AirportData } from '@/types/types';

import { useRouter } from 'next/navigation';

type Props = {
  airport: AirportData;
};

const AirportCard = ({ airport }: Props) => {
  const router = useRouter();

  const handleViewOnMap = () => {
    const latitude = airport.lat;
    const longitude = airport.lng;
    const mapUrl = `/map/latitude=${latitude}&longitude=${longitude}`;

    // Navigate to the Map page with the latitude and longitude as query parameters
    router.push(mapUrl);
  };
  return (
    <div className="flex flex-col align-center mt-10 shadow-lg w-[300px] max-w-full bg-white p-5">
      <p className="font-bold mb-3">{airport.name}</p>
      <p className="mt-3">Country code: {airport.country_code}</p>
      <p className="mt-3">IATA Code: {airport.iata_code}</p>
      <p className="mt-3">ICAO Code: {airport.icao_code}</p>
      <p className="mt-3">Latitude: {airport.lat}</p>
      <p className="mt-3">Longitude: {airport.lng}</p>
      <button
        className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mt-5"
        onClick={handleViewOnMap}
      >
        View Location on map
      </button>
      <button
        className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mt-5"
        onClick={() => router.push(`/flights/${airport.iata_code}`)}
      >
        View aiport flight schedule
      </button>
    </div>
  );
};

export default AirportCard;
