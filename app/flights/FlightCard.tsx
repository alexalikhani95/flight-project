'use client';
import { FlightData } from '@/types/types';
import { useRouter } from 'next/navigation';

type Props = {
  flight: FlightData;
};

const FlightCard = ({ flight }: Props) => {
  const router = useRouter();

  return (
    <div className="flex flex-col align-center mt-10 shadow-lg w-[300px] max-w-full bg-white p-5">
      <p className="font-bold mb-3">Flight number: {flight.flight_number}</p>
      <p className="mt-3">Status: {flight.status}</p>
      <p className="mt-3">Aircraft Registration Number: {flight.reg_number}</p>
      <p className="mt-3">Latitude: {flight.lat}</p>
      <p className="mt-3">Longitude: {flight.lng}</p>
      <p className="mt-3">Speed: {flight.speed} kmph</p>
      <p className="mt-3">Elevation: {flight.alt} meters</p>
      <p className="mt-3">Departure Airport IATA code: {flight.dep_iata}</p>
      <button
        className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
        onClick={() => router.push(`/airports/${flight.dep_iata}`)}
      >
        View Departure aiport details
      </button>
      <p className="mt-3">Arrival Airport IATA code: {flight.arr_iata}</p>
      <button
        className="px-5 py-2.5 font-medium bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm"
        onClick={() => router.push(`/airports/${flight.arr_iata}`)}
      >
        View Arrival aiport details
      </button>
      <p className="mt-3">Departure Airport ICAO code: {flight.dep_icao}</p>
      <p className="mt-3">Arrival Airport ICAO code: {flight.arr_icao}</p>
    </div>
  );
};
export default FlightCard;
