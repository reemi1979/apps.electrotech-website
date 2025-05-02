// src/components/HomeServices.js

import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const services = [
  { src: process.env.PUBLIC_URL + '/photos/services/a.jpg', titleKey: 'home_service_assy_title', descriptionKey: 'home_service_assy_description' },
  { src: process.env.PUBLIC_URL + '/photos/services/b.jpg', titleKey: 'home_service_design_title', descriptionKey: 'home_service_design_description' },
  { src: process.env.PUBLIC_URL + '/photos/services/c.jpg', titleKey: 'home_service_machine_title', descriptionKey: 'home_service_machine_description' },
  { src: process.env.PUBLIC_URL + '/photos/services/d.jpg', titleKey: 'home_service_prog_title', descriptionKey: 'home_service_prog_description' },
  { src: process.env.PUBLIC_URL + '/photos/services/e.jpg', titleKey: 'home_service_cnc_title', descriptionKey: 'home_service_cnc_description' },
];

const MotionBox = motion(Box);

const HomeServices = () => {
  const [selected, setSelected] = useState(null);
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Box sx={{ px: 2, py: 6, maxWidth: 1400, mx: 'auto' }}>
      
      {/* TITRE FIXE EN HAUT */}
      <Box
        sx={{
          textAlign: 'center',
          mb: 6,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        }}
      >
        <Typography
          variant="h3"
          sx={{ mb: 2, color: theme.palette.text.secondary }}
        >
          {t('home_service_default_title')}
        </Typography>
        <Typography
          variant="h4"
          sx={{ mb: 2, maxWidth: 1400, mx: 'auto', color: theme.palette.text.blue }}
        >
          {t('home_service_default_description')}
        </Typography>
      </Box>

      {/* IMAGES EN CERCLES */}
      <Grid container spacing={4} justifyContent="center" sx={{ minHeight: { xs: 270, sm: 'auto' } }}>
        {services.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index} textAlign="center">
            <MotionBox
              component="img"
              src={item.src}
              alt={t(item.titleKey)}
              onClick={() => setSelected(item)}
              onMouseOver={() => setSelected(item)}
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                objectFit: 'cover',
                mx: 'auto',
                transition: 'all 0.3s ease-in-out',
                transform: selected === item ? 'scale(1.05)' : 'scale(1)',
                boxShadow:
                selected === item.name
                  ? `0 0 15px ${
                      theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.6)'
                        : 'rgba(0,0,0,0.8)'
                    }`
                  : 'none',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: `0 0 15px ${
                    theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.6)'
                      : 'rgba(0,0,0,0.8)'
                  }`,
                  transform: 'scale(1.05)', // optional: slight zoom on hover too
                },
              }}
            />
          </Grid>
        ))}
      </Grid>


      <Box
        sx={{
          height: 140, // fixe la hauteur globale
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {selected && (
          <>
            <Typography variant="h4" sx={{ mb: 1, color: theme.palette.text.secondary }}>
              {t(selected.titleKey)}
            </Typography>
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              {t(selected.descriptionKey)}
            </Typography>
          </>
        )}
      </Box>



      {/* DISABLED, EN BAS... MODAL POPUP RECTANGULAIRE AVEC ANIMATION */}
    

    </Box>
  );
};

export default HomeServices;

