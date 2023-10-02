'use client';
import Link from 'next/link';

import { useCallback, useContext, useEffect, useState } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';
import {db} from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const { user } = useContext(UserContext) as UserContextType;

  const [userAge, setUserAge] = useState<any>([])
  const [userLocation, setUserLocation] = useState<any>([])

  const getLocation = useCallback(async () => {
    // get the location needed on the backend
    const locationsSnapshot = await getDocs(collection(db, 'locations'));
    const locationsArray = locationsSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))

    const usersLocation = locationsArray.filter((location: any) => location.email === user?.email)


    setUserLocation(usersLocation[0])
  },[user?.email])

  const getAge = useCallback(async() => {
    const agesSnapshot = await getDocs(collection(db, 'ages'));
    const agesArray = agesSnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))

    const usersAge = agesArray.filter((age: any) => age.email === user?.email)

    setUserAge(usersAge[0])
  }, [user?.email])

  useEffect(() => {
    getAge()
    getLocation()
    console.log(getLocation())
  },[getAge, getLocation])
  
  return (
    <div className="flex items-center flex-col">
      <h2 className='text-3xl font-bold"'>Welcome {user?.displayName}</h2>
      {userAge && userAge.age && <h3>Age: {userAge.age}</h3> }
      {userLocation && userLocation.location && <h3>Location: {userLocation?.location}</h3> }
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
