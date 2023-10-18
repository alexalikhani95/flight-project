"use client";

import React, { useContext } from "react";
import { UserContext, UserContextType } from "../context/UserContext";

const VisitedAirports = () => {
  const { userData } = useContext(UserContext) as UserContextType;

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold">My Visited Airports</h2>
      <div className="flex flex-col mt-10 font-bold">
        {!userData?.visitedAirports && (
          <p>
            You have not added any visited airports yet. To add an Airport, go
            to your dashboard, click on the Airports button, and add from there.
          </p>
        )}
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
