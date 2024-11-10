import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WelcomeScreen.css";

function WelcomeScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/GuideAnswer");
  };

  return (
    <div className="welcome-screen">
      <h2 className="welcome-title">ĐÁNH GIÁ MỨC ĐỘ TRƯỞNG THÀNH VỀ QUẢN TRỊ TRẢI NGHIỆM KHÁCH HÀNG</h2>
      <h3 className="welcome-question">Công ty bạn trưởng thành như thế nào trong việc lắng nghe khách hàng?</h3>
      <p className="welcome-description">
        Đánh giá khả năng của bạn trong việc lắng nghe, hiểu và đáp ứng các tín hiệu từ khách hàng.
      </p>
      <input
        type="email"
        placeholder="Địa chỉ email của bạn"
        className="email-input"
      />
      <button className="start-button" onClick={handleStart}>
        Bắt đầu <span role="img" aria-label="rocket">🚀</span>
      </button>
    </div>
  );
}

export default WelcomeScreen;
