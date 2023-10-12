'use client';
import Link from 'next/link';

import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';
import {db} from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

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

  const getUser = useCallback(async () => {
    const docRef = doc(db, "users", user?.uid as string);
    const docSnap = await getDoc(docRef);

    setUserData(docSnap.data() as User);

  },[user?.uid])
  
  useEffect(() => {
    getUser()
  },[getUser])
  
  return (
    <div className="flex items-center flex-col">
      <h2 className='text-3xl font-bold"'>Welcome {user?.displayName}</h2>
      {userData && userData.age && <h3>Age: {userData.age}</h3>}
      {userData && userData.location && <h3>Location: {userData.location}</h3>}
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
      <Link href="/visitedAirports">
        <button className="m-5 bg-white p-5 border-2 border-blue-950 w-[200px]">
          My Visited Airports
        </button>
      </Link>
      </div>
    </div>
  );
};

export default Dashboard;
