'use client';

import { useContext, useEffect, useState } from 'react';
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

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>();

  const { createUser, signIn } = useContext(UserContext) as UserContextType;

  const onSubmit = async ({ email, password, username }: AuthFormData) => {
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await createUser(email, password, username);
      }
      router.push('/dashboard');
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        return setError('email', {
          type: 'manual',
          message: 'A user with this email already exists',
        });
      }
      if (error.code === 'auth/user-not-found') {
        return setError('email', {
          type: 'manual',
          message: "Sorry, we can't find a user with those details.",
        });
      }
      if (error.code === 'auth/weak-password') {
        return setError('password', {
          type: 'manual',
          message: 'Password must be a minimum of 6 characters',
        });
      } else {
        setError('password', {
          type: 'manual',
          message: 'An error occurred. Please try again later.',
        });
      }
    }
  };

  useEffect(() => {
    // Clear form errors and reset the form when isLogin changes
    reset();
  }, [isLogin, reset]);

  return (
    <div className="flex flex-col align-center mt-10 shadow-lg w-[350px] max-w-full">
      <div className="text-blue-950 bg-white flex justify-center p-5">
        <h1 className="text-3xl font-bold">
          {isLogin ? 'Login' : 'Create Account'}
        </h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-white">
        {!isLogin && (
          <div className="mb-5 flex flex-col">
            <label>
              Username
              <input
                type="text"
                id="username"
                required={true}
                {...register('username', { required: true })}
                className="shadow border rounded py-2 px-3 ml-2"
              />
            </label>
          </div>
        )}

        <div className="mb-5 flex flex-col">
          <label>
            Email
            <input
              type="email"
              id="email"
              required={true}
              {...register('email', { required: true })}
              className="shadow border rounded py-2 px-3 ml-2"
            />
          </label>
          {errors.email && (
            <p className="text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-5 flex flex-col">
          <label>
            Password
            <input
              type="password"
              id="password"
              required={true}
              {...register('password', { required: true })}
              className="shadow border rounded py-2 px-3 ml-2"
            />
          </label>
          {errors.password && (
            <p className="text-red-500 mt-1">{errors.password.message}</p>
          )}
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
