'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../../mocks/server';

export type DelayedFlightsData = {
  country_code: string;
  iata_code: string;
  icao_code: string;
  arr_baggage: '5'; // Arrival baggage claim carousel number
  arr_delayed: number;
  arr_estimated: string; // Updated arrival time in the airport time zone.
  arr_estimated_ts: number; // Updated arrival UNIX timestamp.
  arr_estimated_utc: string; // Updated arrival time in UTC time zone
  arr_gate: string; // Estimated arrival gate
  arr_iata: string; //Arrival airport IATA code.
  arr_icao: string; // Arrival airport ICAO code.
  arr_terminal: string; // Estimated arrival terminal
  arr_time: string; //Arrival time in the airport time zone
  arr_time_ts: number; // Arrival time UNIX timestamp
  arr_time_utc: string; // Arrival time in UTC time zone
  cs_airline_iata: string; //
  cs_flight_iata: string;
  cs_flight_number: string;
  delayed: 250; // Estimated flight delay time (in minutes).
  dep_actual: string;
  dep_actual_ts: number;
  dep_actual_utc: string;
  dep_delayed: number;
  dep_estimated: string; // Updated departure time in the airport time zone.
  dep_estimated_ts: number; // Updated departure UNIX timestamp.
  dep_estimated_utc: string; // Updated departure time in UTC time zone.
  dep_gate: string; // Estimated departure gate.
  dep_iata: string; // Departure airport IATA code.
  dep_icao: string; // Departure airport ICAO code.
  dep_terminal: string; // Estimated departure terminal.
  dep_time: string; // Departure time in the airport time zone.
  dep_time_ts: number; // 	Departure UNIX timestamp.
  dep_time_utc: string; // Departure time in UTC time zone.
  duration: number; // 	Estimated flight time (in minutes).
  flight_iata: string; // Flight IATA code.
  flight_icao: string; // Flight ICAO code.
  flight_number: string; // Flight number.
  status: string; // Current flight status - scheduled, en-route, landed.
};

const DelayedFlights: React.FC = () => {
  server.listen();

  const [delayedFlights, setDelayedFlights] = useState<DelayedFlightsData[]>(
    []
  );

  useEffect(() => {
    const fetchAirports = async () => {
      const response = await axios.get(
        `https://airlabs.co/api/v9/delays?delay=60&type=departures&api_key=${process.env.AIRLABS_API_KEY}`
      );
      setDelayedFlights(response.data);
    };
    fetchAirports();
  }, []);

  return (
    <div className="flex flex-col text-blue-950 items-center">
      <h1 className="text-3xl font-bold">Delayed Flights</h1>
      {!delayedFlights && <p>No delayed flights found, please try again.</p>}
      {delayedFlights &&
        delayedFlights.map((flight, index) => (
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

export default DelayedFlights;
