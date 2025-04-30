// src/components/Footer.js

import React from 'react';
import { Box, Typography, Link as MuiLink, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import ThemeToggleButton from './ThemeToggleButton';

const Footer = ({ toggleBackground, backgroundEnabled }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.custom.electrotechBlue,
        textAlign: 'center',
        py: 2,
        mt: 0,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Électrotech Automatisation Industrielle inc. - {t('footer_rights')}
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        <MuiLink component={Link} to="/privacy-policy" underline="hover" color="inherit">
          {t('footer_privacy_policy')}
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
        
      <ThemeToggleButton />

      </Box>
    </Box>
  );
};

export default Footer;
