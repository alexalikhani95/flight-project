'use client';

import { useContext } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { logout } = useContext(UserContext) as UserContextType;
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex justify-between w-full bg-white py-5 px-20">
      <h1 className="text-3xl font-bold text-blue-950">Flight App</h1>
      <button
        className="text-blue-950 hover:text-blue-700 font-bold"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Header;
