"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext, UserContextType } from "../context/UserContext";
import ChangeEmailForm from "./ChangeEmailForm";
import ChangePasswordForm from "./ChangePasswordForm";
import LocationForm from "./LocationForm";
import AgeForm from "./AgeForm";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

const Settings = () => {
  const { user, setUser } = useContext(UserContext) as UserContextType;
  const [showPasswordUpdatedText, setShowUpdatedText] = useState(false);
  const [clickedDelete, setClickedDelete] = useState(false);

  useEffect(() => {
    setTimeout(function () {
      setShowUpdatedText(false);
    }, 3000);
  }, [showPasswordUpdatedText]);

  const handleDeleteUser = () => {
    const deleteUser = httpsCallable(functions, "deleteUser");
    deleteUser(user?.uid);
    setUser(null);
  };

  return (
    <div className="flex flex-col items-center p-5">
      {user && (
        <>
          <h1 className="text-3xl font-bold">Settings</h1>
          <div className="flex flex-wrap justify-around">
            <div>
              <AgeForm />
            </div>
            <div>
              <LocationForm />
            </div>
            <div>
              <ChangePasswordForm />
            </div>
            <div>
              <ChangeEmailForm />
            </div>
          </div>
          <div className="flex flex-col items-center mt-5">
           {!clickedDelete && <button
              className="bg-red-700 hover:bg-red-500 text-white font-bold rounded p-2 mt-5 w-full"
              onClick={() => setClickedDelete(true)}
            >
              Delete Account
            </button>
}
            {clickedDelete && (
              <div>
                <p className="mt-2 font-bold text-red">
                  Are you sure you want to delete your account?
                </p>
                <button
                  className="bg-green-700 hover:bg-green-500 text-white font-bold rounded p-2 mt-5 w-full"
                  onClick={() => setClickedDelete(false)}
                >
                  No, I would like to keep my account
                </button>
                <button
                  className="bg-red-700 hover:bg-red-500 text-white font-bold rounded p-2 mt-5 w-full"
                  onClick={() => handleDeleteUser()}
                >
                  Yes, delete my account
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
