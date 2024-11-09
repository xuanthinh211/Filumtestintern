import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen";
import GuideAnswer from "./components/GuideAnswer";
import QuestionCard from "./components/QuestionCard";
import data from "./data/assessment.json";


function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    if (currentQuestionIndex < data.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/GuideAnswer" element={<GuideAnswer/>} />
        <Route
          path="/questions"
          element={
            <QuestionCard
              question={data.questions[currentQuestionIndex]}
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={data.questions.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
