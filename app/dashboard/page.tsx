'use client';

import { useContext } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext) as UserContextType;

  console.log(user);
  return (
    <div>
      <h2>Welcome {user?.displayName}</h2>
    </div>
  );
};

export default Dashboard;
