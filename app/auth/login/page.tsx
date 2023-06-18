'use client';
import AuthForm from '@/app/auth/AuthForm';
import { UserContext, UserContextType } from '@/app/context/UserContext';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';

const Login = () => {
  const router = useRouter();
  const { signInAsGuest } = useContext(UserContext) as UserContextType;

  const handleGuestSignIn = async () => {
    // await needed here to prevent flicker when signing in
    await signInAsGuest();
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center mt-10">
        <p>Dont have an account?</p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold rounded p-2 ml-2"
          onClick={() => router.push('/auth/signup')}
        >
          Signup
        </button>
      </div>
      <p>Or</p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold rounded p-2 ml-2"
        onClick={handleGuestSignIn}
      >
        Sign in as a guest
      </button>
      <AuthForm isLogin={true} />
    </div>
  );
};

export default Login;
