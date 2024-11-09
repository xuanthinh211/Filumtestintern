import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const SpeedometerChart = () => {
  // Define the 5 levels for your speedometer
  const levels = ['Sơ khai', 'Thành lập', 'Vận hành', 'Tối ưu', 'Thấm nhuần'];
  
  // Define the score you want to display (0 - 10)
  const score = 7; // This value should be dynamically set based on your app logic
  
  // Create an array of colors for the levels
  const colors = ['#f44336', '#ff9800', '#4caf50', '#2196f3', '#9c27b0'];

  // Map the score to the corresponding level and angle
  const levelIndex = Math.floor((score / 10) * 5); // Normalize the score to 5 levels
  const levelName = levels[levelIndex];

  // Prepare chart data
  const data = {
    labels: levels,
    datasets: [
      {
        label: 'Mức độ trưởng thành',
        data: [score * 10, 100 - score * 10], // The score determines the portion of the chart
        backgroundColor: [colors[levelIndex], '#e0e0e0'], // Color for the active level, and the rest is gray
        borderWidth: 0, // Remove the border
        borderColor: 'transparent',
      },
    ],
  };

  // Define chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: () => `Mức độ: ${levelName}`, // Display the corresponding level on hover
        },
      },
    },
    rotation: Math.PI, // Rotate the chart to create a "half-circle" effect
    circumference: Math.PI, // Half-circle chart
    cutout: '70%', // Make it look like a gauge
    animation: {
      animateRotate: true,
      duration: 1500,
    },
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h3 style={{ textAlign: 'center' }}>Đánh giá mức độ trưởng thành</h3>
      <Doughnut data={data} options={options} />
      <p style={{ textAlign: 'center', fontWeight: 'bold' }}>{levelName}</p>
    </div>
  );
};

export default SpeedometerChart;
