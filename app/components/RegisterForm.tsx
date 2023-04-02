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
    <div>
      <h1>Register Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName', { required: true })}
          />
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName', { required: true })}
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
          />
        </div>

        <div>
          <label htmlFor="email">Password</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: true })}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegsisterForm;
