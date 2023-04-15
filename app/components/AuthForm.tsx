'use client';

import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext, UserContextType } from '../context/UserContext';
import { useRouter } from 'next/navigation';

type Props = {
  isLogin: boolean;
};

type AuthFormData = {
  username: string;
  email: string;
  password: string;
};

const AuthForm = ({ isLogin }: Props) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<AuthFormData>();

  const { createUser, signIn } = useContext(UserContext) as UserContextType;
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: AuthFormData) => {
    try {
      if (isLogin) {
        await signIn(data.email, data.password);
      } else {
        await createUser(data.email, data.password, data.username);
      }
      router.push('/dashboard');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('A User with this email already exists');
      }
      if (error.code === 'auth/user-not-found') {
        setErrorMessage(
          'Sorry, we cant find a user with those details. Please check and try again.'
        );
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex flex-col align-center mt-10 shadow-lg w-[350px] max-w-full">
      <div className="text-blue-950 bg-white flex justify-center p-5">
        <h1 className="text-3xl font-bold">
          {isLogin ? 'Login' : 'Create Account'}
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-white">
        {errorMessage !== '' && (
          <p className="text-red-500 mb-10">{errorMessage}</p>
        )}
        {!isLogin && (
          <div className="mb-5 flex flex-col">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              {...register('username', { required: true })}
              className="shadow border rounded py-2 px-3"
            />
          </div>
        )}

        <div className="mb-5 flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            className="shadow border rounded py-2 px-3"
          />
        </div>

        <div className="mb-5 flex flex-col">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
            className="shadow border rounded py-2 px-3"
          />
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
  );
};

export default AuthForm;
