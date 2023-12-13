// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, TextField, Button, Grid } from '@mui/material';

function Login({ onLogin }) {
  const navigate = useNavigate(); // Hook for navigation
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    // Simulate a successful login if username is 'demo' and password is 'password'
    if (username === 'admin' && password === 'pass') {
      onLogin(); // Call the onLogin function passed as a prop
      navigate('/dashboard'); // Redirect to /dashboard
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={10} sm={8} md={6} lg={4}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>
          <form>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '20px' }}
              onClick={handleLogin}
            >
              Login
            </Button>
          </form>
          {error && <Typography variant="body2" style={{ color: 'red', marginTop: '10px' }}>{error}</Typography>}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
