/* global FB */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactSpeedometer from 'react-d3-speedometer';
import "../styles/SpeedometerChart.css"
const levels = [
  {
    level: 1,
    icon: "https://assets.filum.ai/assessments/voc-level1.svg",
    name: "Sơ khai",
    range: [0, 2],
    description: "Nguồn dữ liệu chính về phản hồi khách hàng đến từ các khảo sát theo năm hoặc không đều đặn. Các cuộc khảo sát được thực hiện độc lập bởi các phòng ban khác nhau mà không có sự chia sẻ kết quả và không lưu trữ tập trung. Hiếm khi thu thập phản hồi gián tiếp (từ bản ghi cuộc gọi, tin nhắn, bình luận v.v) hoặc phản hồi được suy luận từ hành vi, tần suất hay thói quen mua hàng của khách. Các quyết định từ đó kém hiệu quả khi dựa nhiều vào phản hồi đã cũ và không đáng tin cậy.",
    key_actions: [
      "Hình thành một đội nhóm liên phòng ban để quản lý quy trình thu thập và phân tích phản hồi khách hàng.",
      "Định kỳ tổ chức phỏng vấn khách hàng để thu thập thông tin chi tiết.",
      "Xây dựng cơ sở dữ liệu tập trung lưu trữ phản hồi khách hàng.",
      "Xác định và thực hiện phân tích nguyên nhân gốc rễ từ phản hồi khách hàng.",
      "Tạo ra cơ chế thông báo kết quả phản hồi cho các đại diện phòng ban liên quan."
    ]
  },
  {
    level: 2,
    icon: "https://assets.filum.ai/assessments/voc-level2.svg",
    name: "Thành lập",
    range: [2, 4],
    description: "Có đội nhóm liên phòng ban để đánh giá và điều phối việc thu thập phản hồi, phân tích nguyên nhân gốc rễ và thông báo kết quả đến các đại diện. Bước đầu quản trị năng lực Lắng nghe khách hàng để giải quyết vấn đề phân mảnh và thiếu phối hợp, tuy nhiên vấn đề thực thi còn yếu. Bắt đầu có các cuộc khảo sát tại điểm chạm nhưng chưa phải tất cả các điểm chạm quan trọng.",
    key_actions: [
      "Xây dựng một hệ thống thu thập phản hồi và lắng nghe khách hàng hiệu quả.",
      "Đảm bảo tích hợp dữ liệu phản hồi trực tiếp và gián tiếp từ nhiều nguồn khác nhau.",
      "Thực hiện quy trình đóng vòng phản hồi để xử lý các khiếu nại và vấn đề của khách hàng.",
      "Mở rộng việc thực hiện khảo sát tại tất cả các điểm chạm quan trọng, xuyên suốt các giai đoạn của hành trình khách hàng.",
      "Phát triển các tiêu chí và chỉ số để đo lường hiệu quả của việc Lắng nghe khách hàng."
    ]
  },
  {
    level: 3,
    icon: "https://assets.filum.ai/assessments/voc-level3.svg",
    name: "Vận hành",
    range: [4, 6],
    description: "Quản trị năng lực Lắng nghe khách hàng đã hình thành và đem lại hiệu quả. Dữ liệu phản hồi trực tiếp từ khách hàng được kết hợp với dữ liệu từ các nguồn khác (Ví dụ: từ điểm chạm web, cửa hàng, v.v.) và phản hồi gián tiếp (Ví dụ: bản ghi cuộc gọi, tin nhắn, bình luận mạng xã hội v.v). Quy trình đóng vòng phản hồi giúp xác định và giải quyết các khiếu nại hoặc vấn đề khách hàng gặp phải. Phản hồi được thu thập trong nhiều giai đoạn của hành trình khách hàng.",
    key_actions: [
      "Xây dựng năng lực Lắng nghe khách hàng tập trung trên một nền tảng, với quy trình và quy định rõ ràng về trách nhiệm và thực thi.",
      "Ban hành các quy trình, biểu mẫu về Lắng nghe khách hàng rộng rãi cho toàn thể công ty.",
      "Tạo ra các báo cáo và bảng điều khiển với dữ liệu phản hồi theo thời gian thực cho nhân viên và phòng ban.",
      "Tích hợp phản hồi khách hàng vào các ứng dụng quan trọng như CRM, giúp ích vào hoạt động hằng ngày của nhân viên."
    ]
  },
  {
    level: 4,
    icon: "https://assets.filum.ai/assessments/voc-level4.svg",
    name: "Tối ưu",
    range: [6, 8],
    description: "Năng lực Lắng nghe khách hàng hoạt động đầy đủ trên một nền tảng duy nhất với quy định về trách nhiệm và thực thi rõ ràng. Các quy trình làm việc, báo cáo và phân tích được thông báo đầy đủ và tường minh, cung cấp dữ liệu thời gian thực, phù hợp cho từng nhân viên và phòng ban. Thông tin về phản hồi được tích hợp vào các ứng dụng quan trọng và phổ biến như CRM.",
    key_actions: [
      "Ứng dụng công nghệ tự động dựa trên dữ liệu lớn và AI giúp phân tch và đưa ra hành động khuyến nghị từ phản hồi khách hàng.",
      "Định lượng giá trị của Lắng nghe khách hàng thông qua kết nối các hành động khuyến nghị và kết quả thu được lên các chỉ số liên quan đến vận hành và khách hàng.",
      "Xây dựng cơ chế cho việc thu thập ý kiến phản hồi từ nhân viên nhằm cải thiện trải nghiệm khách hàng.",
      "Tổ chức đều đặn các hoạt động khuyến khích nhân viên tham gia đóng góp ý kiến để cải thiện trải nghiệm khách hàng."
    ]
  },
  {
    level: 5,
    icon: "https://assets.filum.ai/assessments/voc-level5.svg",
    name: "Thấm nhuần",
    range: [8, 11],
    description: "Hiệu quả của Lắng nghe khách hàng được định lượng bằng việc kết nối các hành động đề xuất với kết quả thu được lên các chỉ số liên quan đến vận hành và khách hàng. Có cơ chế liên tục để thu thập ý kiến phản hồi từ nhân viên nhằm cải thiện trải nghiệm khách hàng.",
    key_actions: [
      "Duy trì một hệ thống Lắng nghe khách hàng đồng nhất và liên tục.",
      "Đầu tư vào công nghệ và công cụ hiện đại về dữ liệu lớn và AI để hỗ trợ việc ra quyết định hiệu quả hơn.",
      "Tạo dựng văn hóa doanh nghiệp tập trung vào cải tiến liên tục trải nghiệm khách hàng.",
      "Phát triển các chương trình đào tạo và huấn luyện nhằm nâng cao nhận thức về năng lực Lắng nghe khách hàng cho nhân viên.",
      "Duy trì cơ chế liên tục thu thập ý kiến phản hồi từ nhân viên và khuyến khích sự đóng góp của họ vào việc cải thiện trải nghiệm khách hàng."
    ]
  }
];

