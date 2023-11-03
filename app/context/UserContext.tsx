'use client';

import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  User,
  updatePassword,
  updateEmail,
  signInAnonymously,
  deleteUser,
} from 'firebase/auth';
import { useRouter, usePathname } from 'next/navigation';
import LoadingSpinner from '../components/LoadingSpinner';
import { nonAuthenticatedRoutes, restrictedGuestRoutes } from '@/routes/routes';
import {db} from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { UserType } from '@/types/types';

export type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  createUser: (
    email: string,
    password: string,
    username: string
  ) => Promise<any>;
  logout: () => void;
  signIn: (email: string, password: string) => Promise<any>;
  signInAsGuest: () => Promise<any>;
  changePassword: (password: string) => Promise<any>;
  changeEmail: (email: string) => Promise<any>;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);
  const [userDataLoaded, setUserDataLoaded] = useState(false);


  const getUserData = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    setUser(docSnap.data() as UserType);
    setUserDataLoaded(true);
  };

  const router = useRouter();
  const pathname = usePathname();

  const createUser = async (
    email: string,
    password: string,
    username: string
  ) => {
    await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth.currentUser!, {
      displayName: username,
    });
  };

  const signIn = (email: string, password: string) => {
     return signInWithEmailAndPassword(auth, email, password);
  };

  const signInAsGuest = () => {
    return signInAnonymously(auth);
  };

  const logout = () => {
    signOut(auth);
    setUser(null);
  };

  const changePassword = (password: string) => {
    return updatePassword(auth.currentUser!, password);
  };

  const changeEmail = (email: string) => {
    return updateEmail(auth.currentUser!, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        currentUser.isAnonymous
          ? setUser({ email: null })
          : getUserData(currentUser.uid);
      }
      setIsCheckingAuth(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  useEffect(() => {

    if (!isCheckingAuth && userDataLoaded) {

    // if user is not logged in and tries to access a restricted route, redirect to login
    if (
      !user &&
      !nonAuthenticatedRoutes.includes(pathname)
    ) {
      router.push("/");
    }

    // if a guest user tries to access resticted routes/ a user tries to go to non authenticated routesredirect to dashboard
    if((user && !user.email && restrictedGuestRoutes.includes(pathname)) || (user && nonAuthenticatedRoutes.includes(pathname))) {
      return router.push('/dashboard');
    }
  }
  }, [isCheckingAuth, pathname, router, user, userDataLoaded]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }


  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        setUser,
        logout,
        signIn,
        signInAsGuest,
        changePassword,
        changeEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
