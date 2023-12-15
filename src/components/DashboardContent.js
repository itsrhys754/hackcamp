import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
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
  Label,  // Import Label from Recharts
} from 'recharts';

const PROVIDER = {
  ALL: 'all',
  AWS: 'aws',
  AZURE: 'azure',
};

const horizontalPadding = {
  paddingLeft: '10px',
  paddingRight: '10px',
};

const totalSectionStyle = {
  marginBottom: '10px',
  padding: '10px',
  backgroundColor: '#f8f9fa', // Light gray background
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Optional: Add a subtle shadow
};

const totalTitleStyle = {
  margin: '0',
};


const renderDatePicker = ({ selectedDate, onChange, placeholderText }) => (
  <DatePicker
    selected={selectedDate}
    onChange={onChange}
    selectsStart
    startDate={selectedDate}
    endDate={selectedDate}  
    className="form-control"
    placeholderText={placeholderText}
  />
);

function DashboardContent() {
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

    if (selectedProvider === 'all') {
      const awsFilteredData = awsData.filter(
        (entry) => (!newStartDate || new Date(entry.date) >= newStartDate) && (!today || new Date(entry.date) <= today)
      );
      const azureFilteredData = azureData.filter(
        (entry) => (!newStartDate || new Date(entry.date) >= newStartDate) && (!today || new Date(entry.date) <= today)
      );

      const totalAwsCost = awsFilteredData.reduce((total, entry) => total + entry.cost, 0);
      const totalAwsEnergy = awsFilteredData.reduce((total, entry) => total + entry.energy, 0);

      const totalAzureCost = azureFilteredData.reduce((total, entry) => total + entry.cost, 0);
      const totalAzureEnergy = azureFilteredData.reduce((total, entry) => total + entry.energy, 0);

      const totalCostAll = totalAwsCost + totalAzureCost;
      const totalEnergyAll = totalAwsEnergy + totalAzureEnergy;

      console.log('Total Cost (All):', totalCostAll);
      console.log('Total Energy (All):', totalEnergyAll);
    }
  };

  const headers = [
    { label: 'Date', key: 'date' },
    { label: 'Cost', key: 'cost' },
    { label: 'Energy', key: 'energy' },
  ];

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

      <div className="d-flex  mb-3">
        <Dropdown onSelect={(eventKey) => setSelectedProvider(eventKey)}>
          <Dropdown.Toggle variant="primary" className="mr-2" style={horizontalPadding}>
            {selectedProvider === 'all' ? 'All' : selectedProvider === 'aws' ? 'AWS' : selectedProvider === 'azure' ? 'Azure' : 'All'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="all">All</Dropdown.Item>
            <Dropdown.Item eventKey="aws">AWS</Dropdown.Item>
            <Dropdown.Item eventKey="azure">Azure</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

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

        <CSVLink data={filteredData} headers={headers} filename={'Cost_Energy_Data.csv'}>
          <Button variant="success" style={horizontalPadding}>
            Export Data
          </Button>
        </CSVLink>
      </div>

      <Row>
        <Col md={6}>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis>
              <Label value="CO2 emissions" offset={5} position="insideLeft" angle={-90} />
              </YAxis>
              <Tooltip />
              <Legend />
              {showCost && <Area type="monotone" dataKey="cost" stackId="1" stroke="#8884d8" fill="#8884d8" name="Cost (£)" />}
              {showEnergy && <Area type="monotone" dataKey="energy" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Energy (kWh)" />}
              <Brush dataKey="date" height={30} stroke="#8884d8" onChange={handleZoomChange} />
            </AreaChart>
          </ResponsiveContainer>
        </Col>

        <Col md={6}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={additionalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis>
              <Label value="CO2 emissions" offset={5} position="insideLeft" angle={-90} />
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="Services" fill="#8884d8" name="Accounts" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>

      <Row>
  <Col md={12}>
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Tooltip />
        <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8">
          {pieChartData.map((entry, index) => {
            const predefinedColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f0e"]; // Add more colors as needed
            return <Cell key={`cell-${index}`} fill={predefinedColors[index % predefinedColors.length]} />;
          })}
        </Pie>
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </Col>
</Row>

      <div className="mt-3" style={{ display: 'flex', flexDirection: 'column' }}>
  <div style={totalSectionStyle}>
    <h3 style={totalTitleStyle}>Total Cost: £{totalCost.toFixed(2)}</h3>
  </div>
  <div style={totalSectionStyle}>
    <h3 style={totalTitleStyle}>Total Energy: {totalEnergy.toFixed(2)} kWh</h3>
  </div>
</div>
</div>
  );
}

export default DashboardContent;
