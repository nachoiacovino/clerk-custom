import { useClerk } from '@clerk/clerk-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const RedirectToIndex = () => {
  const { session } = useClerk();
  const router = useRouter();

  useEffect(() => {
    if (session) router.push('/');
  }, [session]);

  return <div></div>;
};

export default RedirectToIndex;
