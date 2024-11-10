/* global FB */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactSpeedometer from 'react-d3-speedometer';
import "../styles/SpeedometerChart.css";
import assessmentData from '../data/assessment.json';

const SpeedometerChart = () => {
  const [result, setResult] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [email, setEmail] = useState('');

  const getMaturityLevelDetails = (score) => {
    return assessmentData.results.find(result => score >= result.range[0] && score < result.range[1]);
  };

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get('https://filumtestinternbe.vercel.app/result.json');
        console.log('Fetched result:', response.data); // Log dữ liệu nhận được
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

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(result, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = "result.json";
    document.body.appendChild(element);
    element.click();
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

  const handleSendEmail = () => {
    alert(`Email đã được gửi đến: ${email}`);
    setShowEmailForm(false);
    setShowShareModal(false);
  };

  const handleFacebookShare = () => {
    const { maturityLevel } = result;
    const imageUrl = assessmentData.results.find(level => level.name === maturityLevel).icon;

    FB.ui({
      method: 'share',
      href: 'https://filumtestintern.vercel.app', // Replace with your frontend URL
      hashtag: '#YourHashtag',
      quote: 'Check out my maturity level!',
      picture: imageUrl // Replace with the correct path to your images
    }, function(response){});
  };

  if (!result) {
    return <div>Loading...</div>;
  }

  const { totalScore, maturityLevel } = result;
  const maturityDetails = getMaturityLevelDetails(totalScore);

  return (
    <div className='chart-container'>
      <div className='chart-box'>
        <h2>Kết quả đánh giá</h2>
        <div className='chart-result'>
          {maturityDetails && (
            <div className="level-info">
              <div className="chart-result-name">
                <img src={maturityDetails.icon} alt={maturityDetails.name} />
                <h3>{maturityDetails.name}</h3>
              </div>
              <div className='chart-desc'>
                <p>{maturityDetails.description}</p>
                <h4>Hành động chính:</h4>
              </div>
              <div className='chart-desc'>
                <ul>
                  {maturityDetails.key_actions.map((action, index) => (
                    <li key={index}>{action.text}</li>
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
          needleColor="black"
          textColor="black"
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
                <input
                  type="email"
                  placeholder="Địa chỉ email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='email-input-share'
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
                <button className='modal-button'>Sao chép đường dẫn liên kết</button>
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
