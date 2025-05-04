// src/pages/Services.js

import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import ServicesTypes from './ServicesTypes';
import ServicesPhotos from './ServicesPhotos';
import { useParams } from 'react-router-dom';

const selectedTypeMap = ['standard', 'custom', 'serie', 'pushbuttons', 'junctionbox'];

const Services = () => {
  const { index } = useParams();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selected, setSelected] = useState('standard');

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
    <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>
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
  );
};

export default Services;
