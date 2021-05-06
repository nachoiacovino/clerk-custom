import { SignedIn, SignedOut, useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import DisplayErrors from '../../components/DisplayErrors'
import RedirectToIndex from '../../components/RedirectToIndex'
import SignUpWithGoogle from '../../components/SignUpWithGoogle'

const SignUp = () => {
  const { client } = useClerk();
  const { signUpAttempt } = client;
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [errors, setErrors] = useState();

  const onSubmit = async (data) => {
    try {
      await signUpAttempt.create(data);
      await signUpAttempt.prepareEmailAddressVerification();
      router.push('sign-up/verify-email-address');
    } catch (err) {
      setErrors(err.errors);
    }
  };

  return (
    <>
      <SignedIn>
        <RedirectToIndex />
      </SignedIn>
      <SignedOut>
        <div className="flex flex-col min-h-screen py-24 bg-gray-50 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="w-auto h-12 mx-auto"
              src="./clerk.svg"
              alt="Clerk"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Sign up
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
              <SignUpWithGoogle />
              <div className="flex items-center justify-center py-5 space-x-3">
                <div className="w-32 h-px bg-gray-300"></div>
                <p className="text-sm font-medium text-gray-400">OR</p>
                <div className="w-32 h-px bg-gray-300"></div>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      id="first_name"
                      name="first_name"
                      type="text"
                      autoComplete="given-name"
                      required
                      {...register('first_name')}
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      id="last_name"
                      name="last_name"
                      type="text"
                      autoComplete="family_name"
                      required
                      {...register('last_name')}
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      {...register('email_address')}
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <DisplayErrors
                    errors={errors?.filter(
                      (err) => err.meta.paramName === 'email_address',
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      {...register('password')}
                      className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <DisplayErrors
                    errors={errors?.filter(
                      (err) => err.meta.paramName === 'password',
                    )}
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign up
                  </button>
                </div>

                <DisplayErrors errors={errors} />
              </form>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
};

export default SignUp;
