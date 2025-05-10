// src/pages/Products/ProductsControlPanelsTypes.js

import React from 'react';
import { Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const controlPanelsTypes = [
  { src: process.env.PUBLIC_URL + '/photos/products/controlpanels/a.jpg', titleKey: 'product_control_panel_standard_title', name: 'standard' },
  { src: process.env.PUBLIC_URL + '/photos/products/controlpanels/b.jpg', titleKey: 'product_control_panel_custom_title', name: 'custom' },
  { src: process.env.PUBLIC_URL + '/photos/products/controlpanels/c.jpg', titleKey: 'product_control_panel_serie_title', name: 'serie' },
  { src: process.env.PUBLIC_URL + '/photos/products/controlpanels/d.jpg', titleKey: 'product_control_panel_pushbutton_title', name: 'pushbuttons' },
  { src: process.env.PUBLIC_URL + '/photos/products/controlpanels/e.jpg', titleKey: 'product_control_panel_junctionbox_title', name: 'junctionbox' }
];

const MotionBox = motion(Box);

const ProductsControlPanelsTypes = ({ selected, setSelected }) => {

  const { t } = useTranslation('products');
  const theme = useTheme();

  return (
    <Box sx={{ px: 2, maxWidth: 1400, mx: 'auto' }}>


      <Grid container spacing={2} justifyContent="center" sx={{ mb:2, minHeight: { xs: 270, sm: 'auto' } }}>
        {controlPanelsTypes.map((item, index) => (
          <Grid item xs={4} sm={4} md={3} lg={2} key={index} textAlign="center">
            <MotionBox
              component="img"
              src={item.src}
              alt={t(item.titleKey)}
              onClick={() => setSelected(item.name)}
              sx={{
                width: 100,
                height: 100,
                borderRadius: '10%',
                objectFit: 'cover',
                mx: 'auto',
                transition: 'all 0.3s ease-in-out',
                transform: selected === item.name ? 'scale(1.05)' : 'scale(1)',
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
                  transform: 'scale(1.05)'
                }
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductsControlPanelsTypes;
