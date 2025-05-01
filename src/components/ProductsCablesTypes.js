// src/components/ProductsCablesTypes.js
import React from 'react';
import { Box, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';

const cableTypes = [
  { src: process.env.PUBLIC_URL + '/photos/products/cables/a.jpg', titleKey: 'product_cables_cables_title', name: 'cables' },
  { src: process.env.PUBLIC_URL + '/photos/products/cables/b.jpg', titleKey: 'product_cables_harness_title', name: 'harness' },
  { src: process.env.PUBLIC_URL + '/photos/products/cables/c.jpg', titleKey: 'product_cables_wires_title', name: 'wires' },
  { src: process.env.PUBLIC_URL + '/photos/products/cables/d.jpg', titleKey: 'product_cables_connectors_title', name: 'connectors' }
];

const MotionBox = motion(Box);

const ProductsCablesTypes = ({ selected, setSelected }) => {

  const { t } = useTranslation('products');
  const theme = useTheme();

  return (
    <Box sx={{ px: 2, py: 6, maxWidth: 1400, mx: 'auto' }}>
      <Grid container spacing={4} justifyContent="center">
        {cableTypes.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index} textAlign="center">
            <MotionBox
              component="img"
              src={item.src}
              alt={t(item.titleKey)}
              onClick={() => setSelected(item.name)}
              sx={{
                width: 100,
                height: 100,
                borderRadius: '50%',
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

export default ProductsCablesTypes;
