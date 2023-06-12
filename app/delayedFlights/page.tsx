'use client';

import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { DelayedFlightsData } from '@/types/types';
import DelayedFlightCard from './DelayedflightCard';

const DelayedFlights: React.FC = () => {
  const fetchDelayedFlights = async () => {
    const { data } = await axios.get<DelayedFlightsData[]>('/api/delays');
    return data;
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
          <DelayedFlightCard flight={flight} key={index} />
        ))}
    </div>
  );
};

export default DelayedFlights;
