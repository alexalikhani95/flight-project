"use client";

import { doc, getDoc } from "firebase/firestore";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import { db } from "../firebase";

type User = {
  email: string;
  id?: string;
  age?: string;
  location?: string;
  visitedAirports?: string[];
};

const VisitedAirports = () => {
  const { user } = useContext(UserContext) as UserContextType;

  const [userData, setUserData] = useState<User | null>(null);

  const getUser = useCallback(async () => {
    const docRef = doc(db, "users", user?.uid as string);
    const docSnap = await getDoc(docRef);

    setUserData(docSnap.data() as User);
  }, [user?.uid]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold">My Visited Airports</h2>
      <div className="flex flex-col mt-10 font-bold">
        {userData?.visitedAirports?.map((airport, index) => (
          <div key={index} className="p-2">
            <p>{airport}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisitedAirports;
