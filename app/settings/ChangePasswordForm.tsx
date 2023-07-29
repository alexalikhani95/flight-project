import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext, UserContextType } from '../context/UserContext';

type ChangePasswordData = {
  newPassword: string;
};

const ChangePasswordForm = () => {
  const { changePassword } = useContext(UserContext) as UserContextType;
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ChangePasswordData>();
  const [showPasswordUpdatedText, setShowPasswordUpdatedText] = useState(false);

  const onSubmit = async (data: ChangePasswordData) => {
    try {
      await changePassword(data.newPassword);
      setShowPasswordUpdatedText(true);
    } catch (error: any) {
      if (error.code === 'auth/weak-password') {
        return setError('newPassword', {
          type: 'manual',
          message: 'Password must be a minimum of 6 characters',
        });
      } else {
        setError('newPassword', {
          type: 'manual',
          message: 'An error occurred. Please try again later.',
        });
      }
    }
  };

  useEffect(() => {
    setTimeout(function () {
      setShowPasswordUpdatedText(false);
    }, 3000);
  }, [showPasswordUpdatedText]);

  return (
    <div className="flex flex-col items-center">
      <div className="mt-10 text-center">
        <p className="font-bold">Change Password</p>
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-white">
          <div className="mb-5">
            <label htmlFor="username" className="flex flex-col items-center">
              New Password
              <input
                type="text"
                id="username"
                {...register('newPassword', { required: true })}
                className="shadow border rounded py-2 px-3 ml-2"
              />
            </label>
            {errors.newPassword && (
              <p className="text-red-500 mt-1">{errors.newPassword.message}</p>
            )}
            {showPasswordUpdatedText && <p>Password Updated!</p>}
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

export default ChangePasswordForm;
