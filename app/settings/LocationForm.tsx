import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { httpsCallable } from 'firebase/functions';
import {functions} from '../firebase';


type LocationData = {
  location: string;
};

const LocationForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<LocationData>();
  const [showEmailUpdatedText, setShowEmailUpdatedText] = useState(false);

  
  const onSubmit = (data: LocationData) =>{ 
    const { location } = data;
    console.log(location)
    const addLocation = httpsCallable(functions, 'addLocation');
    addLocation({text: location}).then(() => {
      setShowEmailUpdatedText(true);
      reset()
    })
    .catch((error) => {
      setError('location', {
        type: 'manual',
        message: error.message,
      });
    })
}
  
  useEffect(() => {
    setTimeout(function () {
      setShowEmailUpdatedText(false);
    }, 3000);
  }, [showEmailUpdatedText]);

  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 text-center">
        <p className="font-bold">Add Location</p>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-white">
          <div className="mb-5">
            <label htmlFor="email" className="flex flex-col items-center">
              Location
              <input
                type="text"
                id="change-email"
                {...register('location', { required: true })}
                className="shadow border rounded py-2 px-3 ml-2"
              />
            </label>
            {errors.location && (
              <p className="text-red-500 mt-1">{errors.location.message}</p>
            )}
            {showEmailUpdatedText && <p>Email Updated!</p>}
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
    </div>
  );
};

export default LocationForm;
