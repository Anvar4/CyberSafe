import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FaGithub, FaLinkedin, FaTelegram, FaArrowRightLong } from 'react-icons/fa6'

const profilePhoto = "./photo.jpg";
const About = () => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="w-full min-h-[80vh] flex flex-col lg:flex-row items-center justify-between px-6 sm:px-12 lg:px-24 py-10">
        {/* Text block */}
        <div className="max-w-xl text-center lg:text-left flex flex-col justify-center">
          <h4 className="text-4xl sm:text-5xl lg:text-6xl font-bold uppercase leading-tight">
            Men <span className="text-blue-600">haqimda</span>
          </h4>

          <p className="text-muted-foreground mt-4 text-base sm:text-lg text-justify">
            Men Ko'charov Anvar Fullstack dasturchiman. Men Surxondaryo viloyatida 2004-yilning iyun oyida tug'ilganman. Zamonaviy, xavfsiz va samarali web saytlar, Telegram bot, Mobil ilova  yarataman.
            React, TypeScript, Firebase, TailwindCSS, Html, css, Express.js MongoDB, MySQL, firebase, Rest API, Node.js texnologiari bilan ishlayman.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-6">
            <a href="https://github.com/anvar4" target="_blank">
              <Button variant="outline" className="flex items-center gap-2">
                <FaGithub className="text-lg" /> GitHub
              </Button>
            </a>
            <a href="https://t.me/KucharovAnvar" target="_blank">
              <Button variant="outline" className="flex items-center gap-2">
                <FaTelegram className="text-lg" /> Telegram
              </Button>
            </a>
            <a href="https://linkedin.com/" target="_blank">
              <Button variant="outline" className="flex items-center gap-2">
                <FaLinkedin className="text-lg" /> LinkedIn
              </Button>
            </a>
          </div>
        </div>

        {/* Image block */}
        <div className="mt-10 lg:mt-0 flex justify-center lg:justify-end">
					<img
						src={profilePhoto}
						className="
							w-64 sm:w-80 lg:w-[360px]
							h-64 sm:h-80 lg:h-[360px]
							rounded-full          
							object-cover
							shadow-xl
			           
							hover:grayscale    
							transition-all
						"
						alt="Men haqimda"
					/>
				</div>

      </section>

      {/* PORTFOLIO SECTION */}
      <section className="container max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-20">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center lg:text-left">
          Mening loyihalarim
        </h1>
        <p className="mt-2 text-muted-foreground text-center lg:text-left text-sm sm:text-base">
          Quyida men yaratgan amaliy loyihalar bilan tanishishingiz mumkin.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-10">
          {[
            {
              title: 'Kiberxavfsizlik o‘quv platformasi',
              descr: 'React + Firebase asosida yaratilgan ko‘p funksiyali ta’lim tizimi.',
            },
            {
              title: 'Test yechish tizimi',
              descr: 'Interaktiv testlar, statistikalar va real vaqt natijalari bilan.',
            },
            {
              title: 'Portfolio sayti',
              descr: 'Frontend dasturchi uchun zamonaviy va animatsiyali portfolio.',
            },
						 {
              title: 'E-edu',
							descr: 'Online O\'quv markazi tizimi, O\'quv markazni to\'liq boshqarish mumkin',
            },
						{
              title: 'Santex.uz',
							descr: 'Santexnika do\'konini onlayn boshqarish savdolar, xarajatlar, tushumlar, online savdolarni amalga oshirish',
            },
						{
              title: 'Suvoqava Saraosiyo',
							descr: 'Saraosiyo tumanidagi Suvoqava tashkilotini tizimini avtomatlashtirish to\'lovlar, tushumlar, istemolchilar soni va elektron hisobot va infografikalarni kuzatish',
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="p-6 sm:p-8 relative cursor-pointer group hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <h3 className="text-lg sm:text-xl font-semibold">{item.title}</h3>
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
          ))}
        </div>
      </section>
    </>
  )
}

export default About
