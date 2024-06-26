'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { DelayedFlightsData } from '@/types/types';
import { useDebounce } from 'use-debounce';
import DelayedFlightCard from './DelayedflightCard';

const DelayedFlights = () => {
  const fetchDelayedFlights = async () => {
    const { data } = await axios.get<{ data: DelayedFlightsData[] }>(
      '/api/delays'
    );
    return data;
  };

  const {
    data: delayedFlights,
    isLoading,
    isError,
  } = useQuery(['delayedFlights'], fetchDelayedFlights);

  const [searchInput, setSearchInput] = useState('');

  const [filteredFlights, setFilteredFlights] = useState<DelayedFlightsData[]>(
    []
  );

  const [finishedSearch, setFinishedSearch] = useState(false);

  const [debouncedSearchInput] = useDebounce(searchInput, 1000);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchInput(search);
  };

  useEffect(() => {
    if (delayedFlights) {
      const filtered = delayedFlights.data.filter((flight) =>
        flight.flight_number
          ?.toLowerCase()
          .includes(debouncedSearchInput.toLowerCase())
      );
      setFilteredFlights(filtered);
      setFinishedSearch(true);
    }
  }, [debouncedSearchInput, delayedFlights]);

  return (
    <div className="flex flex-col text-blue-950 items-center">
      <h1 className="text-3xl font-bold">Delayed Flights</h1>
      <input
        type="text"
        value={searchInput}
        onChange={handleSearchChange}
        placeholder="Search delayed flights by number"
        className="mt-4 p-2 border border-gray-300 rounded min-w-[300px]"
      />
      {isLoading && <p>Loading flights...</p>}
      {delayedFlights?.data.length === 0 && (
        <p>No delayed flights found, please try again.</p>
      )}
      {isError && <p>Error, please try again later</p>}
      {filteredFlights.length < 1 && searchInput !== '' && finishedSearch && (
        <p className="mt-2 text-red-500">
          No delayed flights found matching the search criteria.
        </p>
      )}
      {filteredFlights.length > 0 &&
        filteredFlights?.map((flight, index) => (
          <DelayedFlightCard flight={flight} key={index} />
        ))}
      {filteredFlights.length < 1 &&
        searchInput === '' &&
        delayedFlights &&
        delayedFlights.data.map((flight: DelayedFlightsData, index: number) => (
          <DelayedFlightCard flight={flight} key={index} />
        ))}
    </div>
  );
};

export default DelayedFlights;
