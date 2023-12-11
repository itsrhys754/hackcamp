// components/AppHeader.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function AppHeader() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" noWrap>
          IRIS Cloud carbon footprint
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
