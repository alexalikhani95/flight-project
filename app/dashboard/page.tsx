'use client';
import Link from 'next/link';

import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';
import {db} from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

type userType = {
  email: string;
  id?: string;
  age?: string;
  location?: string;
}

const Dashboard = () => {
  const { user } = useContext(UserContext) as UserContextType;

  const [userInfo, setUserInfo] = useState<userType | null>(null);

  
  
  const getUserInfo = useCallback(async () => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", user?.email));

    const querySnapshot = await getDocs(q);

    const usersArray: userType[] = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as userType));
      
      setUserInfo(usersArray.length > 0 ? usersArray[0] : null);

  }, [user?.email])
  

  useEffect(() => {
    getUserInfo()
  },[getUserInfo])
  
  return (
    <div className="flex items-center flex-col">
      <h2 className='text-3xl font-bold"'>Welcome {user?.displayName}</h2>
      {userInfo && userInfo.age && <h3>Age: {userInfo.age}</h3>}
      {userInfo && userInfo.location && <h3>Location: {userInfo.location}</h3>}
      <Link href="/airports">
        <button className="mt-10 bg-white p-5 border-2 border-blue-950">
          Airports
        </button>
      </Link>
      <Link href="/flights">
        <button className="mt-10 bg-white p-5 border-2 border-blue-950">
          All Flights
        </button>
      </Link>
      <Link href="/delayedFlights">
        <button className="mt-10 bg-white p-5 border-2 border-blue-950">
          Delayed Flights
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
