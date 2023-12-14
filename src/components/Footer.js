// components/Footer.js
import React from 'react';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const footerStyle = {
    position: isLoginPage ? 'fixed' : 'relative',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: '20px',
    textAlign: 'center',
  };

  return (
    <footer style={footerStyle}>
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Hackcamp Project - This is not a product of IRIS
      </Typography>
    </footer>
  );
}

export default Footer;
