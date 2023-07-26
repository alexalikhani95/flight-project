'use client';
import { FlightData } from '@/types/types';
import { UserContext, UserContextType } from '../context/UserContext';
import { useContext } from 'react';
import RouteButton from '../components/RouteButton';

type Props = {
  flight: FlightData;
};

const FlightCard = ({ flight }: Props) => {
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <div className="flex align-center mt-10 shadow-lg max-w-full bg-white p-5">
      <div className="flex flex-col mr-5">
        <p className="font-bold mb-3">Flight number: {flight.flight_number}</p>
        <p className="mt-3">Status: {flight.status}</p>
        <p className="mt-3">
          Aircraft Registration Number: {flight.reg_number}
        </p>

        <p className="mt-3">Latitude: {flight.lat}</p>
        <p className="mt-3">Longitude: {flight.lng}</p>

        <p className="mt-3">Speed: {flight.speed} kmph</p>
        <p className="mt-3">Elevation: {flight.alt} meters</p>
        <p className="mt-3">Departure Airport IATA code: {flight.dep_iata}</p>
        <p className="mt-3">Departure Airport ICAO code: {flight.dep_icao}</p>

        <p className="mt-3">Arrival Airport IATA code: {flight.arr_iata}</p>
        <p className="mt-3">Arrival Airport ICAO code: {flight.arr_icao}</p>
      </div>

      <div className="w-[200px] flex flex-col justify-center">
        {flight.lat && flight.lng && user && (
          <RouteButton
            location="flight"
            latitude={flight.lat}
            longitude={flight.lng}
            text="View flight location on map"
          />
        )}

        {user && (
          <>
            {flight.dep_iata && (
              <>
                <RouteButton
                  airport={true}
                  iataCode={flight.dep_iata}
                  text="View Departure aiport details"
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
                  text="View Arrival aiport flight details"
                />

                <RouteButton
                  schedule={true}
                  iataCode={flight.arr_iata}
                  text="View Arrival aiport flight schedule"
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default FlightCard;
