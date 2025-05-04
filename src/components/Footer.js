// src/components/Footer.js

import React from 'react';
import { Box, Typography, Link as MuiLink, IconButton, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ThemeToggleButton from './ThemeToggleButton';

const Footer = ({ toggleBackground, backgroundEnabled }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        textAlign: 'center',
        py: 3,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        Électrotech Automatisation Industrielle
      </Typography>

      <Typography variant="body2" sx={{ mt: 0.5 }}>
        625 Simonds Sud, Granby, Québec, Canada, J2J 1C2
      </Typography>

      {/* Réseaux sociaux */}
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ mt: 1 }}>
        <IconButton
          component="a"
          href="https://www.facebook.com/ElectrotechAutomatisationIndustrielle"
          target="_blank"
          rel="noopener"
          aria-label="Facebook"
          color="inherit"
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          component="a"
          href="https://ca.linkedin.com/company/electrotech-ca"
          target="_blank"
          rel="noopener"
          aria-label="LinkedIn"
          color="inherit"
        >
          <LinkedInIcon />
        </IconButton>
      </Stack>

      {/* Bouton Nous contacter */}
      <Box sx={{ mt: 1.5 }}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          component={Link}
          to="/contact"
        >
          {t('footer_contact_us', 'Nous contacter')}
        </Button>
      </Box>

      {/* Politique de confidentialité */}
      <Box sx={{ mt: 1 }}>
        <MuiLink component={Link} to="/privacy-policy" underline="hover" color="inherit">
          {t('footer_privacy_policy', 'Politique de confidentialité')}
        </MuiLink>
      </Box>

      {/* Boutons background et theme */}
      <Box sx={{ mt: 1 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={toggleBackground}
          sx={{ mr: 1 }}
        >
          {backgroundEnabled ? t('footer_hide_background', 'Cacher fond') : t('footer_show_background', 'Afficher fond')}
        </Button>
        <ThemeToggleButton />
      </Box>

      {/* Droits réservés */}
      <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
        © {new Date().getFullYear()} Electrotech Automatisation Industrielle - {t('footer_rights')}
      </Typography>
    </Box>
  );
};

export default Footer;
