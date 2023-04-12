'use client';

import { useContext } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';

const Dashboard = () => {
  const { user, logout } = useContext(UserContext) as UserContextType;
  return (
    <div>
      <h2>Welcome {user?.displayName}</h2>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Dashboard;
