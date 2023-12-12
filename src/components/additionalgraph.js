// AdditionalGraph.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function AdditionalGraph({ additionalData }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={additionalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="someData" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default AdditionalGraph;
