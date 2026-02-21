import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
// import './Charts.css';

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Sales',
      data: [12, 19, 14, 20, 18, 25],
      backgroundColor: '#4f46e5',
    },
  ],
};

export default function Charts() {
  return (
    <div className="chart-container">
      <h3>Sales Report</h3>
      <Bar data={data} />
    </div>
  );
}
