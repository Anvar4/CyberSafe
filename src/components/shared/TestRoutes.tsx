import { Routes, Route, useNavigate } from "react-router-dom";
import StartPage from "./StartPage";
import TestPage from "./TestPage";
import ResultPage from "./ResultPage";
import MistakePage from "./MistakePage";

interface TestRoutesProps {
  testResult: any;
  mistakes: any[];
  setTestResult: (result: any) => void;
  setMistakes: (mistakes: any[]) => void;
}

const TestRoutes = ({ testResult, mistakes, setTestResult, setMistakes }: TestRoutesProps) => {
  const navigate = useNavigate();

  const handleStart = () => {
    // reset previous result and go to the test
    setTestResult(null);
    setMistakes([]);
    navigate("test");
  };

  const handleFinish = (result: {
    total: number;
    correctCount: number;
    percent: number;
    mistakes: any[];
  }) => {
    setTestResult(result);
    setMistakes(result.mistakes || []);
    navigate("result");
  };

  const handleViewMistakes = () => {
    navigate("mistakes");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Routes>
      <Route index element={<StartPage onStart={handleStart} />} /> {/* /testlar bo'lganda StartPage */}
      <Route path="test" element={<TestPage onFinish={handleFinish} />} />
      <Route path="result" element={<ResultPage result={testResult} onViewMistakes={handleViewMistakes} />} />
      <Route path="mistakes" element={<MistakePage mistakes={mistakes} onBack={handleBack} />} />
    </Routes>
  );
};

export default TestRoutes;
