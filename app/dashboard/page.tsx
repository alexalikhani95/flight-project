'use client';
import Link from 'next/link';

import { useContext } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext) as UserContextType;
  
  return (
    <div className="flex items-center flex-col">
      <h2 className='text-3xl font-bold"'>Welcome {user?.displayName}</h2>

      <div className="h-[50px] mt-5 mb-5">
        {user?.email && (
          <>
            <div className="flex">
              <p className="font-bold mr-2">Age: </p>
              <p>{user?.age ? user.age : "Go to settings to add age"}</p>
            </div>
            <div className="flex">
              <p className="font-bold mr-2">Location: </p>
              <p>
                {user?.location
                  ? user.location
                  : "Go to settings to add location"}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-wrap justify-evenly max-w-[900px]">
        <Link href="/airports">
          <button className="m-5 bg-white p-5 border-2 border-blue-950 w-[200px]">
            Airports
          </button>
        </Link>
        <Link href="/flights">
          <button className="m-5 bg-white p-5 border-2 border-blue-950 w-[200px]">
            All Flights
          </button>
        </Link>
        <Link href="/delayedFlights">
          <button className="m-5 bg-white p-5 border-2 border-blue-950 w-[200px]">
            Delayed Flights
          </button>
        </Link>
        {user?.email && (
          <Link href="/visitedAirports">
            <button className="m-5 bg-white p-5 border-2 border-blue-950 w-[200px]">
              My Visited Airports
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
