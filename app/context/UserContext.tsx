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

export type UserContextType = {
  user: User | null;
  createUser: (
    email: string,
    password: string,
    username: string
  ) => Promise<any>;
  logout: () => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signInAsGuest: () => Promise<any>;
  changePassword: (password: string) => Promise<any>;
  changeEmail: (email: string) => Promise<any>;
  deleteAccount: (user: User) => Promise<any>;
  userData: UserData | null;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserData = {
  email: string;
  id?: string;
  age?: string;
  location?: string;
  visitedAirports?: string[];
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);


  const getUserData = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    setUserData(docSnap.data() as UserData | null);
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

  const deleteAccount = (user: User) => {
    return deleteUser(user);
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInAsGuest = () => {
    return signInAnonymously(auth);
  };

  const logout = () => {
    return signOut(auth);
  };

  const changePassword = (password: string) => {
    return updatePassword(auth.currentUser!, password);
  };

  const changeEmail = (email: string) => {
    return updateEmail(auth.currentUser!, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      // Save user data in localStorage on login
      if (currentUser) {
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        // Remove user data from localStorage on logout
        localStorage.removeItem('user');
        localStorage.removeItem('userData');
      }
      setIsCheckingAuth(false); 
    });

    // Get user data from localStorage on page load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      getUserData(user.uid);
    }
  }, [user])


  useEffect(() => {
    if (
      (!isCheckingAuth &&
        !user &&
        !nonAuthenticatedRoutes.includes(pathname)) ||
      (user?.isAnonymous && restrictedGuestRoutes.includes(pathname))
    ) {
      router.push('/');
    }
  }, [isCheckingAuth, pathname, router, user]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  if (!isCheckingAuth && !user && !nonAuthenticatedRoutes.includes(pathname)) {
    return null;
  }

  return (
    <UserContext.Provider
      value={{
        createUser,
        user,
        userData,
        logout,
        signIn,
        signInAsGuest,
        changePassword,
        changeEmail,
        deleteAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
