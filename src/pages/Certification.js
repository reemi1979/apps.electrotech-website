// src/pages/Certification.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Fade } from '@mui/material';
import { useTranslation } from 'react-i18next';
import csaLogo from '../assets/csa_light-gray.svg';
import ceLogo from '../assets/ce_light-gray.svg';
import ulLogo from '../assets/ul_light-gray.svg';
import QualityPhotos from '../components/QualityPhotos';
import { useTheme } from '@mui/material/styles';

const Certification = () => {
  const theme = useTheme();
  const { t } = useTranslation('quality');
  const availableCerts = ['csa', 'ce'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  const certifications = {
    csa: {
      name: 'c CSA, c CSA us, CSA us',
      organization: t('certification_csa_org'),
      description: t('certification_csa_description'),
      logo: csaLogo,
      trademark: t('certification_csa_trademark')
    },
    ce: {
      name: 'CE',
      organization: t('certification_ce_org'),
      description: t('certification_ce_description'),
      logo: ceLogo,
      trademark: t('certification_ce_trademark')
    },
    ul: {
      name: 'UL',
      organization: t('certification_ul_org'),
      description: t('certification_ul_description'),
      logo: ulLogo,
      trademark: t('certification_ul_trademark')
    }
  };
  
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % availableCerts.length);
        setFadeIn(true);
      }, 500);
    }, 5000);
    return () => clearInterval(interval);
  }, [availableCerts.length]);

  const currentKey = availableCerts[currentIndex];
  const currentCert = certifications[currentKey];

  return (
    <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom sx={{ color: theme.palette.text.secondary }}>
        {t('certification_title')}
      </Typography>
      <Typography variant="h6" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
      {t('certification_title_description')}
      </Typography>

      {/* Animated Logo */}
      <Fade in={fadeIn} timeout={500}>
        <Box
          component="img"
          src={currentCert.logo}
          alt={currentKey.toUpperCase() + ' Certification Logo'}
          sx={{
            width: 150,
            height: 150,
            animation: 'pulse 2s ease-in-out infinite',
            mb: 4,
          }}
        />
      </Fade>

      <Typography variant="h4" sx={{ mt: 4 , color: theme.palette.text.secondary }}>
        <strong>{currentCert.name}</strong><br />
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        {t('certification_issuing_org')}: {currentCert.organization}<br />
        {t('certification_description')}: {currentCert.description}
      </Typography>

      <Typography 
        variant="body2"   
        sx={{ 
          fontStyle: 'italic', 
          color: theme.palette.text.secondary,
        }}
      >
        {currentCert.trademark}
      </Typography>

      <Typography variant="h4" sx={{ mt: 6 }}>
        {t('certification_why_matter')}
      </Typography>

      <Box component="ul" sx={{ textAlign: 'left', mt: 2, maxWidth: 800, mx: 'auto' }}>
        <QualityPhotos />
      </Box>

      <Typography variant="h4" sx={{ mt: 6 }}>
        {t('certification_help_title')}
      </Typography>

      <Typography variant="body1" sx={{ mt: 2, maxWidth: 800, mx: 'auto' }}>
        {t('certification_help_text')}
      </Typography>



      {/* Keyframes for pulse animation */}
      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1) rotate(0deg); opacity: 1; }
            50% { transform: scale(1.1) rotate(5deg); opacity: 0.85; }
            100% { transform: scale(1) rotate(0deg); opacity: 1; }
          }
        `}
      </style>
    </Container>
  );
};

export default Certification;
