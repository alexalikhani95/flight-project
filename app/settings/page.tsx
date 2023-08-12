'use client';

import { useContext, useEffect, useState } from 'react';
import { UserContext, UserContextType } from '../context/UserContext';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

const Settings = () => {
  const { user, deleteAccount } = useContext(UserContext) as UserContextType;
  const [showPasswordUpdatedText, setShowUpdatedText] = useState(false);
  const [clickedDelete, setClickedDelete] = useState(false);

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
          <div className="flex flex-col items-center mt-5">
            <p
              className="font-bold text-red-700 cursor-pointer"
              onClick={() => setClickedDelete(true)}
            >
              Delete Account
            </p>
            {clickedDelete && (
              <>
                <p className="mt-2 font-bold text-red">
                  Are you sure you want to delete your account?
                </p>
                <button
                  className="bg-red-700 hover:bg-red-500 text-white font-bold rounded p-2 mt-5 w-full"
                  onClick={deleteAccount}
                >
                  Click to Delete Account
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
