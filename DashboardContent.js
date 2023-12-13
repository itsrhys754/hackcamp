import React, { useState } from 'react';
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
  BarChart,
  Bar,
} from 'recharts';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CSVLink } from 'react-csv';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Button, Row, Col } from 'react-bootstrap';
import { awsData, azureData } from './ChartData';
const horizontalPadding = {
  paddingLeft: '10px', // Adjust the padding value as needed
  paddingRight: '10px', // Adjust the padding value as needed
};
function DashboardContent() {
  // State variables for show/hide
  const [showCost, setShowCost] = useState(true);
  const [showEnergy, setShowEnergy] = useState(true);
  const [selectedProvider, setSelectedProvider] = useState('aws');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const data = selectedProvider === 'aws' ? awsData : azureData;

  const filteredData = data.filter(
    (entry) => (!startDate || new Date(entry.date) >= startDate) && (!endDate || new Date(entry.date) <= endDate)
  );

  const totalCost = filteredData.reduce((total, entry) => total + entry.cost, 0);
  const totalEnergy = filteredData.reduce((total, entry) => total + entry.energy, 0);

  const handleZoomChange = (range) => {
    // Handle zoom change if needed
    console.log('Zoom Range:', range);
  };

  const headers = [
    { label: 'Date', key: 'date' },
    { label: 'Cost', key: 'cost' },
    { label: 'Energy', key: 'energy' },
  ];

  // Example additional data
  const additionalData = [
    { date: 'AWS 01', Services: getRandomNumber(0, 4000) },
    { date: 'AWS 02', Services: getRandomNumber(0, 4000) },

    { date: 'Athena', Services: getRandomNumber(0, 4000) },
    { date: 'Athena 2', Services: getRandomNumber(0, 4000) },
    { date: 'EU-west', Services: getRandomNumber(0, 4000) },
    { date: 'US-east', Services: getRandomNumber(0, 4000) },
    { date: 'US-south', Services: getRandomNumber(0, 4000) },
    // Add more data points as needed
  ];

  return (
    <div className="container">
      <h2>Cost, Energy, and Services Dashboard</h2>

      {/* Top right section */}
      <div className="d-flex justify-content-end mb-3">
        {/* Cloud Provider Dropdown */}
        <Dropdown onSelect={(eventKey) => setSelectedProvider(eventKey)}>
          <Dropdown.Toggle variant="primary" className="mr-2 " style={horizontalPadding}>
            {selectedProvider === 'aws' ? 'AWS' : 'Azure'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="aws">AWS</Dropdown.Item>
            <Dropdown.Item eventKey="azure">Azure</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

       {/* Date Range Picker */}
       <div className="d-flex align-items-center mr-2" style={horizontalPadding}>
          <label className="mr-2">Date Range: </label>
          <div className="d-flex">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="form-control "
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="form-control ml-2"
            />
          </div>
        </div>

        {/* Export Button */}
        <CSVLink data={filteredData} headers={headers} filename={'Cost_Energy_Data.csv'}>
        <Button variant="success" style={horizontalPadding}>
            Export Data
          </Button>
  
        </CSVLink>
      </div>

      {/* Two Charts side by side */}
      <Row>
        {/* First Chart based on selected cloud provider (Area Chart) */}
        <Col md={6}>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {showCost && <Area type="monotone" dataKey="cost" stackId="1" stroke="#8884d8" fill="#8884d8" name="Cost" />}
              {showEnergy && <Area type="monotone" dataKey="energy" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Energy" />}
              <Brush dataKey="date" height={30} stroke="#8884d8" onChange={handleZoomChange} />
            </AreaChart>
          </ResponsiveContainer>
        </Col>

        {/* Second Chart (Bar Chart) */}
        <Col md={6}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={additionalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Services" fill="#8884d8" name="Services" />
              {/* You can customize the additional chart as needed */}
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>

      {/* Display total cost, energy, and services */}
      <div className="mt-3">
        <h3>Total Cost: {totalCost}</h3>
        <h3>Total Energy: {totalEnergy}</h3>
      </div>
    </div>
  );
}

// Helper function to generate random numbers
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default DashboardContent;