'use client';

import { useForm } from 'react-hook-form';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const RegsisterForm = () => {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <div className="flex flex-col align-center mt-10 shadow-lg">
      <div className="text-white bg-black flex justify-center p-5">
        <h1 className="text-3xl font-bold">Create Account</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-5 bg-white">
        <div className="mb-5 flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: true })}
            className="shadow border rounded py-2 px-3"
          />
        </div>

        <div className="mb-5 flex flex-col">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: true })}
            className="shadow border rounded py-2 px-3"
          />
        </div>

        <div className="mb-5 flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            className="shadow border rounded py-2 px-3"
          />
        </div>

        <div className="mb-5 flex flex-col">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
            className="shadow border rounded py-2 px-3"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-2 mt-5 w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegsisterForm;