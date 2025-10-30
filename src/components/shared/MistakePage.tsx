import { Button } from "@/components/ui/button";

interface MistakePageProps {
  mistakes: any[];
  onBack: () => void;
}

const MistakePage: React.FC<MistakePageProps> = ({ mistakes, onBack }) => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100 text-center">
          Xatolar
        </h2>

        {/* Xatolar ro‘yxati */}
        <div className="space-y-4 overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
          {mistakes.length > 0 ? (
            mistakes.map((m, i) => (
              <div
                key={i}
                className="p-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
              >
                <p className="font-semibold text-sm sm:text-base">
                  {i + 1}. {m.question}
                </p>
                <p className="text-sm sm:text-base mt-1">
                  <span className="font-medium text-red-500">Sizning javobingiz:</span> {m.yourAnswer}
                </p>
                <p className="text-sm sm:text-base mt-1">
                  <span className="font-medium text-green-600">To‘g‘ri javob:</span> {m.correct}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">Xatolar mavjud emas 🎉</p>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            onClick={onBack}
            className="w-full sm:w-auto bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition"
          >
            Orqaga
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MistakePage;
