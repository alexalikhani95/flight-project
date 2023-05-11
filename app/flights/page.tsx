'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../../mocks/server';
import { FlightData } from '@/types/types';

const Flights: React.FC = () => {
  server.listen();

  const [flights, setFlights] = useState<FlightData[]>([]);

  useEffect(() => {
    const fetchFlights = async () => {
      const response = await axios.get(
        `https://airlabs.co/api/v9/flights?api_key=${process.env.AIRLABS_API_KEY}`
      );
      setFlights(response.data);
    };
    fetchFlights();
  }, []);

  return (
    <div className="flex flex-col text-blue-950 items-center">
      <h1 className="text-3xl font-bold">Real time Flights</h1>
      {!flights && <p>No flights found, please try again.</p>}
      {flights &&
        flights.slice(0, 10).map((flight, index) => (
          <div
            key={index}
            className="flex flex-col align-center mt-10 shadow-lg w-[300px] max-w-full bg-white p-5"
          >
            <p className="font-bold">Flight number: {flight.flight_number}</p>
          </div>
        ))}
    </div>
  );
};

export default Flights;
