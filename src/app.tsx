import { Routes, Route } from 'react-router-dom';
import ChatWidget from './components/shared/chat-widtget';
import Navbar from './components/shared/navbar';
import Auth from './pages/auth';
import Qollanmalar from './pages/guides';
import Home from './pages/home';
import TestRoutes from './components/shared/TestRoutes';
import { useState } from 'react';
import Videodarslar from './pages/video-lessons';
import Menhaqimda from './pages/about'

const App = () => {
  const [testResult, setTestResult] = useState<any>(null);
  const [mistakes, setMistakes] = useState<any[]>([]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/qollanmalar" element={<Qollanmalar />} />
				<Route path="/videodarslar" element={<Videodarslar />} />
        <Route path="/testlar/*" element={
          <TestRoutes
            testResult={testResult}
            mistakes={mistakes}
            setTestResult={setTestResult}
            setMistakes={setMistakes}
          />
        } />
        <Route path="/menhaqimda" element={<Menhaqimda/>}/>
      </Routes>
      <ChatWidget />
    </>
  )
}

export default App;
