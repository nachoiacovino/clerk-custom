import { useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/router'
import { useState } from 'react'

import CodeVerification from '../../components/CodeVerification'

const VerifyEmailAddress = () => {
  const { client, setSession } = useClerk();
  const { signUpAttempt } = client;
  const router = useRouter();
  const [errors, setErrors] = useState();

  const onSubmit = async (data) => {
    try {
      const response = await signUpAttempt.attemptEmailAddressVerification(
        data,
      );
      setSession(response.createdSessionId, () => router.push('/'));
    } catch (err) {
      setErrors(err.errors);
    }
  };

  return <CodeVerification onSubmit={onSubmit} errors={errors} />;
};

export default VerifyEmailAddress;
