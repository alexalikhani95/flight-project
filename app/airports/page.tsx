'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../../mocks/server';

export type AirportData = {
  countryCode: string;
  iataCode: string;
  icaoCode: string;
  lat: number;
  lng: number;
  name: string;
};

const Airports: React.FC = () => {
  server.listen();

  const [airports, setAirports] = useState<AirportData[]>([]);

  useEffect(() => {
    const fetchAirports = async () => {
      const response = await axios.get(
        `https://airlabs.co/api/v9/airports?api_key=${process.env.AIRLABS_API_KEY}`
      );
      setAirports(response.data);
    };
    fetchAirports();
  }, []);

  return (
    <div className="flex flex-col text-blue-950 items-center">
      <h1 className="text-3xl font-bold">Airports</h1>
      {!airports && <p>No airports found, please try again.</p>}
      {airports &&
        airports.map((airport, index) => (
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
