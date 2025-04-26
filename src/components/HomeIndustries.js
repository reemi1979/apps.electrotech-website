// src/components/HomeIndustries.js

import React, { useState } from 'react';
import { Box, Typography, Grid, Modal, Backdrop } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const industries = [
  { src: process.env.PUBLIC_URL + '/photos/industries/a.png', titleKey: 'home_industrie_airport_title', descriptionKey: 'home_industrie_airport_description' },
  { src: process.env.PUBLIC_URL + '/photos/industries/b.png', titleKey: 'home_industrie_distribution_title', descriptionKey: 'home_industrie_distribution_description' },
  { src: process.env.PUBLIC_URL + '/photos/industries/c.png', titleKey: 'home_industrie_manufacturing_title', descriptionKey: 'home_industrie_manufacturing_description' },
  { src: process.env.PUBLIC_URL + '/photos/industries/d.png', titleKey: 'home_industrie_oem_title', descriptionKey: 'home_industrie_oem_description' },
  { src: process.env.PUBLIC_URL + '/photos/industries/e.png', titleKey: 'home_industrie_foodpharma_title', descriptionKey: 'home_industrie_foodpharma_description' },
  { src: process.env.PUBLIC_URL + '/photos/industries/f.png', titleKey: 'home_industrie_energy_title', descriptionKey: 'home_industrie_energy_description' },
  { src: process.env.PUBLIC_URL + '/photos/industries/g.png', titleKey: 'home_industrie_mining_title', descriptionKey: 'home_industrie_mining_description' },
  { src: process.env.PUBLIC_URL + '/photos/industries/h.png', titleKey: 'home_industrie_engineer_title', descriptionKey: 'home_industrie_engineer_description' },
  { src: process.env.PUBLIC_URL + '/photos/industries/i.png', titleKey: 'home_industrie_transport_title', descriptionKey: 'home_industrie_transport_description' }
];

const MotionBox = motion(Box);

const HomeIndustries = () => {
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
          {t('home_industrie_default_title')}
        </Typography>
        <Typography
          variant="h4"
          sx={{ mb: 2, maxWidth: 1400, mx: 'auto', color: theme.palette.text.dark }}
        >
          {t('home_industrie_default_description')}
        </Typography>
      </Box>

      {/* IMAGES EN CERCLES */}
      <Grid container spacing={4} justifyContent="center" sx={{ minHeight: { xs: 400, sm: 'auto' } }}>
        {industries.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index} textAlign="center">
            <MotionBox
              component="img"
              src={item.src}
              alt={t(item.titleKey)}
              onClick={() => setSelected(item)}
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                objectFit: 'cover',
                mx: 'auto',
                transition: 'all 0.3s ease-in-out',
                transform: selected === item ? 'scale(1.05)' : 'scale(1)',
                boxShadow: selected === item ? '0 0 15px rgba(255,255,255,0.6)' : 'none',
                cursor: 'pointer',
              }}
            />
          </Grid>
        ))}
      </Grid>

      {/* MODAL POPUP RECTANGULAIRE AVEC ANIMATION */}
      <AnimatePresence>
        {selected && (
          <Modal
            open={Boolean(selected)}
            onClose={() => setSelected(null)}
            disableScrollLock // 👈 empêche le body de "shifter" à l'ouverture du modal
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500,
                sx: { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                outline: 'none',
              }}
            >
              <MotionBox
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                sx={{
                  width: '90vw',
                  maxWidth: 700,
                  bgcolor: '#111',
                  borderRadius: 3,
                  overflow: 'hidden',
                  color: 'white',
                  textAlign: 'center',
                  p: 4,
                }}
              >
                {/* Image RECTANGLE dans le modal */}
                <Box
                  component="img"
                  src={selected.src}
                  alt={t(selected.titleKey)}
                  sx={{
                    width: '100%',
                    height: 300,
                    borderRadius: 2,
                    objectFit: 'cover',
                    mb: 3,
                  }}
                />
                <Typography variant="h4" sx={{ mb: 2, color: theme.palette.text.secondary }}>
                  {t(selected.titleKey)}
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
                  {t(selected.descriptionKey)}
                </Typography>
              </MotionBox>
            </Box>
          </Modal>
        )}
      </AnimatePresence>

    </Box>
  );
};

export default HomeIndustries;
