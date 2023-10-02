'use client';
import Link from 'next/link';

import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';
import {db} from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

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
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const usersArray: userType[] = usersSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() } as userType));
  
    const userData = usersArray.filter(filteredUser => filteredUser.email === user?.email);
    setUserInfo(userData.length > 0 ? userData[0] : null);

  }, [user?.email]);
  

  useEffect(() => {
    getUserInfo()
  },[getUserInfo])

  console.log(userInfo)
  
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
