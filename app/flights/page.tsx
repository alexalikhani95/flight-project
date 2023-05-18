'use client';

import React from 'react';
import axios from 'axios';
import { FlightData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

const Flights: React.FC = () => {
  const fetchFlights = async () => {
    const response = await axios.get('http://localhost:3000/api/flights');
    return response.data;
  };

  const {
    data: flights,
    isLoading,
    isError,
  } = useQuery(['flights'], fetchFlights);

  return (
    <div className="flex flex-col text-blue-950 items-center">
      <h1 className="text-3xl font-bold">Flights</h1>
      {isLoading && <p>Loading flights...</p>}
      {!isLoading && flights && flights.length === 0 && (
        <p>No flights found, please try again.</p>
      )}
      {isError && <p>Error, please try again later</p>}
      {!isLoading &&
        flights &&
        flights.map((flight: FlightData, index: number) => (
          <div
            key={index}
            className="flex flex-col align-center mt-10 shadow-lg w-[300px] max-w-full bg-white p-5"
          >
            <p className="font-bold">{flight.flight_number}</p>
          </div>
        ))}
    </div>
  );
};

export default Flights;
