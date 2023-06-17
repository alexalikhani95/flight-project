'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { FlightData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import FlightCard from './FlightCard';

const Flights: React.FC = () => {
  const fetchFlights = async () => {
    const { data } = await axios.get<FlightData[]>('/api/flights');
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

  const delayedSearch = debounce((search: string) => {
    if (flights) {
      const filtered = flights.filter((flight) =>
        flight.flight_number?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredFlights(filtered);
      setFinishedSearch(true);
    }
  }, 1000);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchInput(search);
    delayedSearch.cancel();
    delayedSearch(search);
  };

  return (
    <div className="flex flex-col text-blue-950 items-center">
      <h1 className="text-3xl font-bold">Flights</h1>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search flights by number"
        className="mt-4 p-2 border border-gray-300 rounded"
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
        flights.map((flight, index) => (
          <FlightCard flight={flight} key={index} />
        ))}
    </div>
  );
};

export default Flights;
