'use client';

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext, UserContextType } from '../context/UserContext';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

type ChangePasswordData = {
  newPassword: string;
};

const Settings = () => {
  const { changePassword, user } = useContext(UserContext) as UserContextType;
  const [showPasswordUpdatedText, setShowUpdatedText] = useState(false);

  const onSubmit = (data: ChangePasswordData) => {
    changePassword(data.newPassword);
    setShowUpdatedText(true);
  };

  useEffect(() => {
    setTimeout(function () {
      setShowUpdatedText(false);
    }, 3000);
  }, [showPasswordUpdatedText]);

  if (user?.email === 'guest@gmail.com') {
    return;
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold">Settings</h1>
      <ChangePasswordForm />
      <ChangeEmailForm />
    </div>
  );
};

export default Settings;
