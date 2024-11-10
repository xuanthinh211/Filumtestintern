import React, { useState } from "react";
import assessmentData from "../data/assessment.json";
import "../styles/Assessment.css";

function Assessment() {
  const [responses, setResponses] = useState({});
  const [score, setScore] = useState(0);
  const [resultLevel, setResultLevel] = useState(null);

  // Xử lý chọn lựa chọn cho từng câu hỏi
  const handleOptionSelect = (questionId, optionScore) => {
    setResponses({
      ...responses,
      [questionId]: optionScore,
    });
  };

  // Tính toán tổng điểm
  const calculateScore = () => {
    const totalScore = Object.values(responses).reduce((acc, score) => acc + score, 0);
    setScore(totalScore);
    determineLevel(totalScore);
  };

  // Xác định mức độ dựa trên điểm
  const determineLevel = (totalScore) => {
    const level = assessmentData.results.find(
      (result) => totalScore >= result.range[0] && totalScore < result.range[1]
    );
    setResultLevel(level);
  };

  return (
    <div className="assessment-container">
      <h1>{assessmentData.title}</h1>
      {assessmentData.questions.map((question) => (
        <div key={question.id} className="question">
          <h3>{question.title}</h3>
          {question.options.map((option) => (
            <div key={option.id} className="option">
              <label>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.score}
                  onChange={() => handleOptionSelect(question.id, option.score)}
                />
                {option.text}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={calculateScore} className="calculate-button">Xem kết quả</button>

      {resultLevel && (
        <div className="result">
          <h2>Kết quả: {resultLevel.name}</h2>
          <p>{resultLevel.description.text}</p>
          {resultLevel.key_actions.map((action, index) => (
            <p key={index}>{action.text}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default Assessment;
