import { useState } from "react"
import { Button } from "@/components/ui/button"
import lessonsData from "../../public/data/lesson.json"

const Videodarslar = () => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const currentLesson = lessonsData[currentLessonIndex]

  const handleNextLesson = () => {
    if (currentLessonIndex < lessonsData.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
    }
  }

  const handleSelectLesson = (index: number) => {
    setCurrentLessonIndex(index)
  }

  return (
    <section className="w-full min-h-screen flex flex-col lg:flex-row max-w-7xl mx-auto mt-4 sm:mt-6 p-3 sm:p-4 gap-4 sm:gap-6">
      {/* CHAP PANEL (darslar ro‘yxati) */}
      <div className="w-full lg:w-1/4 bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 rounded-lg h-auto lg:h-[130vh] overflow-y-auto shadow-sm">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-center text-gray-900 dark:text-gray-100">
           Video Darslar
        </h2>

        <ul className="space-y-1 sm:space-y-2">
          {lessonsData.map((lesson, idx) => (
            <li key={lesson.id}>
              <button
                className={`w-full text-left px-2 sm:px-3 py-2 rounded-md text-sm sm:text-base transition-all duration-200 ${
                  idx === currentLessonIndex
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-800 dark:text-gray-200 hover:bg-primary/20 dark:hover:bg-primary/30"
                }`}
                onClick={() => handleSelectLesson(idx)}
              >
                {lesson.id}. {lesson.title}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* O‘NG PANEL (video + tavsif) */}
      <div className="flex-1 flex flex-col gap-3 sm:gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 leading-snug text-center lg:text-left">
          {currentLesson.title}
        </h1>

        <p className="text-gray-700 dark:text-gray-300 text-justify text-sm sm:text-base leading-relaxed px-1 sm:px-0">
          {currentLesson.description}
        </p>

        {/* YouTube video */}
        <div className="relative w-full pt-[56.25%] rounded-lg overflow-hidden shadow-md">
          <iframe
            src={currentLesson.youtubeLink}
            title={currentLesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>

        {/* Tugmalar */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 mb-20 sm:mb-10">
          <Button
            onClick={handlePrevLesson}
            disabled={currentLessonIndex === 0}
            className="bg-primary text-white hover:bg-primary/90 px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
          >
            ⬅️ Oldingi dars
          </Button>

          <Button
            onClick={handleNextLesson}
            disabled={currentLessonIndex === lessonsData.length - 1}
            className="bg-primary text-white hover:bg-primary/90 px-5 sm:px-6 py-2 sm:py-3 text-sm sm:text-base w-full sm:w-auto"
          >
            Keyingi dars ➡️
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Videodarslar
