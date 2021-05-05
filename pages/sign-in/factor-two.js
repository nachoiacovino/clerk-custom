import { useClerk } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import CodeVerification from '../../components/CodeVerification';

const FactorTwo = () => {
  const { client, setSession } = useClerk();
  const { signInAttempt } = client;
  const router = useRouter();

  useEffect(() => {
    signInAttempt.prepareFactorTwo({ strategy: 'phone_code' });
  }, []);

  const onSubmit = async ({ code }) => {
    try {
      const response = await signInAttempt.attemptFactorTwo({
        strategy: 'phone_code',
        code,
      });

      setSession(response.createdSessionId, () => router.push('/'));
    } catch (err) {
      console.log(err);
    }
  };

  return <CodeVerification onSubmit={onSubmit} />;
};

export default FactorTwo;
