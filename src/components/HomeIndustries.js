// src/components/HomeIndustries.js

import React, { useState } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const industries = [
  {
    src: process.env.PUBLIC_URL + '/photos/industries/a.png',
    titleKey: 'home_industrie_airport_title',
    descriptionKey: 'home_industrie_airport_description',
  },
  {
    src: process.env.PUBLIC_URL + '/photos/industries/b.png',
    titleKey: 'home_industrie_distribution_title',
    descriptionKey: 'home_industrie_distribution_description',
  },
  {
    src: process.env.PUBLIC_URL + '/photos/industries/c.png',
    titleKey: 'home_industrie_manufacturing_title',
    descriptionKey: 'home_industrie_manufacturing_description',
  },
  {
    src: process.env.PUBLIC_URL + '/photos/industries/d.png',
    titleKey: 'home_industrie_oem_title',
    descriptionKey: 'home_industrie_oem_description',
  },
  {
    src: process.env.PUBLIC_URL + '/photos/industries/e.png',
    titleKey: 'home_industrie_foodpharma_title',
    descriptionKey: 'home_industrie_foodpharma_description',
  },
  {
    src: process.env.PUBLIC_URL + '/photos/industries/f.png',
    titleKey: 'home_industrie_energy_title',
    descriptionKey: 'home_industrie_energy_description',
  },
  {
    src: process.env.PUBLIC_URL + '/photos/industries/g.png',
    titleKey: 'home_industrie_mining_title',
    descriptionKey: 'home_industrie_mining_description',
  }
];

const MotionBox = motion(Box);

const HomeIndustries = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const theme = useTheme();
  const { t } = useTranslation();

  const hoveredIndustry = hoveredIndex !== null ? industries[hoveredIndex] : null;

  return (
    <Box sx={{ px: 2, py: 6, maxWidth: 1400, mx: 'auto' }}>
      {/* TITRE ET DESCRIPTION */}
      <Box sx={{ textAlign: 'center', mb: 6, minHeight: 120 }}>
        {hoveredIndustry ? (
          <>
            <Typography 
              variant="h3" 
              sx={{ mb: 2, color: theme.palette.text.secondary }}
            >
              {t(hoveredIndustry.titleKey)}
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ mb: 2, maxWidth: 1400, margin: '0 auto', color: theme.palette.text.dark }}
            >
              {t(hoveredIndustry.descriptionKey)}
            </Typography>
          </>
        ) : (
          <>
            <Typography 
              variant="h3" 
              sx={{ mb: 2, color: theme.palette.text.secondary }}
            >
              {t('home_industrie_default_title')}
            </Typography>
            <Typography 
              variant="h4" 
              sx={{ mb: 2, maxWidth: 1400, margin: '0 auto', color: theme.palette.text.dark }}
            >
              {t('home_industrie_default_description')}
            </Typography>
          </>
        )}
      </Box>

      {/* IMAGES EN CERCLES */}
      <Grid container spacing={4} justifyContent="center">
        {industries.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index} textAlign="center">
            <MotionBox
              component="img"
              src={item.src}
              alt={t(item.titleKey)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                objectFit: 'cover',
                mx: 'auto',
                transition: 'all 0.3s ease-in-out',
                transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                boxShadow: hoveredIndex === index ? '0 0 15px rgba(255,255,255,0.6)' : 'none',
                cursor: 'pointer',
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomeIndustries;