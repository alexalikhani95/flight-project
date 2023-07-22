'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FlightData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import FlightCard from './FlightCard';

const Flights = () => {
  const fetchFlights = async () => {
    const { data } = await axios.get('/api/flights');
    return data;
  };

  const {
    data: flights,
    isLoading,
    isError,
  } = useQuery(['flights'], fetchFlights);

  const [searchInput, setSearchInput] = useState('');

  const [filteredFlights, setFilteredFlights] = useState<FlightData[]>([]);

  const [finishedSearch, setFinishedSearch] = useState(false);

  const [debouncedSearchInput] = useDebounce(searchInput, 1000);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchInput(search);
  };

  useEffect(() => {
    if (flights) {
      const filtered = flights.data.filter((flight: FlightData) =>
        flight.flight_number
          ?.toLowerCase()
          .includes(debouncedSearchInput.toLowerCase())
      );
      setFilteredFlights(filtered);
      setFinishedSearch(true);
    }
  }, [debouncedSearchInput, flights]);

  return (
    <div className="flex flex-col text-blue-950 items-center">
      <h1 className="text-3xl font-bold">Flights</h1>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search flights by number"
        className="mt-4 p-2 border border-gray-300 rounded min-w-[300px]"
      />
      {isLoading && <p>Loading flights...</p>}
      {flights?.length === 0 && <p>No flights found, please try again.</p>}
      {isError && <p>Error, please try again later</p>}
      {filteredFlights.length < 1 && searchInput !== '' && finishedSearch && (
        <p className="mt-2 text-red-500">
          No flights found matching the search criteria.
        </p>
      )}
      {filteredFlights.length > 0 &&
        filteredFlights?.map((flight, index) => (
          <FlightCard flight={flight} key={index} />
        ))}
      {filteredFlights.length < 1 &&
        searchInput === '' &&
        flights &&
        flights.data.map((flight: FlightData, index: number) => (
          <FlightCard flight={flight} key={index} />
        ))}
    </div>
  );
};

export default Flights;
