'use client';
import { FlightData } from '@/types/types';

type Props = {
  flight: FlightData;
};

const FlightCard = ({ flight }: Props) => {
  return (
    <div className="flex flex-col align-center mt-10 shadow-lg w-[300px] max-w-full bg-white p-5">
      <p className="font-bold mb-3">Flight number: {flight.flight_number}</p>
      <p className="mt-3">Status: {flight.status}</p>
      <p className="mt-3">Aircraft Registration Number: {flight.reg_number}</p>
      <p className="mt-3">Latitude: {flight.lat}</p>
      <p className="mt-3">Longitude: {flight.lng}</p>
      <p className="mt-3">Speed: {flight.speed} kmph</p>
      <p className="mt-3">Elevation: {flight.alt} meters</p>
      <p className="mt-3">Departure Airport ICAO code: {flight.dep_icao}</p>
      <p className="mt-3">Arrival Airport ICAO code: {flight.arr_icao}</p>
    </div>
  );
};

export default FlightCard;
