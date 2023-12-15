import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import irisLogo from '../img/iris_logo.png';
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PropTypes from 'prop-types';

const listItemStyle = {
  backgroundColor: 'transparent',
  transition: 'background-color 0.3s',
  borderRadius: '15px',
  color: '#fff',
};

const activeListItemStyle = {
  backgroundColor: '#87CEEB',
  color: '#000',
};

function AppHeader({ isLoggedIn, onLogout, onSelectProvider }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  if (!isLoggedIn) {
    // Render login component or handle differently based on your use case
    return (
      <div>
        {/* Render login component or message */}
      </div>
    );
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <img
            src={irisLogo}
            alt="IRIS Cloud Carbon Footprint Logo"
            style={{ width: '100px', height: 'auto', paddingRight: '10px' }}
            className="logo-img"
          />
        </Link>
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
              ...listItemStyle,
              ...(location.pathname === '/dashboard' ? activeListItemStyle : {}),
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
              ...listItemStyle,
              ...(location.pathname === '/connections' ? activeListItemStyle : {}),
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

AppHeader.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  onSelectProvider: PropTypes.func.isRequired,
};

export default AppHeader;
