'use client';

import { Inter } from 'next/font/google';
import AuthForm from './components/AuthForm';
import {
  UserContext,
  UserContextProvider,
  UserContextType,
} from './context/UserContext';
import { useContext } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { user } = useContext(UserContext) as UserContextType;

  return (
    <div className="flex w-full bg-gray-100 h-screen justify-center">
      <div>
        <AuthForm isLogin={user !== null} />
      </div>
    </div>
  );
}
