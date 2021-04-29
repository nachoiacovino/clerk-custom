import { useClerk } from '@clerk/clerk-react'
import { useEffect } from 'react'

const HandleOAuth = () => {
  const { client } = useClerk();
  const { signUpAttempt, signInAttempt } = client;

  useEffect(() => {
    const load = async () => {
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
    };
    load();
  }, []);

  return <div>hi</div>;
};

export default HandleOAuth;
