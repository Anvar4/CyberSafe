import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Mistake {
  question: string;
  chosen: { option: string; text: string };
  correct: { option: string; text: string };
}

interface ResultPageProps {
  result: {
    total: number;
    correctCount: number;
    percent: number;
    mistakes: Mistake[];
  };
  onViewMistakes?: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ result, onViewMistakes }) => {
  const [showMistakes, setShowMistakes] = useState(false);

  const handleView = () => {
    setShowMistakes((s) => !s);
    if (onViewMistakes) onViewMistakes();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Test natijasi
      </h2>

      <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-xl shadow p-6">
        <p className="text-base sm:text-lg mb-2 text-gray-800 dark:text-gray-200">
          To‘g‘ri javoblar:{" "}
          <span className="font-semibold text-primary">
            {result.correctCount} / {result.total}
          </span>
        </p>
        <p className="text-base sm:text-lg mb-6 text-gray-800 dark:text-gray-200">
          Foiz:{" "}
          <span
            className={`font-bold ${
              result.percent >= 70
                ? "text-green-500"
                : result.percent >= 40
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            {result.percent}%
          </span>
        </p>

        <Button
          onClick={handleView}
          className="w-full bg-primary text-white py-3 text-sm sm:text-base rounded-lg hover:bg-primary/90"
        >
          {showMistakes ? "Xatolarni yashirish" : "Xatolarni ko‘rish"}
        </Button>
      </div>

      {showMistakes && (
        <div className="w-full max-w-3xl mt-6 p-4 bg-white dark:bg-gray-900 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
            Xatolar tafsiloti ({result.mistakes.length})
          </h3>

          {result.mistakes.length === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Ajoyib — xatolar yo‘q!
            </p>
          ) : (
            <ul className="space-y-4">
              {result.mistakes.map((m: Mistake, idx: number) => (
                <li
                  key={idx}
                  className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 text-left"
                >
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                    <span className="font-medium">Savol {idx + 1}:</span>{" "}
                    {m.question}
                  </p>

                  <p className="text-sm mb-1">
                    <span className="font-medium">Sizning javob:</span>{" "}
                    <span className="px-2 py-1 rounded text-sm bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300">
                      {m.chosen.option}) {m.chosen.text}
                    </span>
                  </p>

                  <p className="text-sm">
                    <span className="font-medium">To‘g‘ri javob:</span>{" "}
                    <span className="px-2 py-1 rounded text-sm bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                      {m.correct.option}) {m.correct.text}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultPage;
