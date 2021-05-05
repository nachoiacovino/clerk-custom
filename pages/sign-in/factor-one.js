import { useClerk } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import { useState } from 'react';

import CodeVerification from '../../components/CodeVerification';

const FactorOne = () => {
  const { client, setSession } = useClerk();
  const { signInAttempt } = client;
  const router = useRouter();
  const [errors, setErrors] = useState();

  const onSubmit = async ({ code }) => {
    try {
      const response = await signInAttempt.attemptFactorOne({
        strategy: 'email_code',
        code,
      });

      if (response.status === 'needs_factor_two') {
        router.push('/sign-in/factor-two');
      } else if (response.status === 'complete') {
        setSession(response.createdSessionId, () => router.push('/'));
      }
    } catch (err) {
      setErrors(err.errors);
    }
  };

  return <CodeVerification onSubmit={onSubmit} errors={errors} />;
};

export default FactorOne;
