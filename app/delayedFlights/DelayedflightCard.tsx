'use client';
import { DelayedFlightsData } from '@/types/types';
import { useContext } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';
import { ViewScheduleButton } from '../components/ViewScheduleButton';
import { ViewAirportDetailsButton } from '../components/ViewAirportDetailsButton';

type Props = {
  flight: DelayedFlightsData;
};

const DelayedFlightCard = ({ flight }: Props) => {
  const { user } = useContext(UserContext) as UserContextType;

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
          {flight.dep_iata && (
            <>
              <ViewAirportDetailsButton
                iataCode={flight.dep_iata}
                text="View Departure airport details"
              />
              <ViewScheduleButton
                iataCode={flight.dep_iata}
                text="View Departure aiport flight schedule"
              />
            </>
          )}

          {flight.arr_iata && (
            <>
              <ViewAirportDetailsButton
                iataCode={flight.arr_iata}
                text="View Arrival aiport details"
              />
              <ViewScheduleButton
                iataCode={flight.arr_iata}
                text="View Arrival aiport flight schedule"
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default DelayedFlightCard;
