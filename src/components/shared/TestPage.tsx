import { useEffect, useState } from "react";
import testsData from "../../data/tests.json";
import testsData1 from "../../data/tests1.json";
import testsData2 from "../../data/tests2.json";
import testsData3 from "../../data/tests3.json";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface TestPageProps {
  onFinish: (result: {
    total: number;
    correctCount: number;
    percent: number;
    mistakes: any[];
    score: number;
  }) => void;
}

interface Test {
  id: number;
  topic: string;
  question: string;
  options: Record<string, string>;
  correct: string;
}

const TestPage: React.FC<TestPageProps> = ({ onFinish }) => {
  const [questions, setQuestions] = useState<Test[]>([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timer, setTimer] = useState(1800); // 30 daqiqa (sekundda)
  const [shuffledOptions, setShuffledOptions] = useState<Record<number, [string, string][]>>({});

  // 🔀 4 ta fayldan random test tanlash
  useEffect(() => {
    const allTests = [...testsData, ...testsData1, ...testsData2, ...testsData3];
    const shuffledTests = allTests.sort(() => Math.random() - 0.5).slice(0, 25);

    // Variantlarni ham aralashtirish
    // Variant matnlarini aralashtirish, lekin A–D harflari joyida qolsin
      const optionsShuffle: Record<number, [string, string][]> = {};
      shuffledTests.forEach((q, index) => {
        const optionKeys = Object.keys(q.options);
        const optionValues = Object.values(q.options).sort(() => Math.random() - 0.5);
        optionsShuffle[index] = optionKeys.map((key, i) => [key, optionValues[i]]);
      });


    setQuestions(shuffledTests);
    setShuffledOptions(optionsShuffle);
  }, []);

  // ⏱ Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [questions]);

  const handleSelect = (option: string) => {
    setAnswers({ ...answers, [current]: option });
  };

  const handleFinish = () => {
    const total = questions.length;
    let correctCount = 0;
    let mistakes: any[] = [];

    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correctCount++;
      else mistakes.push({ ...q, yourAnswer: answers[idx] || "Belgilanmagan" });
    });

    const percent = Math.round((correctCount / total) * 100);
    const score = correctCount * 100;
    onFinish({ total, correctCount, percent, mistakes, score });
  };

  if (!questions.length)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-lg text-gray-600 dark:text-gray-300">
        Yuklanmoqda...
      </div>
    );

  const q = questions[current];
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  const progressPercent = Math.round((Object.keys(answers).length / questions.length) * 100);

  // ✅ To‘g‘ri javoblar soni (real vaqt)
  const correctLiveCount = questions.reduce((acc, q, idx) => {
    if (answers[idx] === q.correct) return acc + 1;
    return acc;
  }, 0);

  return (
    // Maxsus orqa fonni olib tashladim, shunda component o'z konteynerining rangiga moslashadi
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between  mb-6 gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <span className="font-medium text-gray-700 dark:text-gray-300">
          Savol {current + 1}/{questions.length}
        </span>
        <span className="font-semibold text-blue-600 dark:text-blue-400 text-lg">
           {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <Progress value={progressPercent} className="h-3 bg-gray-200 dark:bg-gray-700" />
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mt-2">
          <span>{progressPercent}% bajarildi</span>
        </div>
      </div>

      {/* Savol navigatsiyasi */}
      <div className="p-4 bg-black dark:bg-gray-800 rounded-xl shadow-lg mb-6">
        <div className="flex flex-wrap justify-center gap-2">
          {questions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full text-sm sm:text-base font-semibold transition-all shadow-md
              ${answers[index]
                // Javob berilgan
                ? "bg-green-500 text-white hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600"
                : index === current
                // Hozirgi savol
                ? "bg-blue-600 text-white scale-105 shadow-blue-500/50 dark:bg-blue-400 dark:text-gray-900"
                // Boshqa savollar
                : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question Card */}
      <div className="p-6 bg-blue-600 dark:bg-gray-900 rounded-xl shadow-2xl mb-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white dark:text-gray-100 text-center leading-snug">
          {q.question}
        </h2>
      </div>


      {/* Options */}
      <div className="flex flex-col gap-4">
        {shuffledOptions[current]?.map(([key, text]) => (
          <Button
            key={key}
            onClick={() => handleSelect(key)}
            variant="outline"
            className={`w-full text-left justify-start whitespace-normal h-auto py-3 px-4 rounded-xl border-2 transition-all shadow-md
                    ${answers[current] === key
                    // Tanlangan variant
                    ? "border-blue-600 bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-200"
                    // Tanlanmagan variant
                    : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"}
                    `}
          >
            <span className="font-semibold mr-3 w-5 flex-shrink-0 text-center">{key}.</span> 
            <p className="flex-1">{text}</p>
          </Button>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between items-center mt-8">
        <Button
          onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}
          disabled={current === 0}
          variant="outline"
          className="text-sm sm:text-base border-gray-400 dark:border-gray-600 dark:text-gray-300"
        >
          ⬅ Oldingi
        </Button>

        {current < questions.length - 1 ? (
          <Button
            onClick={() => setCurrent((prev) => prev + 1)}
            // Keyingi tugmasiga ham asosiy rang berildi
            className="text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Keyingi ➡
          </Button>
        ) : (
          <Button
            onClick={handleFinish}
            // Yakunlash tugmasi qizil rangda, diqqatni jalb qilish uchun
            className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base dark:bg-red-500 dark:hover:bg-red-600"
          >
            Testni yakunlash
          </Button>
        )}
      </div>
    </div>
  );
};

export default TestPage;