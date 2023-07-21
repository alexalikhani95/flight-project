'use client';
import { AirportData } from '@/types/types';
import { ViewLocationButton } from '../components/ViewLocationButton';
import { ViewScheduleButton } from '../components/ViewScheduleButton';

type Props = {
  airport: AirportData;
};

const AirportCard = ({ airport }: Props) => {
  return (
    <div className="flex flex-col align-center mt-10 shadow-lg w-[300px] max-w-full bg-white p-5">
      <p className="font-bold mb-3">{airport.name}</p>
      <p className="mt-3">Country code: {airport.country_code}</p>
      <p className="mt-3">IATA Code: {airport.iata_code}</p>
      <p className="mt-3">ICAO Code: {airport.icao_code}</p>
      <p className="mt-3">Latitude: {airport.lat}</p>
      <p className="mt-3">Longitude: {airport.lng}</p>

      {airport.lat && airport.lng && (
        <ViewLocationButton latitude={airport.lat} longitude={airport.lng} />
      )}

      {airport.iata_code && (
        <ViewScheduleButton
          iataCode={airport.iata_code}
          text="View aiport flight schedule"
        />
      )}
    </div>
  );
};

export default AirportCard;
