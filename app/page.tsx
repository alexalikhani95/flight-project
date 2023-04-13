'use client';
import AuthForm from './components/AuthForm';
import { useState } from 'react';

export default function Home() {
  const [signIn, setSignIn] = useState(true);

  return (
    <div className="flex w-full bg-gray-100 h-screen items-center flex-col pt-5">
      <div className="flex items-center justify-center mt-10">
        <p>{signIn ? 'Dont have an account?' : 'Already have an account?'}</p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold rounded p-2 ml-2"
          onClick={() => setSignIn(!signIn)}
        >
          {signIn ? 'Signup' : 'Login'}
        </button>
      </div>
      <AuthForm isLogin={signIn} />
    </div>
  );
}
