'use client';

import React from 'react';
import axios from 'axios';
import { AirportData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

const fetchAirports = async () => {
  const { data } = await axios.get<AirportData[]>('/api/airports');
  return data;
};

const Airports: React.FC = () => {
  const {
    data: airports,
    isLoading,
    isError,
  } = useQuery(['airports'], fetchAirports);

  return (
    <div className="flex flex-col text-blue-950 items-center">
      <h1 className="text-3xl font-bold">Airports</h1>
      {isLoading && <p>Loading airports...</p>}
      {!isLoading && airports?.length === 0 && (
        <p>No airports found, please try again.</p>
      )}
      {isError && <p>Error, please try again later</p>}
      {!isLoading &&
        airports?.map((airport, index) => (
          <div
            key={index}
            className="flex flex-col align-center mt-10 shadow-lg w-[300px] max-w-full bg-white p-5"
          >
            <p className="font-bold">{airport.name}</p>
          </div>
        ))}
    </div>
  );
};

export default Airports;
