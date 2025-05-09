// src/pages/Services/Services.js

import React, { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import ServicesTypes from './ServicesTypes';
import ServicesPhotos from './ServicesPhotos';
import { useParams } from 'react-router-dom';
import BackgroundBanner from '../../components/BackgroundBanner';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const selectedTypeMap = ['standard', 'custom', 'serie', 'pushbuttons', 'junctionbox'];

const Services = () => {
    const { index } = useParams();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selected, setSelected] = useState(selectedTypeMap[0]);
    const theme = useTheme();
    const { t } = useTranslation();

  useEffect(() => {
    const idx = parseInt(index, 10);
    if (!isNaN(idx) && idx >= 0 && idx < selectedTypeMap.length) {
      setSelectedIndex(idx);
      setSelected(selectedTypeMap[idx]);
    } else {
      setSelectedIndex(0);
      setSelected(selectedTypeMap[0]);
    }
  }, [index]);

  return (
    <Box sx={{ position: 'relative' }}>
      
    <BackgroundBanner image="photos/lobby.jpg" height={550} top={200} />

    <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>

      <Typography variant="h6" textAlign="center" sx={{ mt: 2, color: theme.palette.text.primary }}>
        {t('service_panel_help')}
      </Typography>

      <Box sx={{ textAlign: 'left', mt: 6, maxWidth: 800, mx: 'auto' }}>

        {/* ✅ PASSE selectedIndex au lieu de selected */}
        <ServicesTypes 
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setSelected={setSelected}
        />
      </Box>

      <ServicesPhotos selectedType={selected} />
    </Container>
    </Box>
  );
};

export default Services;
