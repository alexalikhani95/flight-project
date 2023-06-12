'use client';
import { DelayedFlightsData } from '@/types/types';

type Props = {
  flight: DelayedFlightsData;
};

const DelayedFlightCard = ({ flight }: Props) => {
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
    </div>
  );
};

export default DelayedFlightCard;
