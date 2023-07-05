// import { useRouter } from 'next/navigation';
'use client';

import { AirportData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';

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

  return (
    <div>
      <h1>Airport {params.slug}</h1>
      {/* <p>{params}</p> */}
    </div>
  );
};

export default Airport;
