'use client';

import { useContext } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
  const { logout, user } = useContext(UserContext) as UserContextType;
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="flex justify-between w-full bg-white py-5 px-20">
      <Link href="/">
        <h1 className="text-3xl font-bold text-blue-950">Flight App</h1>
      </Link>
      {user && (
        <div>
          <Link href="/dashboard">
            <button className="text-blue-950 hover:text-blue-700 font-bold mr-5">
              Dashboard
            </button>
          </Link>
          {user.email !== 'guest@gmail.com' && (
            <Link href="/settings">
              <button className="text-blue-950 hover:text-blue-700 font-bold mr-5">
                Settings
              </button>
            </Link>
          )}
          <button
            className="text-blue-950 hover:text-blue-700 font-bold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
