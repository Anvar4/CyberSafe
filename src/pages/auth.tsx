import Login from '@/components/auth/login'
import Register from '@/components/auth/register'
import Social from '@/components/auth/social'
// Card komponenti olib tashlangan
import { useAuthState } from '@/stores/auth.store'

const Auth = () => {
  const { authState } = useAuthState()

  // Sarlavhani (Title) aniqlash funksiyasi
  const getTitle = () => {
    return authState === 'login' ? 'Kirish' : "Ro'yxatdan o'tish"
  }

  return (
    // Mobil ko'rinishga mos (to'liq ekran, padding kamaytirilgan)
    // Va fon rasmi o'xshash gradient (to'q binafsha/pushti)
    <div className='w-full min-h-screen p-4 flex flex-col items-center justify-center'
         style={{ background: 'color: #2653EB' }}> 
      
      {/* Kontent maydoni: mobil qurilmalar uchun mos kenglik, orqa fon oq yoki och rangda */}
      <div className='w-full max-w-sm p-8 rounded-2xl shadow-2xl bg-indigo-950 backdrop-blur-sm'>
        
        {/* YANGILANGAN SARLAVHA: authState ga qarab o'zgaradi */}
        <h1 className='text-3xl font-bold text-[#2653EB] mb-8 text-center'>
          {getTitle()}
        </h1>

        {/* Login yoki Register komponentini ko'rsatish */}
        {authState === 'login' && <Login />}
        {authState === 'register' && <Register />}

        {/* Ijtimoiy tarmoqlar orqali kirish (Social) */}
        <div className='mt-8'>
            <p className='text-center text-sm text-gray-300 mb-4'>Ijtimoiy tarmoqlar orqali kirish</p>
            <Social /> 
        </div>
      </div>
    </div>
  )
}

export default Auth