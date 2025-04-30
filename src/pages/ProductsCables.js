// src/pages/ProductsCables.js
import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import ProductsCablesTypes from '../components/ProductsCablesTypes';

const ProductsCables = () => {
  const theme = useTheme();
  const { t } = useTranslation('products');
  const [selected, setSelected] = useState('cables'); // valeur par défaut

  return (
    <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>
      <Box sx={{ textAlign: 'left', mt: 2, maxWidth: 800, mx: 'auto' }}>
        <ProductsCablesTypes selected={selected} setSelected={setSelected} />
      </Box>

      <Typography variant="h6" gutterBottom sx={{ color: theme.palette.custom.electrotechBlue }}>
        {t(`product_warning_min_order`)}
      </Typography>

      <Typography variant="h3" gutterBottom sx={{ color: theme.palette.custom.electrotechYellow }}>
        {t(`selected_cables_${selected}_description_title`)}
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
        {t(`selected_cables_${selected}_description`)}
      </Typography>
    </Container>
  );
};

export default ProductsCables;
