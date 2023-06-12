'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { AirportData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';

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

  const [searchInput, setSearchInput] = useState('');

  const [filteredAirports, setFilteredAirports] = useState<AirportData[]>([]);

  const [finishedSearch, setFinishedSearch] = useState(false);

  const delayedSearch = debounce((search: string) => {
    if (airports) {
      const filtered = airports.filter((airport) =>
        airport.name?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredAirports(filtered);
      setFinishedSearch(true);
    }
  }, 1000); // Delayed debounce for 1 second

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchInput(search);
    delayedSearch.cancel(); // Cancel any existing debounce timers when the search input changes.
    delayedSearch(search); // Call the delayed search function
  };

  return (
    <div className="flex flex-col text-blue-950 items-center">
      <h1 className="text-3xl font-bold">Airports</h1>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => handleSearchChange(e)}
        placeholder="Search airports"
        className="mt-4 p-2 border border-gray-300 rounded"
      />
      {isLoading && <p>Loading airports...</p>}
      {airports?.length === 0 && <p>No airports found, please try again.</p>}
      {isError && <p>Error, please try again later</p>}
      {filteredAirports.length < 1 && searchInput !== '' && finishedSearch && (
        <p className="mt-2 text-red-500">
          No airports found matching the search criteria.
        </p>
      )}
      {filteredAirports.length > 0 &&
        filteredAirports?.map((airport, index) => (
          <div
            key={index}
            className="flex flex-col align-center mt-10 shadow-lg w-[300px] max-w-full bg-white p-5"
          >
            <p className="font-bold">{airport.name}</p>
          </div>
        ))}
      {filteredAirports.length < 1 &&
        searchInput === '' &&
        airports &&
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
