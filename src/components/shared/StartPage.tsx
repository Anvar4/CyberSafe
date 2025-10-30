import { Button } from "@/components/ui/button";

interface StartPageProps {
  onStart: () => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        <span className="text-primary">Internet</span>{" "}
        <span className="text-gray-900 dark:text-gray-100">xavfsizligi testi</span>
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl">
        20 ta test savolidan iborat. Sizga <span className="font-semibold">30 daqiqa</span> beriladi.
      </p>

      <Button
        onClick={onStart}
        className="bg-primary text-white text-sm sm:text-base px-6 sm:px-8 py-3 rounded-lg hover:bg-primary/90 transition w-full max-w-xs"
      >
        Testni boshlash
      </Button>
    </div>
  );
};

export default StartPage;
