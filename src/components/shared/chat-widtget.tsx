import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaQuestion } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { q: "Saytga qanday kiraman?", a: "Saytga kirish uchun 'Login' tugmasini bosing va hisobingiz bilan tizimga kiring." },
  { q: "Parolimni unutdim, nima qilay?", a: "Parolni tiklash uchun 'Forgot password?' havolasini bosing va elektron pochtangizni kiriting." },
  { q: "Hisob ochish bepulmi?", a: "Ha, hisob ochish mutlaqo bepul!" },
  { q: "Mobil qurilmada ishlaydimi?", a: "Ha, sayt to‘liq responsiv va barcha qurilmalarda ishlaydi." },
  { q: "Dark rejimni yoqish mumkinmi?", a: "Ha, yuqori o‘ng burchakdagi oy belgisini bosib yoqishingiz mumkin." },
  { q: "Ma’lumotlarim xavfsizmi?", a: "Ha, barcha ma’lumotlarimiz Firebase orqali shifrlanadi." },
  { q: "Qo‘llab-quvvatlash bilan qanday bog‘lanaman?", a: "Pastdagi 'Aloqa' bo‘limiga kirib, murojaat shaklini to‘ldiring." },
  { q: "Saytni kim yaratgan?", a: "Ushbu sayt Anvar tomonidan ishlab chiqilgan." },
];

const FAQWidget = () => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleOpen = () => setOpen(!open);
  const toggleQuestion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* ? tugmasi */}
      <Button
        onClick={toggleOpen}
        size="icon"
        className="rounded-full h-12 w-12 sm:h-14 sm:w-14 shadow-lg bg-primary text-white hover:bg-primary/90"
      >
        <FaQuestion size={22} />
      </Button>

      {/* Modal / FAQ oynasi */}
      {open && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 flex items-center sm:items-end justify-center sm:justify-end z-[60]">
          <div className="bg-black/40 backdrop-blur-sm absolute inset-0 sm:hidden" onClick={toggleOpen}></div>

          <Card
            className="
              w-[90%] max-w-sm sm:w-[350px] sm:max-w-[400px]
              h-[80vh] sm:h-[500px]
              mt-0 sm:mt-4 shadow-2xl flex flex-col rounded-2xl
              bg-white dark:bg-gray-900 relative z-50
              animate-in fade-in zoom-in-75
            "
          >
            {/* Header */}
            <CardHeader className="font-bold text-base sm:text-lg flex justify-between items-center sticky top-0 bg-white dark:bg-gray-900 z-10 border-b border-gray-200 dark:border-gray-700">
              <span>❓ Eng ko‘p beriladigan savollar</span>
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleOpen}
                className="text-muted-foreground hover:text-destructive"
              >
                ✕
              </Button>
            </CardHeader>

            {/* FAQ ro‘yxati */}
            <CardContent className="overflow-y-auto space-y-3 px-2 sm:px-4 py-3">
              {faqs.map((item, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-3 hover:bg-muted transition cursor-pointer"
                  onClick={() => toggleQuestion(idx)}
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm sm:text-base">{item.q}</p>
                    {activeIndex === idx ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </div>
                  {activeIndex === idx && (
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                      {item.a}
                    </p>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FAQWidget;
