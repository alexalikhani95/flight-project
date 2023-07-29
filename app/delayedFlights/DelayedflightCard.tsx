import { DelayedFlightsData } from '@/types/types';
import RouteButton from '../components/RouteButton';

type Props = {
  flight: DelayedFlightsData;
};

const DelayedFlightCard = ({ flight }: Props) => {
  return (
    <div className="flex align-center mt-10 shadow-lg max-w-full bg-white p-5">
      <div className="flex flex-col mr-5">
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

      <div className="w-[200px]flex flex-col justify-center">
        {flight.dep_iata && (
          <>
            <RouteButton
              airport={true}
              iataCode={flight.dep_iata}
              text="View Departure airport details"
            />
            <RouteButton
              schedule={true}
              iataCode={flight.dep_iata}
              text="View Departure aiport flight schedule"
            />
          </>
        )}

        {flight.arr_iata && (
          <>
            <RouteButton
              airport={true}
              iataCode={flight.arr_iata}
              text="View Arrival aiport details"
            />

            <RouteButton
              schedule={true}
              iataCode={flight.arr_iata}
              text="View Arrival aiport flight schedule"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DelayedFlightCard;
