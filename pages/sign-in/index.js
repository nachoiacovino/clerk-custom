import { useClerk } from '@clerk/clerk-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import SignUpWithGoogle from '../../components/SignUpWithGoogle'

const SignIn = () => {
  const { client, setSession, navigateAfterSignIn } = useClerk();
  const { signInAttempt } = client;
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await signInAttempt.create(data);
      setSession(response.createdSessionId, navigateAfterSignIn);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (client.sessions[0]) {
      router.push('/');
    }
  }, [client]);

  return (
    <div className="flex flex-col min-h-screen py-24 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="w-auto h-12 mx-auto" src="./clerk.svg" alt="Clerk" />
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Sign in
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <SignUpWithGoogle signIn />
          <div className="flex items-center justify-center py-5 space-x-3">
            <div className="w-32 h-px bg-gray-300"></div>
            <p className="text-sm font-medium text-gray-400">OR</p>
            <div className="w-32 h-px bg-gray-300"></div>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                  {...register('identifier')}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
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
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>

            <div className="text-sm text-center">
              <Link href="/sign-in/forgot-password">
                <a>Forgot password?</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
