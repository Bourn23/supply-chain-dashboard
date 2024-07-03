// src/components/AnalyticsCharts.js
import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
`;

const AnalyticsCharts = ({ company, data, chartType }) => {
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        );
      case 'bar':
        return (
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        );
      case 'pie':
        return (
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" fill="#8884d8" />
            <Tooltip />
          </PieChart>
        );
      default:
        return <p>Unsupported chart type</p>;
    }
  };

  return (
    <ChartWrapper>
      <h2>{company} Analytics</h2>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default AnalyticsCharts;