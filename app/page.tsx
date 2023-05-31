'use client';

import AuthForm from './components/AuthForm';
import { useContext, useState } from 'react';
import { UserContext, UserContextType } from './context/UserContext';
import { useRouter } from 'next/navigation';

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
    <div className="flex w-full bg-gray-100 h-screen items-center flex-col">
      <h1 className="text-3xl font-bold">Home</h1>
      {!user && (
        <>
          <div className="flex items-center justify-center mt-10">
            <p>
              {signIn ? 'Dont have an account?' : 'Already have an account?'}
            </p>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold rounded p-2 ml-2"
              onClick={() => setSignIn(!signIn)}
            >
              {signIn ? 'Signup' : 'Login'}
            </button>
          </div>
          <p>Or</p>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold rounded p-2 ml-2"
            onClick={handleGuestSignIn}
          >
            Sign in as a guest
          </button>
          <AuthForm isLogin={signIn} />
        </>
      )}
    </div>
  );
}
