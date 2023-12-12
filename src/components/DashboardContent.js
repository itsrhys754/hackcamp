// DashboardContent.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CSVLink } from 'react-csv';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Button } from 'react-bootstrap';
import { awsData, azureData } from './ChartData'; // Updated import statement

function DashboardContent() {
  const [selectedProvider, setSelectedProvider] = useState('aws');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const data = selectedProvider === 'aws' ? awsData : azureData;

  const filteredData = data.filter(
    (entry) => (!startDate || new Date(entry.date) >= startDate) && (!endDate || new Date(entry.date) <= endDate)
  );

  const totalCO2Emissions = filteredData.reduce((total, entry) => total + entry.co2Emissions, 0);

  const handleZoomChange = (range) => {
    // Handle zoom change if needed
    console.log('Zoom Range:', range);
  };

  const headers = [
    { label: 'Date', key: 'date' },
    { label: 'CO2 Emissions', key: 'co2Emissions' },
  ];

  return (
    <div className="container">
      <h2>CO2 Emissions Dashboard</h2>

      {/* Dropdown for selecting cloud provider */}
      <div className="mb-3">
        <label className="mr-2">Select Cloud Provider: </label>
        <Dropdown onSelect={(eventKey) => setSelectedProvider(eventKey)}>
          <Dropdown.Toggle variant="primary">
            {selectedProvider === 'aws' ? 'AWS' : 'Azure'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="aws">AWS</Dropdown.Item>
            <Dropdown.Item eventKey="azure">Azure</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {/* Date Range Picker */}
      <div className="mb-3">
        <label className="mr-2">Date Range: </label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
      </div>

      {/* Export Button */}
      <CSVLink data={filteredData} headers={headers} filename={'CO2_Emissions_Data.csv'}>
        <Button variant="success">Export Data</Button>
      </CSVLink>

      {/* Chart based on selected cloud provider */}
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
      <div className="mt-3">
        <h3>Total CO2 Emissions: {totalCO2Emissions}</h3>
      </div>
    </div>
  );
}

DashboardContent.propTypes = {
  data: PropTypes.shape({
    awsData: PropTypes.arrayOf(PropTypes.object),
    azureData: PropTypes.arrayOf(PropTypes.object),
  }),
  loading: PropTypes.bool,
  error: PropTypes.string,
};

export default DashboardContent;
