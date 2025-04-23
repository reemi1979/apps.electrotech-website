// src/components/Footer.js

import React from 'react';
import { Box, Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

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
        © {new Date().getFullYear()} Électrotech - {t('footer_droits')}
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        <MuiLink component={Link} to="/politique-de-confidentialite" underline="hover" color="inherit">
          {t('footer_politique')}
        </MuiLink>
        {' | '}
        <MuiLink component={Link} to="/contact" underline="hover" color="inherit">
          {t('footer_contact')}
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default Footer;