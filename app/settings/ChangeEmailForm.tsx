'use client';

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext, UserContextType } from '../context/UserContext';

type ChangeEmailData = {
  newEmail: string;
};

const ChangeEmailForm = () => {
  const { changeEmail, user } = useContext(UserContext) as UserContextType;
  const { register, handleSubmit } = useForm<ChangeEmailData>();
  const [showEmailUpdatedText, setShowEmailUpdatedText] = useState(false);

  const onSubmit = (data: ChangeEmailData) => {
    changeEmail(data.newEmail);
    setShowEmailUpdatedText(true);
  };

  useEffect(() => {
    setTimeout(function () {
      setShowEmailUpdatedText(false);
    }, 3000);
  }, [showEmailUpdatedText]);

  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 text-center">
        <p className="font-bold">Change Email</p>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-white">
          <div className="mb-5 flex flex-col">
            <label htmlFor="email">New Email</label>
            <input
              type="text"
              id="change-email"
              {...register('newEmail', { required: true })}
              className="shadow border rounded py-2 px-3"
            />
            {showEmailUpdatedText && <p>Email Updated!</p>}
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

export default ChangeEmailForm;
