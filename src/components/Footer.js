// src/components/Footer.js

import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1e1e1e',
        color: 'white',
        textAlign: 'center',
        py: 2,
        mt: 0,                  // 👈 enlevé toute marge
        borderTop: '1px solid #333',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Électrotech - Tous droits réservés
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        <MuiLink component={Link} to="/politique-de-confidentialite" underline="hover" color="inherit">
          Politique de confidentialité
        </MuiLink>
        {' | '}
        <MuiLink component={Link} to="/contact" underline="hover" color="inherit">
          Nous contacter
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default Footer;