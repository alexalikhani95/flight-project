// import { useRouter } from 'next/navigation';
'use client';

import { AirportData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AirportCard from '../AirportCard';

type Props = {
  params: {
    slug: string;
  };
};

const fetchAirport = async (slug: string) => {
  const { data } = await axios.get<AirportData>(
    `/api/airport?iata_code=${slug}`
  );

  return data;
};

const Airport = ({ params }: Props) => {
  console.log('params', params);

  const {
    data: airport,
    isLoading,
    isError,
  } = useQuery(['airports'], () => fetchAirport(params.slug));

  console.log(airport);

  isLoading && <p>Loading airport...</p>;

  return (
    <div>
      {airport && (
        <>
          <AirportCard airport={airport} />
        </>
      )}
    </div>
  );
};

export default Airport;
