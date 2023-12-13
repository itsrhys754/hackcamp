// components/Footer.js
import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Footer() {
  return (
    <footer style={{ marginTop: 'auto', backgroundColor: '#f5f5f5', padding: '20px'}}>
      <Typography variant="body2" color="textSecondary" align="center">
        © {new Date().getFullYear()} Hackcamp Project - This is not a product of IRIS
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
      </Typography>
    </footer>
  );
}

export default Footer;
