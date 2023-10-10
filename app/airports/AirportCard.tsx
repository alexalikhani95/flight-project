import { AirportData } from '@/types/types';
import RouteButton from '../components/RouteButton';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../firebase';

type Props = {
  airport: AirportData;
};

const addVisitedAirport = httpsCallable(functions, 'addVisitedAirport');


const AirportCard = ({ airport }: Props) => {
  return (
    <div className="flex align-center mt-10 shadow-lg max-w-full bg-white p-5">
      <div className="flex flex-col mr-5">
        <p className="font-bold mb-3">{airport.name}</p>
        <p className="mt-3">Country code: {airport.country_code}</p>
        <p className="mt-3">IATA Code: {airport.iata_code}</p>
        <p className="mt-3">ICAO Code: {airport.icao_code}</p>
        <p className="mt-3">Latitude: {airport.lat}</p>
        <p className="mt-3">Longitude: {airport.lng}</p>
      </div>

      <div className="max-w-[200px] flex flex-col justify-center">
        {airport.lat && airport.lng && (
          <RouteButton
            url={`/airports/map/?latitude=${airport.lat}&longitude=${airport.lng}`}
          >
            View airport location on map
          </RouteButton>
        )}

        {airport.iata_code && (
          <RouteButton url={`/flights/${airport.iata_code}`}>
            View airport flight schedule
          </RouteButton>
        )}
        <button
        className="px-5 py-2.5 font-medium bg-blue-500 hover:bg-blue-700 text-white rounded-lg text-sm mb-3 w-full"
         onClick={() => addVisitedAirport({text: airport.name})}>
          Add airport to visited list
          </button>
      </div>
    </div>
  );
};

export default AirportCard;
