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
} from 'firebase/auth';

export type UserContextType = {
  user: User | null;
  createUser: (
    email: string,
    password: string,
    username: string
  ) => Promise<any>;
  logout: () => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  changePassword: (password: string) => Promise<any>;
};

type UserContextProviderProps = {
  children: React.ReactNode;
};

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

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

  const logout = () => {
    return signOut(auth);
  };

  const changePassword = (password: string) => {
    return updatePassword(auth.currentUser!, password);
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
      }
    });

    // Get user data from localStorage on page load
    const user = localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ createUser, user, logout, signIn, changePassword }}
    >
      {children}
    </UserContext.Provider>
  );
};
