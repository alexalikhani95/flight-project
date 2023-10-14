'use client';
import Link from 'next/link';

import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';
import {db} from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import LoadingSpinner from '../components/LoadingSpinner';

type User = {
  email: string;
  id?: string;
  age?: string;
  location?: string;
  visitedAirports?: string[];
}

const Dashboard = () => {
  const { user } = useContext(UserContext) as UserContextType;

  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setisLoading] = useState(true);

  const getUser = useCallback(async () => {
    const docRef = doc(db, "users", user?.uid as string);
    const docSnap = await getDoc(docRef);

    setUserData(docSnap.data() as User);
    setisLoading(false)
  },[user?.uid])
  
  useEffect(() => {
    getUser()
  },[getUser])

 
  return (
    <div className="flex items-center flex-col">
      <h2 className='text-3xl font-bold"'>Welcome {user?.displayName}</h2>
      {!user?.isAnonymous &&
      <div className='h-[50px] mt-5 mb-5'>
        {!isLoading && 
        <>
      <div className='flex'><p className='font-bold mr-2'>Age:</p><p>{userData && userData.age ? userData.age : 'Go to settings to add age'}</p></div>
      <div className='flex'><p className='font-bold mr-2'>Location:</p><p>{userData && userData.location ? userData.location : 'Go to settings to add location'}</p></div>
      </>
        }
      {isLoading && <p>Loading age and location...</p>}
      </div>
}
    <div className='flex flex-wrap justify-evenly max-w-[900px]'>
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
      {!user?.isAnonymous &&
      <Link href="/visitedAirports">
        <button className="m-5 bg-white p-5 border-2 border-blue-950 w-[200px]">
          My Visited Airports
        </button>
      </Link>
      }
      </div>
    </div>
  );
};

export default Dashboard;
