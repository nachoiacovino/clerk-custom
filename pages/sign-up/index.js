import { useClerk } from '@clerk/clerk-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

const SignUp = () => {
  const { client } = useClerk();
  const { signInAttempt, signUpAttempt } = client;
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    signUpAttempt.create(data);
    signUpAttempt.prepareEmailAddressVerification();
  };

  return (
    <form
      className="flex flex-col w-64 mx-auto space-y-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="border-2 border-gray-600 rounded-lg py-2 px-3"
        type="text"
        id="first_name"
        name="first_name"
        {...register('first_name')}
        placeholder="First name"
      />
      <input
        className="border-2 border-gray-600 rounded-lg py-2 px-3"
        type="text"
        id="last_name"
        name="last_name"
        {...register('last_name')}
        placeholder="Last Name"
      />
      <input
        className="border-2 border-gray-600 rounded-lg py-2 px-3"
        type="email"
        id="email_address"
        name="email_address"
        placeholder="Email address"
        {...register('email_address')}
      />
      <input
        className="border-2 border-gray-600 rounded-lg py-2 px-3"
        type="password"
        id="password"
        name="password"
        placeholder="Password"
        {...register('password')}
      />
      <button className="rounded-lg p-2 bg-blue-600 text-white" type="submit">
        Sign up
      </button>
    </form>
  );
};

export default SignUp;
