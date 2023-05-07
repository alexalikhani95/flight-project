'use client';
import Link from 'next/link';

import { useContext } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext) as UserContextType;
  return (
    <div className="flex items-center flex-col">
      <h2 className='text-3xl font-bold"'>Welcome {user?.displayName}</h2>
      <Link href="/airports">
        <button className="mt-10 bg-white p-5 border-2 border-blue-950">
          Airports
        </button>
      </Link>
      <Link href="/flights">
        <button className="mt-10 bg-white p-5 border-2 border-blue-950">
          Flights
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
