// App.js
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppHeader from './components/AppHeader';
import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContent';

function App() {
  return (
    <div style={{ display: 'flex' }}>
      <CssBaseline />
      <AppHeader />
      <Sidebar />
      <Container maxWidth="xl" style={{ marginTop: 64, marginLeft: 240, padding: 20, position: 'relative', zIndex: 1 }}>
        <DashboardContent />
      </Container>
    </div>
  );
}

export default App;
