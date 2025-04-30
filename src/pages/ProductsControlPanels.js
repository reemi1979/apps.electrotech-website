// src/pages/ProductsControlPanels.js

import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ProductsControlPanelsTypes from '../components/ProductsControlPanelsTypes';
import { useTheme } from '@mui/material/styles';
import ProductsControlPanelsPhotos from '../components/ProductsControlPanelsPhotos';

const ProductsControlPanels = () => {
  const theme = useTheme();
  const { t } = useTranslation('products');
  const [selected, setSelected] = useState('standard'); // valeur par défaut

  return (
    <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>
      <Box sx={{ textAlign: 'left', mt: 2, maxWidth: 800, mx: 'auto' }}>
        <ProductsControlPanelsTypes selected={selected} setSelected={setSelected} />
      </Box>

      <Typography variant="h3" gutterBottom sx={{ color: theme.palette.custom.electrotechYellow }}>
        {t(`selected_control_panel_${selected}_description_title`)}
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
        {t(`selected_control_panel_${selected}_description`)}
      </Typography>

      <ProductsControlPanelsPhotos selectedType={selected} />
      
    </Container>
  );
};

export default ProductsControlPanels;
