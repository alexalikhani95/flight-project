'use client';

import React from 'react';
import axios from 'axios';
import { AirportData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

const Airports: React.FC = () => {
  const fetchAirports = async () => {
    const response = await axios.get(
      `https://airlabs.co/api/v9/airports?api_key=${process.env.AIRLABS_API_KEY}`
    );
    return response.data;
  };

  const {
    data: airports,
    isLoading,
    isError,
  } = useQuery(['airports'], fetchAirports);

  return (
    <div className="flex flex-col text-blue-950 items-center">
      <h1 className="text-3xl font-bold">Airports</h1>
      {isLoading && <p>Loading airports...</p>}
      {!isLoading && airports && airports.length === 0 && (
        <p>No airports found, please try again.</p>
      )}
      {isError && <p>Error, please try again later</p>}
      {!isLoading &&
        airports &&
        airports.map((airport: AirportData, index: number) => (
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
