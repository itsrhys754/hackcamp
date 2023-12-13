// App.js
import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import AppHeader from './components/AppHeader';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import DashboardContent from './components/DashboardContent';
import Connections from './components/Connections'; // Import the Connections component

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <CssBaseline />
        <AppHeader />
        <Sidebar />
        <Container
          maxWidth="xl"
          style={{ marginTop: 64, marginLeft: 240, padding: 20, position: 'relative', zIndex: 1 }}
        >
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardContent />} />
            <Route path="/connections" element={<Connections />} /> {/* Add this line for the /connections route */}
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;




