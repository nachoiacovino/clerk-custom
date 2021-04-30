import { useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/router'

import CodeVerification from '../../components/CodeVerification'

const VerifyEmailAddress = () => {
  const { client, setSession } = useClerk();
  const { signUpAttempt } = client;
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await signUpAttempt.attemptEmailAddressVerification(
        data,
      );
      setSession(response.createdSessionId, () => router.push('/'));
    } catch (err) {
      console.log(err);
    }
  };

  return <CodeVerification onSubmit={onSubmit} />;
};

export default VerifyEmailAddress;
