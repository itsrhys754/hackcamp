import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, TextField, Button, Grid, ThemeProvider, createTheme } from '@mui/material';
import irisLogo from '../img/IRIS-logoBlack-190x60.png';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'pass') {
      onLogin();
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: '#1976D2',
      },
    },
  });

  const loginFormStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '320px', 
    padding: '20px',
    textAlign: 'center',
  };

  const logoWidth = '80px';

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Paper elevation={3} style={loginFormStyle}>
            <img src={irisLogo} alt="Iris Logo" style={{ width: logoWidth, marginBottom: '20px' }} />
            <Typography variant="h5" style={{ marginBottom: '20px' }}>
              Cloud Carbon Footprint
            </Typography>

            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
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
                type="submit"  // Add type="submit" to make the Enter key trigger this button
                variant="contained"
                color="primary"
                fullWidth
                style={{ marginTop: '20px' }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </form>

            {error && (
              <Typography variant="body2" style={{ color: 'red', marginTop: '10px' }}>
                {error}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;
