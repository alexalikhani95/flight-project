import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { httpsCallable } from 'firebase/functions';
import {functions} from '../firebase';

type AgeData = {
  age: string;
};

const AgeForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<AgeData>();
  const [showEmailUpdatedText, setShowEmailUpdatedText] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const onSubmit = (data: AgeData) =>{ 
    setIsUpdating(true);
    const { age } = data;
    const addAge = httpsCallable(functions, 'addAge');
    addAge({text: age}).then(() => {
      setShowEmailUpdatedText(true);
      reset()
      setIsUpdating(false)
    })
    .catch((error) => {
      setError('age', {
        type: 'manual',
        message: error.message,
      });
      setIsUpdating(false)
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
        <p className="font-bold">Add age</p>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-white">
          <div className="mb-5">
            <label htmlFor="email" className="flex flex-col items-center">
              age
              <input
                type="text"
                id="change-email"
                {...register('age', { required: true })}
                className="shadow border rounded py-2 px-3 ml-2"
              />
            </label>
            {errors.age && (
              <p className="text-red-500 mt-1">{errors.age.message}</p>
            )}
            {isUpdating && <p>Updating Age...</p>}
            {showEmailUpdatedText && <p>Age Updated!</p>}
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

export default AgeForm;
