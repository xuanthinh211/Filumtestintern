import React, { useState } from "react";
import "../styles/QuestionCard.css";
import { useNavigate } from "react-router-dom";

function QuestionCard({ question, currentQuestion, totalQuestions, onPrevious, onNext }) {
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setAnswers({
      ...answers,
      [currentQuestion]: option.score
    });
  };

  const handleNext = () => {
    if (currentQuestion === totalQuestions) {
      // Calculate total score
      const totalScore = Object.values(answers).reduce((acc, score) => acc + score, 0);

      // Determine maturity level based on total score
      let maturityLevel = "Sơ khai";
      if (totalScore >= 2 && totalScore < 4) maturityLevel = "Thành lập";
      else if (totalScore >= 4 && totalScore < 6) maturityLevel = "Vận hành";
      else if (totalScore >= 6 && totalScore < 8) maturityLevel = "Tối ưu";
      else if (totalScore >= 8) maturityLevel = "Thấm nhuần";

      // Create result object
      const result = {
        totalScore,
        maturityLevel
      };

      // Convert result to JSON and create a blob
      const resultJson = JSON.stringify(result, null, 2);
      const blob = new Blob([resultJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      // Create a link to download the file
      const a = document.createElement('a');
      a.href = url;
      a.download = 'result.json';
      a.click();

      // Navigate to results page or show results
      navigate("/results");
    } else {
      onNext();
    }
  };

  const homePrevious = () => {
    navigate("/GuideAnswer");
  };

  return (
    <div className="question-card">
      <h2 className="title">ĐÁNH GIÁ MỨC ĐỘ TRƯỞNG THÀNH VỀ QUẢN TRỊ TRẢI NGHIỆM KHÁCH HÀNG</h2>
      <div className="question-content">
        <p className="question-number">Câu hỏi {currentQuestion}/{totalQuestions}</p>
        <h3 className="question-text">{question.title}</h3>
        <div className="options">
          {question.options.map((option, index) => (
            <button
              key={index}
              className="option-button"
              onClick={() => handleOptionClick(option)}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>

      <div className="navigation-buttons">
        {currentQuestion === 1 ? (
          <button className="home-back-button" onClick={homePrevious}>Quay lại</button>
        ) : (
          <button className="nav-button back-button" onClick={onPrevious}>Quay lại</button>
        )}
        <button className="nav-button next-button" onClick={handleNext}>Tiếp theo</button>
      </div>
    </div>
  );
}

export default QuestionCard;
