import React from "react";
import "../styles/QuestionCard.css";
import { useNavigate } from "react-router-dom";

function QuestionCard({ question, currentQuestion, totalQuestions, onPrevious, onNext }) {

    const navigate = useNavigate();
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
            <button key={index} className="option-button">
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
        <button className="nav-button next-button" onClick={onNext}>Tiếp theo</button>
      </div>
    </div>
  );
}

export default QuestionCard;
