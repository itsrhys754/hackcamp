// components/AppHeader.js
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DatePickerComponent from './DatePickerComponent';
import irisLogo from './iris_logo.png';

function AppHeader({ onSelectProvider }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const location = useLocation();

  const handleLogout = () => {
    // Implement your logout logic here
    // For example, clear user session, redirect to login, etc.
    // For now, let's redirect to the dashboard
    window.location.href = '/dashboard';
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <img
          src={irisLogo}
          alt="IRIS Cloud Carbon Footprint Logo"
          style={{ width: '100px', height: 'auto', paddingRight: '10px' }}
          className="logo-img"
        />
        <Typography variant="h6" noWrap style={{ flex: 1, marginLeft: '20px', color: '#fff' }}>
          Cloud Carbon Footprint
        </Typography>
        <List style={{ display: 'flex', flexDirection: 'row' }}>
          <ListItem
            button
            component={Link}
            to="/dashboard"
            className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
            style={{
              backgroundColor: location.pathname === '/dashboard' ? '#87CEEB' : 'transparent',
              transition: 'background-color 0.3s',
              borderRadius: '15px', // Adjust the value to control the roundness
              color: location.pathname === '/dashboard' ? '#000' : '#fff', // Black text when selected
            }}
          >
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/connections"
            className={`nav-item ${location.pathname === '/connections' ? 'active' : ''}`}
            style={{
              backgroundColor: location.pathname === '/connections' ? '#87CEEB' : 'transparent',
              transition: 'background-color 0.3s',
              borderRadius: '15px', // Adjust the value to control the roundness
              color: location.pathname === '/connections' ? '#000' : '#fff', // Black text when selected
            }}
          >
            <ListItemText primary="Connections" />
          </ListItem>
          {/* Logout button with Link to dashboard */}
          <IconButton color="inherit" component={Link} to="/dashboard">
            <ExitToAppIcon />
          </IconButton>
        </List>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;












