'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { AirportData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import AirportCard from './AirportCard';
import Link from 'next/link';

const fetchAirports = async () => {
  const { data } = await axios.get('/api/airports');
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

  const [debouncedSearchInput] = useDebounce(searchInput, 1000);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchInput(search);
    setFinishedSearch(false);
  };

  useEffect(() => {
    if (airports) {
      const filtered = airports.data.filter((airport: AirportData) =>
        airport.name?.toLowerCase().includes(debouncedSearchInput.toLowerCase())
      );
      setFilteredAirports(filtered);
      setFinishedSearch(true);
    }
  }, [debouncedSearchInput, airports]);

  return (
    <div className="flex flex-col text-blue-950 items-center">
      <h1 className="text-3xl font-bold">Airports</h1>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => handleSearchChange(e)}
        placeholder="Search airports by name"
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
          <AirportCard airport={airport} key={index} />
        ))}
      {filteredAirports.length < 1 &&
        searchInput === '' &&
        airports &&
        airports.data.map((airport: AirportData, index: number) => (
          <AirportCard airport={airport} key={index} />
        ))}
    </div>
  );
};

export default Airports;
