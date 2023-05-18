'use client';

import React from 'react';
import axios from 'axios';
import { DelayedFlightsData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

const DelayedFlights: React.FC = () => {
  const fetchDelayedFlights = async () => {
    const response = await axios.get('http://localhost:3000/api/delays');
    return response.data;
  };

  const {
    data: delayedFlights,
    isLoading,
    isError,
  } = useQuery(['delayedFlights'], fetchDelayedFlights);

  return (
    <div className="flex flex-col text-blue-950 items-center">
      <h1 className="text-3xl font-bold">Delayed Flights</h1>
      {isLoading && <p>Loading flights...</p>}
      {!isLoading && delayedFlights && delayedFlights.length === 0 && (
        <p>No delayed flights found, please try again.</p>
      )}
      {isError && <p>Error, please try again later</p>}
      {!isLoading &&
        delayedFlights &&
        delayedFlights.map((flight: DelayedFlightsData, index: number) => (
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

export default DelayedFlights;
