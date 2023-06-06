'use client';

import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext, UserContextType } from '../context/UserContext';

type ChangeEmailData = {
  newEmail: string;
};

const ChangeEmailForm = () => {
  const { changeEmail, user } = useContext(UserContext) as UserContextType;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ChangeEmailData>();
  const [showEmailUpdatedText, setShowEmailUpdatedText] = useState(false);

  const onSubmit = async (data: ChangeEmailData) => {
    try {
      await changeEmail(data.newEmail);
      setShowEmailUpdatedText(true);
    } catch (error: any) {
      console.log(error.code);
      if (error.code === 'auth/email-already-in-use') {
        return setError('newEmail', {
          type: 'manual',
          message: 'A user with this email already exists',
        });
      }
      if (error.code === 'auth/invalid-email') {
        return setError('newEmail', {
          type: 'manual',
          message: 'Invalid email',
        });
      } else {
        setError('newEmail', {
          type: 'manual',
          message: 'An error occurred. Please try again later.',
        });
      }
    }
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
            <label htmlFor="email">
              New Email
              <input
                type="text"
                id="change-email"
                {...register('newEmail', { required: true })}
                className="shadow border rounded py-2 px-3 ml-2"
              />
            </label>
            {errors.newEmail && (
              <p className="text-red-500 mt-1">{errors.newEmail.message}</p>
            )}
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
