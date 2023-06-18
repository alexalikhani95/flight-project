'use client';

import { useContext, useState } from 'react';
import { UserContext, UserContextType } from './context/UserContext';
import { useRouter } from 'next/navigation';
import Airports from './airports/page';
import Flights from './flights/page';
import DelayedFlights from './delayedFlights/page';

export default function Home() {
  const router = useRouter();
  const [signIn, setSignIn] = useState(true);
  const { user, signInAsGuest } = useContext(UserContext) as UserContextType;

  const handleGuestSignIn = async () => {
    // await needed here to prevent flicker when signing in
    await signInAsGuest();
    router.push('/dashboard');
  };

  return (
    <div className="flex justify-evenly mt-10">
      <div>
        <Airports />
      </div>
      <div>
        <Flights />
      </div>
      <div>
        <DelayedFlights />
      </div>
    </div>
  );
}
