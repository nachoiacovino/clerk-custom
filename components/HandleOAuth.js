import { useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const HandleOAuth = () => {
  const { client, setSession } = useClerk();
  const { signUpAttempt, signInAttempt } = client;
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
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

          // If 2fa is not on, the newly created signInAttempt will immediately
          // turn to complete
          if (response.status === 'complete') {
            setSession(response.createdSessionId, () => router.push('/'));
          } else if (response.status === 'needs_factor_two') {
            // sometimes you need to collect a second factor
            // more on this later
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
