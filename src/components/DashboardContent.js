import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns'; // Import necessary date-fns functions
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CSVLink } from 'react-csv';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, Button, Row, Col } from 'react-bootstrap';
import { awsData, azureData } from './ChartData';
import { additionalData, getRandomNumber } from './ServicesData';
import { PieChart, Pie, Cell } from 'recharts';
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

const horizontalPadding = {
  paddingLeft: '10px',
  paddingRight: '10px',
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
    console.log('Zoom Range:', range);
  };

  const handleDateRangeChange = (range) => {
    const today = new Date();
    let newStartDate;

    switch (range) {
      case '1m':
        newStartDate = subMonths(today, 1);
        break;
      case '3m':
        newStartDate = subMonths(today, 3);
        break;
      case '6m':
        newStartDate = subMonths(today, 6);
        break;
      case '12m':
        newStartDate = subMonths(today, 12);
        break;
      default:
        newStartDate = null;
    }

    setStartDate(newStartDate);
    setEndDate(today);
  };

  const headers = [
    { label: 'Date', key: 'date' },
    { label: 'Cost', key: 'cost' },
    { label: 'Energy', key: 'energy' },
  ];

  // Example data for Pie Chart
  const pieChartData = [
    { name: 'eu-west 1', value: getRandomNumber(1, 100) },
    { name: 'eu-south', value: getRandomNumber(1, 100) },
    { name: 'us-east 1', value: getRandomNumber(1, 100) },
    { name: 'uk-south', value: getRandomNumber(1, 100) },
    // Add more data points as needed
  ];

  return (
    <div className="container">
      <h2>Cost, Energy, and Services Dashboard</h2>

      {/* Top right section */}
      <div className="d-flex  mb-3">
        {/* Cloud Provider Dropdown */}
        <Dropdown onSelect={(eventKey) => setSelectedProvider(eventKey)}>
          <Dropdown.Toggle variant="primary" className="mr-2" style={horizontalPadding}>
            {selectedProvider === 'aws' ? 'AWS' : selectedProvider === 'azure' ? 'Azure' : 'All'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="all">All</Dropdown.Item>
            <Dropdown.Item eventKey="aws">AWS</Dropdown.Item>
            <Dropdown.Item eventKey="azure">Azure</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Date Range Picker with additional options */}
        <div className="d-flex align-items-center mr-2" style={horizontalPadding}>
          <label className="mr-2">Date Range: </label>
          <div className="d-flex">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="form-control"
              placeholderText="Start Date"
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="form-control ml-2"
              placeholderText="End Date"
            />

             {/* Dropdown for date range options */}
             <Dropdown onSelect={(eventKey) => handleDateRangeChange(eventKey)} className="ml-2">
              <Dropdown.Toggle variant="secondary" style={horizontalPadding}>
                Date Range
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="1m">1 Month</Dropdown.Item>
                <Dropdown.Item eventKey="3m">3 Months</Dropdown.Item>
                <Dropdown.Item eventKey="6m">6 Months</Dropdown.Item>
                <Dropdown.Item eventKey="12m">12 Months</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {/* Export Button */}
        <CSVLink data={filteredData} headers={headers} filename={'Cost_Energy_Data.csv'}>
          <Button variant="success" style={horizontalPadding}>
            Export Data
          </Button>
        </CSVLink>
      </div>

      {/* Charts in one row */}
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
              <Bar dataKey="Services" fill="#8884d8" name="Acounts" />
              {/* You can customize the additional chart as needed */}
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>

      <Row>
        {/* Third Chart (Pie Chart) */}
        <Col md={12}>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Tooltip />
              <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
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

export default DashboardContent;
