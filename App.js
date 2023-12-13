import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppHeader from './components/AppHeader';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DashboardContent from './components/DashboardContent';
import Connections from './components/Connections';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <AppHeader />
        <Container
          maxWidth="xl"
          style={{ marginTop: 64, padding: 20, position: 'relative', zIndex: 1 }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="/connections" element={<Connections />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;




