// import { useRouter } from 'next/navigation';
'use client';

import { scheduleData } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ScheduleCard from '../ScheduleCard';

type Props = {
  params: {
    slug: string;
  };
};

const fetchSchedule = async (slug: string) => {
  const { data } = await axios.get(`/api/schedule?iata_code=${slug}`);

  return data;
};

const Airport = ({ params }: Props) => {
  const {
    data: schedule,
    isLoading,
    isError,
  } = useQuery(['schedule'], () => fetchSchedule(params.slug));

  isLoading && <p>Loading airport...</p>;

  return (
    <div className="flex flex-col text-blue-950 items-center">
      {schedule &&
        schedule.data.map((schedule: scheduleData, index: number) => (
          <ScheduleCard schedule={schedule} key={index} />
        ))}
    </div>
  );
};

export default Airport;
