// DashboardContent.js
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';
import { awsData, azureData } from './ChartData';

function DashboardContent() {
  const [selectedProvider, setSelectedProvider] = useState('aws');
  const data = selectedProvider === 'aws' ? awsData : azureData;

  const totalCO2Emissions = data.reduce((total, entry) => total + entry.co2Emissions, 0);

  const handleZoomChange = (range) => {
    // Handle zoom change if needed
    console.log('Zoom Range:', range);
  };

  return (
    <div>
      <h2>CO2 Emissions Dashboard</h2>

      {/* Dropdown for selecting cloud provider */}
      <div>
        <label>Select Cloud Provider: </label>
        <select value={selectedProvider} onChange={(e) => setSelectedProvider(e.target.value)}>
          <option value="aws">AWS</option>
          <option value="azure">Azure</option>
        </select>
      </div>

      {/* Chart based on selected cloud provider */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="co2Emissions" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Brush dataKey="date" height={30} stroke="#8884d8" onChange={handleZoomChange} />
        </AreaChart>
      </ResponsiveContainer>

      {/* Display total CO2 emissions */}
      <div>
        <h3>Total CO2 Emissions: {totalCO2Emissions}</h3>
      </div>
    </div>
  );
}

export default DashboardContent;
