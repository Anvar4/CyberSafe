import { useEffect, useState } from "react";
import testsData from "../../data/tests.json";
import { Button } from "@/components/ui/button";

interface TestPageProps {
  onFinish: (result: {
    total: number;
    correctCount: number;
    percent: number;
    mistakes: any[];
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
  const [timer, setTimer] = useState(1800); // 30 daqiqa

  useEffect(() => {
    const shuffled = [...testsData].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 20));
  }, []);

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
    setCurrent((prev) => prev + 1);
  };

  const handleFinish = () => {
    const total = questions.length;
    let correctCount = 0;
    let mistakes: any[] = [];

    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correctCount++;
      else mistakes.push({ ...q, yourAnswer: answers[idx] || "Hech biri" });
    });

    const percent = Math.round((correctCount / total) * 100);
    onFinish({ total, correctCount, percent, mistakes });
  };

  if (!questions.length)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-lg text-gray-600 dark:text-gray-300">
        Yuklanmoqda...
      </div>
    );

  if (current >= questions.length)
    return (
      <div className="flex justify-center items-center min-h-[60vh] text-lg font-semibold text-gray-800 dark:text-gray-200">
        Test tugadi...
      </div>
    );

  const q = questions[current];
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2 text-sm sm:text-base">
        <span className="font-medium text-gray-700 dark:text-gray-300">
          Savol {current + 1}/{questions.length}
        </span>
        <span className="font-semibold text-primary">
          Vaqt: {minutes}:{seconds.toString().padStart(2, "0")}
        </span>
      </div>

      {/* Question */}
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100 text-center sm:text-left">
        {q.question}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {Object.entries(q.options).map(([key, text]) => (
          <Button
            key={key}
            onClick={() => handleSelect(key)}
            className="text-lft w-full py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base font-normal
                       border border-gray-300 dark:border-gray-700 rounded-lg "
          >
            {key}. {text}
          </Button>
        ))}
      </div>

      {/* Finish button */}
      <div className="flex justify-center sm:justify-end mt-6">
        <Button
          onClick={handleFinish}
          className="bg-red-500 text-white px-6 sm:px-8 py-3 rounded-lg text-sm sm:text-base
                     hover:bg-red-600 transition-all duration-200"
        >
          Testni yakunlash
        </Button>
      </div>
    </div>
  );
};

export default TestPage;
