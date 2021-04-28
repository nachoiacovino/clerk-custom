import { useClerk } from '@clerk/clerk-react'
import { useForm } from 'react-hook-form'

const FactorOne = () => {
  const { register, handleSubmit } = useForm();
  const { client } = useClerk();
  const { signInAttempt } = client;

  const onSubmit = async (data) => {
    try {
      await signInAttempt.attemptEmailAddressVerification(data);
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen py-24 bg-gray-50 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10">
          <h2 className="mt-6 mb-4 text-2xl font-extrabold text-center text-gray-900">
            Enter the 6-digit code you received in your email{' '}
            {signInAttempt.emailAddress}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="mt-1">
                <input
                  id="code"
                  name="code"
                  type="number"
                  required
                  {...register('code')}
                  className="block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FactorOne;