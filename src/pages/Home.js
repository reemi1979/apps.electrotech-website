// src/pages/Homes.js

import React from 'react';
import HeroVideo from '../components/HeroVideo';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Home = () => {

  const { t } = useTranslation();

  return (
    <>
      {/* SECTION HERO */}
      <Box sx={{ position: 'relative', zIndex: 0, height: '100vh' }}>
        <HeroVideo />

        {/* TEXTE CENTRÉ EN BAS */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 80,
            left: 0,
            right: 0,
            textAlign: 'center',
            zIndex: 1,
            px: 2,
          }}
        >

        </Box>
      </Box>

      {/* SECTION CONTENU APRÈS LE HERO */}
      <Box sx={{ position: 'relative', zIndex: 1, px: 2, py: 10 }}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          {t('home_bienvenue')}
        </Typography>
        <Typography variant="body1">
          {t('home_contenu_test')}
        </Typography>
        <Typography variant="body1">
          {t('home_contenu_principal')}
        </Typography>
      </Box>
    </>
  );
};

export default Home;
