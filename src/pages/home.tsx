import cyberman from '@/assets/image.png'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { featuredItems, programs } from '@/constants'
import { FaArrowRightLong } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../firebase/index'

const Home = () => {
  const navigate = useNavigate()
  const [user] = useAuthState(auth)

  // 🔹 "Boshlash" tugmasi uchun
  const handleClick = () => {
    if (user) navigate('/videodarslar')
    else navigate('/auth')
  }

  // 🔹 Card bosilganda
  const handleCardClick = (path: string) => {
    if (user) navigate(path)
    else navigate('/auth')
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="w-full min-h-[90vh] flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-24 py-10">
        {/* Text block */}
        <div className="max-w-xl text-center lg:text-left flex flex-col justify-center">
          <h4 className="text-4xl sm:text-5xl lg:text-7xl font-bold uppercase leading-tight">
            Internet <br />
            <span className="text-blue-600">xavfsizligingizni</span> taʼminlang
          </h4>

          <p className="text-muted-foreground mt-4 text-base sm:text-lg">
            Xavfsiz internetdan foydalanish ko‘nikmalarini o‘rganing — parollar,
            shaxsiy ma’lumotlarni himoya qilish, firibgarliklardan saqlanish va
            ko‘p narsalar haqida bilib oling.
          </p>

          <Button
            onClick={handleClick}
            className="w-full sm:w-fit mt-6 font-bold h-12 text-base sm:text-lg"
          >
            Boshlash
          </Button>

          <div className="mt-12 sm:mt-20">
            <p className="text-muted-foreground tracking-wider text-sm sm:text-base">
              HAMKORLARIMIZ
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-3">
              {featuredItems.map((Icon, index) => (
                <Icon
                  key={index}
                  className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Image block */}
        <div className="mt-10 lg:mt-0 flex justify-center lg:justify-end">
          <img
            src={cyberman}
            className="w-72 sm:w-96 lg:w-[420px] h-auto object-contain drop-shadow-lg"
            alt="Cyber Security"
          />
        </div>
      </section>

      {/* PROGRAMS SECTION */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center lg:text-left">
          Qayerdan boshlashni bilmaysizmi?
        </h1>
        <p className="mt-2 text-muted-foreground text-center lg:text-left text-sm sm:text-base">
          Quyidagi bo‘limlar orqali xavfsiz internetdan foydalanish bo‘yicha
          interaktiv darslar va yo‘riqnomalarni o‘rganing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-10">
          {programs.map((item) => {
            const path =
              item.title === 'Kiberxavfsizlik darslari'
                ? '/videodarslar'
                : item.title === 'Testlar'
                ? '/testlar'
                : '/qollanmalar'

            return (
              <Card
                key={item.title}
                className="p-6 sm:p-8 relative cursor-pointer group hover:shadow-lg hover:-translate-y-1 transition-all"
                onClick={() => handleCardClick(path)}
              >
                <h3 className="text-lg sm:text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-3 line-clamp-3">
                  {item.descr}
                </p>

                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-3 bottom-3 sm:bottom-4 sm:right-4 group-hover:translate-x-1 transition-transform"
                >
                  <FaArrowRightLong className="text-blue-600 w-5 h-5" />
                </Button>
              </Card>
            )
          })}
        </div>
      </section>
    </>
  )
}

export default Home
