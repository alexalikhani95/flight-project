'use client';
import { DelayedFlightsData } from '@/types/types';
import { useContext } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';
import { useRouter } from 'next/navigation';

type Props = {
  flight: DelayedFlightsData;
};

const DelayedFlightCard = ({ flight }: Props) => {
  const { user } = useContext(UserContext) as UserContextType;
  const router = useRouter();

  return (
    <div className="flex flex-col align-center mt-10 shadow-lg w-[300px] max-w-full bg-white p-5">
      <p className="font-bold mb-3">Flight number: {flight.flight_number}</p>
      <p className="mb-3">Status: {flight.status}</p>
      <p className="mb-3">Departure Airport ICAO code: {flight.dep_icao}</p>
      <p className="mb-3">Arrival Airport ICAO code: {flight.arr_icao}</p>
      <p className="mb-3">
        Estimated local departure date/time : {flight.dep_time}
      </p>
      <p className="mb-3">
        Estimated flight duration: {flight.duration} minutes
      </p>
      {user && (
        <>
          <button
            className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mb-3"
            onClick={() => router.push(`/airports/${flight.dep_iata}`)}
          >
            View Departure aiport details
          </button>
          <button
            className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mb-3"
            onClick={() => router.push(`/flights/${flight.dep_iata}`)}
          >
            View Departure aiport flight schedule
          </button>
          <button
            className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mb-3"
            onClick={() => router.push(`/airports/${flight.arr_iata}`)}
          >
            View Arrival aiport details
          </button>

          <button
            className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
            onClick={() => router.push(`/flights/${flight.arr_iata}`)}
          >
            View Arrival aiport flight schedule
          </button>
        </>
      )}
    </div>
  );
};

export default DelayedFlightCard;
