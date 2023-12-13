// components/Sidebar.js
import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" style={{ zIndex: 0 }}>
      <List>
        <ListItem button component={Link} to="/dashboard"> {/* Link to Dashboard */}
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard"> {/* Link to Dashboard */}
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/connections"> {/* Link to Connections */}
          <ListItemIcon>
            <EqualizerIcon />
          </ListItemIcon>
          <ListItemText primary="Connections" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;

