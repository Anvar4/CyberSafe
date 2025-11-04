import {
  FaGoogle,
  FaGithub,
  FaXTwitter,
  FaUser, // Anonymous login uchun saqlandi, lekin dizaynda ko'rsatilmaydi
} from 'react-icons/fa6';
import {
  // Barcha Social Media provayderlari importlari
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
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Button va Separator komponentlari endi ishlatilmaydi, faqat oddiy div va button.

const Social = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // --- Funksiyalar (o'zgarishsiz qoldi) ---
  const handleCredentialConflict = async (error: any) => {
    const email = error.customData?.email;
    const pendingCred = error.credential;

    if (!email || !pendingCred) return;

    const methods = await fetchSignInMethodsForEmail(auth, email);

    if (methods.includes('google.com')) {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

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
  
  // onYahoo va onAnonymous funksiyalari mavjud, lekin UI da ko'rsatilmaydi

  return (
    // Rasmdagi ikonkalarga mos 3 ta tugmani ko'rsatish
    <div className="flex justify-center space-x-6">
      
      {/* 1. Google Ikonkasi (Rasmdagi ko'p rangli ikonka, Google logotipi ko'p rangli) */}
      <button
        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-md transition-opacity ${isLoading ? 'opacity-50' : 'hover:opacity-80'}`}
        onClick={onGoogle}
        disabled={isLoading}
        // Rasmdagi Google ikonkasini taqlid qilish uchun oq fonda rangli gradient
        style={{
          backgroundColor: 'white',
          border: '1px solid #ddd',
        }}
      >
        <FaGoogle style={{ color: '#4285F4' }} /> {/* Google logotipining asosiy rangi */}
      </button>

      {/* 2. Google / Facebook / Boshqa ikonka (Rasmdagi ko'k ikonka) */}
      <button
        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl text-white shadow-md transition-opacity ${isLoading ? 'opacity-50' : 'hover:opacity-80'}`}
        onClick={onGithub} // Funksional jihatdan Github ni ishlatamiz
        disabled={isLoading}
        // Rasmdagi ko'k dumaloq ikonka (ko'pincha Facebook/Twitter)
        style={{ backgroundColor: '#1877F2' }} 
      >
        <FaGithub /> {/* Yoki boshqa rangli ijtimoiy tarmoq ikonkasi */}
      </button>

      {/* 3. Boshqa ikonka (Rasmdagi pushti/qizil/sariq ikonka) */}
      <button
        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl text-white shadow-md transition-opacity ${isLoading ? 'opacity-50' : 'hover:opacity-80'}`}
        onClick={onX} // Funksional jihatdan X/Twitter ni ishlatamiz
        disabled={isLoading}
        // Rasmdagi to'q sariq/qizil dumaloq ikonka
        style={{ backgroundColor: '#FF66B2' }} 
      >
        <FaXTwitter /> {/* Yoki boshqa rangli ijtimoiy tarmoq ikonkasi */}
      </button>

    </div>
  );
};

export default Social;