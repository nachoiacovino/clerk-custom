import { useClerk } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import DisplayErrors from '../../components/DisplayErrors';

const ForgotPassword = () => {
  const { client } = useClerk();
  const { signInAttempt } = client;
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [errors, setErrors] = useState();

  const onSubmit = async (data) => {
    try {
      const response = await signInAttempt.create(data);
      const strategy = response.allowedFactorOneStrategies.find(
        (x) => x.name === 'email_code',
      );

      // 3. Send the email code
      await signInAttempt.prepareFactorOne({
        name: 'email_code',
        // Note direct snake case access, strategy is a json object
        email_address_id: strategy.email_address_id,
      });

      router.push('/sign-in/factor-one');
    } catch (err) {
      setErrors(err.errors);
    }
  };

  return (
    <div className="flex flex-col min-h-screen py-24 bg-gray-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="w-auto h-12 mx-auto" src="../clerk.svg" alt="Clerk" />
        <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
          Forgot password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
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
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send me a code!
              </button>
            </div>

            <DisplayErrors errors={errors} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
