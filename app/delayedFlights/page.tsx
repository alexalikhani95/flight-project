'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DelayedFlightsData } from '@/types/types';

const DelayedFlights: React.FC = () => {
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

  console.log(delayedFlights);

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
