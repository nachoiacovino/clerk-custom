import { useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const HandleOAuth = () => {
  const { client, setSession, navigateAfterSignIn } = useClerk();
  const { signUpAttempt, signInAttempt } = client;
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      console.log(signUpAttempt.externalAccountVerification);
      if (signUpAttempt.externalAccountVerification.status === 'transferable') {
        // If it's transferable, create a signInAttempt with it
        const response = await signInAttempt.create({ transfer: true });

        // If 2fa is not on, the newly created signInAttempt will immediately
        // turn to complete
        if (response.status === 'complete') {
          setSession(response.createdSessionId, navigateAfterSignIn);
        } else if (response.status === 'needs_factor_two') {
          // sometimes you need to collect a second factor
          // more on this later
        }
      }
      router.push('/');
    };
    load();
  }, []);

  return <div></div>;
};

export default HandleOAuth;
