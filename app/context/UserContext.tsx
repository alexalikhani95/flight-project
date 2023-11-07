'use client';

import React, { createContext, useEffect, useState, useCallback } from 'react';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  updatePassword,
  updateEmail,
  signInAnonymously,
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
  const router = useRouter();
  const pathname = usePathname();


  const redirectUser = useCallback((user: UserType | null, pathname: string) => {
    const isGuestUser =  !user?.email
    const shouldRedirectToDashboard = user && nonAuthenticatedRoutes.includes(pathname) || isGuestUser && restrictedGuestRoutes.includes(pathname)
    const shouldRedirectToLogin = !user && !nonAuthenticatedRoutes.includes(pathname)
    
    if(shouldRedirectToDashboard) {
      return router.push('/dashboard');
    }

    if (shouldRedirectToLogin) {
      return router.push("/auth/login");
    }
  }, [router])

  const getUserData = useCallback(async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    setUser(docSnap.data() as UserType);
    setIsCheckingAuth(false);
    redirectUser(docSnap.data() as UserType, pathname)
  },[pathname, redirectUser])

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
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if(currentUser.isAnonymous) {
          setUser({ email: null })
          redirectUser({email: null}, pathname)
          setIsCheckingAuth(false)
        } else {
          await getUserData(currentUser.uid);     
        }
      }
      else {
        setUser(null);
        setIsCheckingAuth(false);
        redirectUser(null, pathname)
      }
    });

    return () => {
      unsubscribe();
    };
  }, [pathname, getUserData, redirectUser]);


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
