// components/AppHeader.js
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DatePickerComponent from './DatePickerComponent'; // Import the DatePickerComponent
// Import the image using require or import
import irisLogo from './iris_logo.png';

function AppHeader({ onSelectProvider }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <AppBar position="fixed">
      <Toolbar>
        <img
          src={irisLogo}
          alt="IRIS Cloud Carbon Footprint Logo"
          style={{ width: '100px', height: 'auto', paddingRight: '10px' }}
          className="logo-img"
        />
        <Typography variant="h6" noWrap>
           Cloud Carbon Footprint
        </Typography>
        {/* Add the DatePickerComponent with props */}
        
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
