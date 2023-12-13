import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import irisLogo from './iris_logo.png';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

function AppHeader({ isLoggedIn, onLogout, onSelectProvider }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout(); // Call the onLogout function passed as a prop
    navigate('/login'); // Redirect to /login
  };

  // Render the header only if the user is logged in
  if (!isLoggedIn) {
    return null;
  }

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
              borderRadius: '15px',
              color: location.pathname === '/dashboard' ? '#000' : '#fff',
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
              borderRadius: '15px',
              color: location.pathname === '/connections' ? '#000' : '#fff',
            }}
          >
            <ListItemText primary="Connections" />
          </ListItem>
        </List>

        <div style={{ marginLeft: 'auto' }}>
          <IconButton color="inherit" component={Link} to="/login" onClick={handleLogout}>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;

