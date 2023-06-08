'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { AirportData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchInput(search);
  };

  React.useEffect(() => {
    if (airports) {
      const filtered = airports.filter((airport) =>
        airport.name?.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredAirports(filtered);
    }
  }, [airports, searchInput]);

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
      {!isLoading && airports?.length === 0 && (
        <p>No airports found, please try again.</p>
      )}
      {isError && <p>Error, please try again later</p>}
      {filteredAirports.length < 1 && (
        <p className="mt-2 text-red-500">
          No airports found matching the search criteria.
        </p>
      )}
      {!isLoading &&
        filteredAirports?.map((airport, index) => (
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
