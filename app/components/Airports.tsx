'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../../public/mockServiceWorker';

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
      const response = await axios.get('/api/v9/airports');
      setAirports(response.data);
    };
    fetchAirports();
  }, []);

  console.log('airports', airports);

  server.close();

  return (
    <div>
      {airports &&
        airports.slice(0, 10).map((airport, index) => (
          <div key={index} className="flex justify-center items-center">
            <p className="font-bold">{airport.name}</p>
          </div>
        ))}
    </div>
  );
};

export default Airports;
