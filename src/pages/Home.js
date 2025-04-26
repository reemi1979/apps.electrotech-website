// src/pages/Homes.js

import React, { useEffect, useState } from 'react';
import HeroVideo from '../components/HeroVideo';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HomePhotos from '../components/HomePhotos';
import HomeIndustries from '../components/HomeIndustries';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

const Home = () => {

  const [token, setToken] = useState(null);
  const [apiData, setApiData] = useState(null);

  const { t } = useTranslation();
  const theme = useTheme();

  useEffect(() => {
    if (token) {
      fetchNews(token);
    }
  }, [token]);

  // 1️⃣ Charger le token au démarrage
  useEffect(() => {
    async function fetchToken() {
      try {
        const response = await fetch('https://api.electrotech.ca/get-token');
        const data = await response.json();
        if (data.token) {
          setToken(data.token);
        } else {
          console.error('Token non reçu:', data);
        }
      } catch (error) {
        console.error('Erreur pour obtenir le token:', error);
      }
    }

    fetchToken();
  }, []);

  const fetchNews = (authToken) => {
    fetch("https://api.electrotech.ca/api/data", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authToken}`
      },
      body: JSON.stringify({ type: "news" })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`Erreur API: ${res.status} ${res.statusText}`);
      }
      return res.json();
    })
    .then(data => {
      console.log("📦 Données reçues :", data);
      setApiData(data);
    })
    .catch(err => {
      console.error("❌ Erreur API :", err);
    });
  };

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
      <Box sx={{ position: 'relative', zIndex: 1, px: 2, py: 10, textAlign: 'center', mx: 'auto', }}>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <Box
            component="img"
            src={process.env.PUBLIC_URL + '/logo.svg'}
            alt="Électrotech Logo"
            sx={{
              width: { xs: 400, md: 800 }, // 150px on mobile, 600px on desktop
              height: 'auto',
              mx: 'auto',
              display: 'block',
              filter: 'brightness(0) invert(1)', // pure white
              transition: 'filter 0.5s ease-in-out',
              '&:hover': {
                filter: 'none', // restores original logo colors on hover
              },
            }}
          />
        </motion.div>

        <Typography variant="h3" sx={{ mb: 2 , color: theme.palette.text.secondary }}>
          {t('home_bienvenue')}
        </Typography>

        <Typography variant="h4"  sx={{mb: 2, maxWidth: 1400, margin: '0 auto', color: theme.palette.text.dark }}>
          {t('home_contenu_1')}
        </Typography>

        <Typography variant="h6" sx={{mb: 2, maxWidth: 1400, margin: '0 auto' }}>
          {t('home_contenu_2')}
        </Typography>

        <br /><br /><br /><br /><br /><br />

        <Typography variant="h3" sx={{ mb: 2 , color: theme.palette.text.secondary}}>
          {t('home_expertise')}
          <HomePhotos />
        </Typography>

        <br /><br /><br /><br /><br /><br />

        <Typography variant="h3" sx={{ mb: 2 , color: theme.palette.text.secondary}}>
          <HomeIndustries />
        </Typography>

        <Typography variant="body1">
          {t('home_contenu_principal')}
        </Typography>

      </Box>
    </>
  );
};

export default Home;
