import {
  FaGithub,
  FaGoogle,
  FaMicrosoft,
  FaUser,
  FaXTwitter,
	FaYahoo,
} from 'react-icons/fa6';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
	TwitterAuthProvider,
	OAuthProvider,
} from 'firebase/auth';
import { auth } from '@/firebase';

const Social = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCredentialConflict = async (error: any) => {
    const email = error.customData?.email;
    const pendingCred = error.credential;

    if (!email || !pendingCred) return;

    const methods = await fetchSignInMethodsForEmail(auth, email);

    if (methods.includes('google.com')) {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Bog‘lash credential’ni
      await linkWithCredential(result.user, pendingCred);
      navigate('/');
    } else {
      alert(`Ushbu email bilan oldin ${methods[0]} orqali tizimga kirilgan. Iltimos, o‘sha usulni tanlang.`);
    }
  };

  const onGoogle = () => {
    setIsLoading(true);
    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider)
      .then(() => navigate('/'))
      .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          handleCredentialConflict(error);
        } else {
          console.error('Google kirish xatosi:', error);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const onGithub = () => {
    setIsLoading(true);
    const provider = new GithubAuthProvider();

    signInWithPopup(auth, provider)
      .then(() => navigate('/'))
      .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          handleCredentialConflict(error);
        } else {
          console.error('Github kirish xatosi:', error);
        }
      })
      .finally(() => setIsLoading(false));
  };
	const onYahoo = () => {
    setIsLoading(true);
    const provider = new OAuthProvider('yahoo.com');

    signInWithPopup(auth, provider)
      .then(() => navigate('/'))
      .catch((error) => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          handleCredentialConflict(error);
        } else {
          console.error('Github login error:', error);
        }
      })
      .finally(() => setIsLoading(false));
  };
  	const onX = () => {
  setIsLoading(true);
  const provider = new TwitterAuthProvider();

  signInWithPopup(auth, provider)
    .then(() => navigate('/'))
    .catch((error) => {
      if (error.code === 'auth/account-exists-with-different-credential') {
        handleCredentialConflict(error);
      } else {
        console.error('Twitter kirish xatosi:', error);
      }
    })
    .finally(() => setIsLoading(false));
};

  const onAnonymous = () => {
    setIsLoading(true);

    signInAnonymously(auth)
      .then(() => navigate('/'))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <Separator className="my-3" />
      <div className="grid grid-cols-2 gap-2">
        <Button
          className="h-12 bg-gray-600 hover:bg-gray-500"
          variant={'secondary'}
          onClick={onGithub}
          disabled={isLoading}
        >
          <FaGithub className="mr-2" />
          <span>Github bilan kirish</span>
        </Button>
        <Button
          className="h-12"
          variant={'destructive'}
          onClick={onGoogle}
          disabled={isLoading}
        >
          <FaGoogle className="mr-2" />
          <span>Google bilan kirish</span>
        </Button>
        <Button className=" text-zinc-50 h-12 bg-orange-600 hover:bg-orange-500" variant={'default'} onClick={onX} disabled={isLoading}>
          <FaMicrosoft className="mr-2" />
          <span>Microsoft bilan kirish</span>
        </Button>
        <Button className=" text-zinc-50 h-12 bg-blue-800 hover:bg-teal-900" variant={'default'} onClick={onX} disabled={isLoading}>
          <FaXTwitter className="mr-2" />
          <span>X bilan kirish</span>
        </Button>
      </div>
    </>
  );
};

export default Social;
