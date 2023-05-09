'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../../mocks/server';

export type FlightData = {
  aircraft_icao?: string; //
  aircraft_iata?: string;
  airline_icao?: string;
  alt?: number;
  arr_iata?: string;
  arr_icao?: string;
  dep_iata?: string;
  dep_icao?: string;
  dir?: number;
  flag?: string;
  flight_iata?: string;
  flight_icao?: string;
  flight_number?: string;
  hex?: string;
  lat?: number;
  lng?: number;
  reg_number?: string;
  speed?: number;
  squawk?: string;
  status?: string;
  updated?: number;
  v_speed?: number;
};

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
