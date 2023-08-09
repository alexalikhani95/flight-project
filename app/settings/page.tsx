'use client';

import { useContext, useEffect, useState } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

const Settings = () => {
  const { user } = useContext(UserContext) as UserContextType;
  const [showPasswordUpdatedText, setShowUpdatedText] = useState(false);

  useEffect(() => {
    setTimeout(function () {
      setShowUpdatedText(false);
    }, 3000);
  }, [showPasswordUpdatedText]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Settings</h1>
      {user?.email !== 'guest@gmail.com' && (
        <>
          <ChangePasswordForm />
          <ChangeEmailForm />
        </>
      )}
    </div>
  );
};

export default Settings;
