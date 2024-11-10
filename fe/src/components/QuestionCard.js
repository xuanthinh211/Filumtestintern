import React, { useState } from "react";
import "../styles/QuestionCard.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function QuestionCard({ question, currentQuestion, totalQuestions, onPrevious, onNext }) {
  const [answers, setAnswers] = useState({});
  const [selectedOptions, setSelectedOptions] = useState({});
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    setAnswers({
      ...answers,
      [currentQuestion]: option.score
    });
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestion]: option.text
    });
  };

  const handleNext = async () => {
    if (!selectedOptions[currentQuestion]) {
      alert("Please select an option before proceeding.");
      return;
    }

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

      // Send result to server
      try {
        console.log('Sending result:', result); // Log result
        await axios.post('http://localhost:5000/save-result', result);
        console.log('Result sent successfully'); // Log success
        navigate("/SpeedometerChart"); // Navigate to SpeedometerChart page
      } catch (error) {
        console.error('Error saving result:', error); // Log error
      }
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
              className={`option-button ${selectedOptions[currentQuestion] === option.text ? 'selected' : ''}`}
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
        <button className="nav-button next-button" onClick={handleNext}>
          {currentQuestion === totalQuestions ? "Hoàn thành" : "Tiếp theo"}
        </button>
      </div>
    </div>
  );
}

export default QuestionCard;
