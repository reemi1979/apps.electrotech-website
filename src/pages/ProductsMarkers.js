// src/pages/ProductsMarkers.js
import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import ProductsMarkersTypes from '../components/ProductsMarkersTypes';

const ProductsMarkers = () => {
  const theme = useTheme();
  const { t } = useTranslation('products');
  const [selected, setSelected] = useState('cables');

  return (
    <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>

      <Box sx={{ textAlign: 'left', mt: 2, maxWidth: 800, mx: 'auto' }}>
        <ProductsMarkersTypes selected={selected} setSelected={setSelected} />
      </Box>

      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.custom.electrotechBlue }}>
        {t(`product_warning_min_order`)}
      </Typography>

      <Typography variant="h3" gutterBottom sx={{ color: theme.palette.custom.electrotechYellow }}>
        {t(`selected_markers_${selected}_description_title`)}
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
        {t(`selected_markers_${selected}_description`)}
      </Typography>
    </Container>
  );
};

export default ProductsMarkers;
