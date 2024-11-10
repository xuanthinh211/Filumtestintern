import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GuideAnswer.css";

function GuideAnswer() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/questions");
  };

  return (
    <div className="welcome-screen">
      <h2 className="welcome-title">ĐÁNH GIÁ MỨC ĐỘ TRƯỞNG THÀNH VỀ QUẢN TRỊ TRẢI NGHIỆM KHÁCH HÀNG</h2>
      <div className="welcome-board" >
        <h3 className="welcome-question">Hướng dẫn trả lời</h3>
        <p className="welcome-description">
        Hãy dựa vào hướng dẫn sau đây để trả lời các câu hỏi:
        </p>
        <p className="welcome-description">
            • Chọn "Có": nếu câu đó phản ánh hiện trạng đang có VÀ được thực hiện một cách nhất quán (ít nhất  80% thời gian)<br/>
            • Chọn "Không có": nếu hoàn toàn chưa từng thực hiện.<br/>
            • Chọn "Không rõ về vấn đề này”: nếu không chắc chân đã thực hiện hay chưa
        </p>
        <button className="start-button" onClick={handleStart}>
            Bắt đầu <span role="img" aria-label="rocket">🚀</span>
        </button>
        </div>
    </div>
  );
}

export default GuideAnswer;
