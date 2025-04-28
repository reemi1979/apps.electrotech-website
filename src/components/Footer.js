// src/components/Footer.js

import React from 'react';
import { Box, Typography, Link as MuiLink, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer = ({ toggleBackground, backgroundEnabled }) => {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1e1e1e',
        color: 'white',
        textAlign: 'center',
        py: 2,
        mt: 0,
        borderTop: '1px solid #333',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Électrotech Automatisation Industrielle inc. - {t('footer_droits')}
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

      {/* Bouton toggle background */}
      <Box sx={{ mt: 2 }}>
        <Button 
          variant="contained" 
          size="small" 
          color="primary"
          onClick={toggleBackground}
        >
          {backgroundEnabled ? t('footer_hide_background') : t('footer_show_background')}
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;
