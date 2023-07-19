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
  const {
    data: airport,
    isLoading,
    isError,
  } = useQuery(['airports'], () => fetchAirport(params.slug));

  isLoading && <p>Loading airport...</p>;
  {
    isError && <p>Error, please try again later</p>;
  }

  return (
    <div className="flex flex-col text-blue-950 items-center">
      {airport && (
        <>
          <AirportCard airport={airport} />
        </>
      )}
    </div>
  );
};

export default Airport;
