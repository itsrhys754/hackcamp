// components/App.js
import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Footer from './components/Footer';
import DashboardContent from './components/DashboardContent';
import Connections from './components/Connections';
import Login from './components/Login'; // Import the Login component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to set the user as logged in
  const handleLogin = () => {
    // Add your login logic here
    // For now, let's simulate a successful login
    setIsLoggedIn(true);
  };

  // Function to set the user as logged out
  const handleLogout = () => {
    // Add your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <CssBaseline />
        <AppHeader
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <div style={{ display: 'flex', flex: 1 }}>
          {/* Conditionally render Sidebar based on login status */}
          {isLoggedIn}
          <Container
          maxWidth="xl"
          style={{ marginTop: 64, padding: 20, position: 'relative', zIndex: 1 }}
        >
            <Routes>
              <Route
                path="/"
                element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
              />
              {isLoggedIn && (
                <Route path="/dashboard" element={<DashboardContent />} />
              )}
              <Route path="/connections" element={<Connections />} />
              <Route
                path="/login"
                element={<Login isLoggedIn={isLoggedIn} onLogin={handleLogin} />}
              />
            </Routes>
          </Container>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