const images = {
  "Sơ khai": "/thumbnails/level_1.png",
  "Thành lập": "/thumbnails/level_2.png",
  "Vận hành": "/thumbnails/level_3.png",
  "Tối ưu": "/thumbnails/level_4.png",
  "Thấm nhuần": "/thumbnails/level_5.png"
};

const SpeedometerChart = () => {
  const [result, setResult] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [emails, setEmails] = useState([]);
  const [copyButtonText, setCopyButtonText] = useState('Sao chép đường dẫn liên kết');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get('http://localhost:5000/result.json');
        setResult(response.data);
      } catch (error) {
        console.error('Error fetching result:', error);
      }
    };

    fetchResult();
  }, []);

  useEffect(() => {
    window.fbAsyncInit = function() {
      FB.init({
        appId: 'your-app-id', // Replace with your Facebook app ID
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v14.0' // Ensure this matches the version you are using
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const handleShare = () => {
    setShowShareModal(true);
  };

  const levelMapping = {
    "Sơ khai": 1,
    "Thành lập": 2,
    "Vận hành": 3,
    "Tối ưu": 4,
    "Thấm nhuần": 5
  };

  const handleDownload = () => {
    const { maturityLevel } = result;
    const levelNumber = levelMapping[maturityLevel];
    const imageUrl = images[maturityLevel];
    const element = document.createElement("a");
    element.href = imageUrl;
    element.download = `level_${levelNumber}.png`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleReload = () => {
    window.location.reload();
  };

  const handleCloseModal = () => {
    setShowShareModal(false);
    setShowEmailForm(false);
  };

  const handleEmailShare = () => {
    setShowEmailForm(true);
  };

  const handleAddEmail = (newEmail) => {
    setEmails([...emails, newEmail]);
  };

  const handleDeleteEmail = (index) => {
    setEmails(emails.filter((_, i) => i !== index));
  };

  const handleSendEmail = () => {
    alert(`Emails đã được gửi đến: ${emails.join(', ')}`);
    setShowEmailForm(false);
    setShowShareModal(false);
  };

  const handleFacebookShare = () => {
    const { maturityLevel } = result;
    const imageUrl = images[maturityLevel];

    FB.ui({
      method: 'share',
      href: 'http://localhost:3000', // Replace with your localhost URL
      hashtag: '#YourHashtag',
      quote: 'Check out my maturity level!',
      picture: `http://localhost:3000${imageUrl}` // Replace with the correct path to your images
    }, function(response){});
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopyButtonText('Đã sao chép');
        setTimeout(() => setCopyButtonText('Sao chép đường dẫn liên kết'), 2000); // Reset after 2 seconds
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  if (!result) {
    return <div>Loading...</div>;
  }

  const { totalScore, maturityLevel } = result;
  const levelInfo = levels.find(level => level.name === maturityLevel);

  return (
    <div className='chart-container'>
      <div className='chart-box'>
        <h2>Kết quả đánh giá</h2>
        <div className='chart-result'>
          {levelInfo && (
            <div className="level-info">
              <div className="chart-result-name">
                <img src={levelInfo.icon} alt={levelInfo.name} />
                <h3>{levelInfo.name}</h3>
              </div>
              <div className='chart-desc'>
                <p>{levelInfo.description}</p>
                <h4>Hành động chính:</h4>
              </div>
              <div className='chart-desc'>
                <ul>
                  {levelInfo.key_actions.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <ReactSpeedometer
          value={totalScore}
          minValue={0}
          maxValue={10}
          segments={5}
          segmentColors={['#d9534f', '#f0ad4e', '#5bc0de', '#5cb85c', '#337ab7']}
          needleColor="red"
          textColor="white"
        />
      </div>
      <div className='button-container'>
        <button className='action-button' onClick={handleShare}>Share</button>
        <button className='action-button' onClick={handleDownload}>Download</button>
        <button className='action-button' onClick={handleReload}>Reload</button>
      </div>

      {showShareModal && (
        <div className='modal'>
          <div className='modal-content'>
            {showEmailForm ? (
              <>
                <h3>Vui lòng cung cấp địa chỉ qua email mà bạn muốn chia sẻ kết quả:</h3>
                <ul className='email-list'>
                  {emails.map((email, index) => (
                    <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{email}</span>
                      <button onClick={() => handleDeleteEmail(index)}>Xóa</button>
                    </li>
                  ))}
                </ul>
                <input
                  type="email"
                  placeholder="Địa chỉ email"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddEmail(e.target.value);
                      e.target.value = ''; // Clear input after adding
                    }
                  }}
                  className='email-input-share'
                  style={{ height: `20%` }} // Adjust height based on number of emails
                />
                <div className='modal-buttons'>
                  <button className='modal-button' onClick={() => setShowEmailForm(false)}>Quay lại</button>
                  <button className='modal-button' onClick={handleSendEmail}>Gửi email</button>
                </div>
              </>
            ) : (
              <>
                <h3>Đây là một số cách bạn có thể chia sẻ với bạn bè và đồng nghiệp của mình:</h3>
                <button className='modal-button' onClick={handleFacebookShare}>Chia sẻ qua Facebook</button>
                <button className='modal-button' onClick={handleEmailShare}>Chia sẻ qua Email</button>
                <button className='modal-button' onClick={handleCopyLink}>{copyButtonText}</button>
                <button className='modal-button' onClick={handleCloseModal}>Huỷ</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeedometerChart;