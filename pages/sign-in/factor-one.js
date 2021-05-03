import { useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/router'

import CodeVerification from '../../components/CodeVerification'

const FactorOne = () => {
  const { client, setSession } = useClerk();
  const { signInAttempt } = client;
  const router = useRouter();

  const onSubmit = async ({ code }) => {
    try {
      await signInAttempt.attemptFactorOne({
        strategy: 'email_code',
        code,
      });
      router.push('/sign-in/factor-two');
    } catch (err) {
      console.log(err);
    }
  };

  return <CodeVerification onSubmit={onSubmit} />;
};

export default FactorOne;
