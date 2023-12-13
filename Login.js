import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, TextField, Button, Grid, ThemeProvider, createTheme } from '@mui/material';
import irisLogo from './iris_logo.png';

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

  const logoWidth = '80px';

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent="center" alignItems="center" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
        <Grid item xs={10} sm={8} md={6} lg={4} style={{ overflowY: 'auto' }}>
          <Paper elevation={3} style={{ padding: '10px', backgroundColor: theme.palette.primary.main, marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <img src={irisLogo} alt="Iris Logo" style={{ width: logoWidth, height: 'auto', marginRight: '10px' }} />
            <Typography variant="h6" align="center" style={{ color: '#fff' }}>
              Cloud Carbon Footprint
            </Typography>
          </Paper>

          <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
            <Paper elevation={3} style={{ padding: '10px', marginBottom: '20px' }}>
              <Typography variant="h5" align="center">
                Login
              </Typography>
            </Paper>

            <form>
              <div>
                <TextField
                  label="Username"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: '20px' }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>
            </form>

            {error && <Typography variant="body2" style={{ color: 'red', marginTop: '10px' }}>{error}</Typography>}
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Login;







