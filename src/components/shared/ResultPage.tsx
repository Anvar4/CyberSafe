import { Button } from "@/components/ui/button";

interface ResultPageProps {
  result: {
    total: number;
    correctCount: number;
    percent: number;
    mistakes: any[];
  };
  onViewMistakes: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ result, onViewMistakes }) => {
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
          onClick={onViewMistakes}
          className="w-full bg-primary text-white py-3 text-sm sm:text-base rounded-lg hover:bg-primary/90"
        >
          Xatolarni ko‘rish
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;
