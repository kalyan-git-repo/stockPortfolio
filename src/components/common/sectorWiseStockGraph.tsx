'use client'; 

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { sector_wise_summary } from '@/lib/constants';

const MultiLineChart = ({chartData}: any) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={chartData} 
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* Each <Line> component uses a single unique dataKey */}
        <Line type="monotone" dataKey="investment" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="presentValue" stroke="#82ca9d" />
        <Line type="monotone" dataKey="gainorloss" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MultiLineChart;

