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
    <div className="flex flex-col align-center bg-white p-10 mt-10 shadow-lg">
      <h1 className="text-3xl font-bold underline mb-5">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-1 flex flex-col">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: true })}
            className="shadow border rounded py-2 px-3"
          />
        </div>

        <div className="pb-1 flex flex-col">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: true })}
            className="shadow border rounded py-2 px-3"
          />
        </div>

        <div className="pb-1 flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            className="shadow border rounded py-2 px-3"
          />
        </div>

        <div className="pb-1 flex flex-col">
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded p-2 mt-5"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegsisterForm;
