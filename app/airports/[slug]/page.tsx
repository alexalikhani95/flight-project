// import { useRouter } from 'next/navigation';
'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

type Props = {
  params: {
    slug: string;
  };
};

const Airport = ({ params }: Props) => {
  console.log('params', params);

  const [airport, setAirport] = useState([]);

  const fetchAirport = async () => {
    const response = await axios.get(
      `https://airlabs.co/api/v9/airports?iata_code=${params.slug}&api_key=c0756ec2-5735-4a75-90e8-fa17e281ad48`
    );
    setAirport(response.data);
  };

  console.log(airport);

  useEffect(() => {
    fetchAirport();
  });

  return (
    <div>
      <h1>Airport {params.slug}</h1>
      {/* <p>{params}</p> */}
    </div>
  );
};

export default Airport;
