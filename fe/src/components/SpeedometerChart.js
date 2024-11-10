/* global FB */
import React from 'react';
import { useLocation } from 'react-router-dom';
import ReactSpeedometer from 'react-d3-speedometer';
import "../styles/SpeedometerChart.css";
import assessmentData from '../data/assessment.json';

const SpeedometerChart = () => {
  const location = useLocation();
  const { totalScore, maturityLevel } = location.state || { totalScore: 0, maturityLevel: 'Sơ khai' };

  const getMaturityLevelDetails = (level) => {
    return assessmentData.results.find(result => result.name === level);
  };

  const maturityDetails = getMaturityLevelDetails(maturityLevel);

  return (
    <div className="speedometer-chart">
      <h2>Kết quả đánh giá</h2>
      <ReactSpeedometer
        maxValue={10}
        value={totalScore}
        needleColor="red"
        startColor="green"
        segments={5}
        endColor="blue"
        textColor="#000000"
      />
      <h3>{maturityLevel}</h3>
      <p>{maturityDetails.description}</p>
      <ul>
        {maturityDetails.key_actions.map((action, index) => (
          <li key={index}>{action.text}</li>
        ))}
      </ul>
      <a href={maturityDetails.key_actions_cta.url}>{maturityDetails.key_actions_cta.text}</a>
    </div>
  );
};

export default SpeedometerChart;
