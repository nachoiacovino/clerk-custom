import { useClerk } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const HandleOAuth = () => {
  const { client, setSession } = useClerk();
  const { signUpAttempt, signInAttempt } = client;
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        if (signInAttempt.status === 'needs_factor_two') {
          router.push('/sign-in/factor-two');
        }

        if (signInAttempt.factorOneVerification.status === 'transferable') {
          const response = await signUpAttempt.create({ transfer: true });
          if (response.status === 'complete') {
            setSession(response.createdSessionId, () => router.push('/'));
          }
        }

        if (
          signUpAttempt.externalAccountVerification.status === 'transferable'
        ) {
          // If it's transferable, create a signInAttempt with it
          const response = await signInAttempt.create({ transfer: true });

          if (response.status === 'complete') {
            setSession(response.createdSessionId, () => router.push('/'));
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    load();
  }, []);

  return <div></div>;
};

export default HandleOAuth;
