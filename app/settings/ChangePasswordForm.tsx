'use client';

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext, UserContextType } from '../context/UserContext';
import ChangeEmailForm from './ChangeEmailForm';

type ChangePasswordData = {
  newPassword: string;
};

const ChangePasswordForm = () => {
  const { changePassword, user } = useContext(UserContext) as UserContextType;
  const { register, handleSubmit } = useForm<ChangePasswordData>();
  const [showPasswordUpdatedText, setShowPasswordUpdatedText] = useState(false);

  const onSubmit = (data: ChangePasswordData) => {
    changePassword(data.newPassword);
    setShowPasswordUpdatedText(true);
  };

  useEffect(() => {
    setTimeout(function () {
      setShowPasswordUpdatedText(false);
    }, 3000);
  }, [showPasswordUpdatedText]);

  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 text-center">
        <p className="font-bold">Change Password</p>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-white">
          <div className="mb-5 flex flex-col">
            <label htmlFor="username">New Password</label>
            <input
              type="text"
              id="username"
              {...register('newPassword', { required: true })}
              className="shadow border rounded py-2 px-3"
            />
            {showPasswordUpdatedText && <p>Password Updated!</p>}
          </div>

          <div>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-500 text-white font-bold rounded p-2 mt-5 w-full"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
