// src/pages/Products/ProductsLines.js
import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@mui/material/styles';
import BackgroundBanner from '../../components/BackgroundBanner';

const MotionBox = motion(Box);

const manufacturers = [
  { name: 'Rittal', logo: process.env.PUBLIC_URL + '/photos/products/parts/rittal.svg' },
  { name: 'Hammond', logo: process.env.PUBLIC_URL + '/photos/products/parts/hammond.svg' },
  { name: 'Siemens', logo: process.env.PUBLIC_URL + '/photos/products/parts/siemens.svg' },
  { name: 'Allen-Bradley', logo: process.env.PUBLIC_URL + '/photos/products/parts/allenbradley.svg' },
  { name: 'Schneider Electric', logo: process.env.PUBLIC_URL + '/photos/products/parts/schneider.svg' },
  { name: 'Hoffman nVent', logo: process.env.PUBLIC_URL + '/photos/products/parts/hoffman.png' },
  { name: 'Phoenix Contact', logo: process.env.PUBLIC_URL + '/photos/products/parts/phoenix.svg' },
  { name: 'Murr', logo: process.env.PUBLIC_URL + '/photos/products/parts/murr.svg' },
  { name: 'IFM', logo: process.env.PUBLIC_URL + '/photos/products/parts/ifm.svg' },
  { name: 'Festo', logo: process.env.PUBLIC_URL + '/photos/products/parts/festo.svg' },
  { name: 'ABB', logo: process.env.PUBLIC_URL + '/photos/products/parts/abb.svg' },
  { name: 'Omron', logo: process.env.PUBLIC_URL + '/photos/products/parts/omron.svg' },
  { name: 'Weidmuller', logo: process.env.PUBLIC_URL + '/photos/products/parts/weidmuller.svg' },
  { name: 'Ferraz Shawmut', logo: process.env.PUBLIC_URL + '/photos/products/parts/ferraz-shawmut.svg' },
  { name: 'Panduit', logo: process.env.PUBLIC_URL + '/photos/products/parts/panduit.svg' },
  { name: 'Mersen', logo: process.env.PUBLIC_URL + '/photos/products/parts/mersen.svg' },
  { name: 'Turck', logo: process.env.PUBLIC_URL + '/photos/products/parts/turck.svg' },
  { name: 'SEW Eurodrive', logo: process.env.PUBLIC_URL + '/photos/products/parts/sew.svg' },
  { name: 'Banner', logo: process.env.PUBLIC_URL + '/photos/products/parts/banner.svg' },
  { name: 'Harting', logo: process.env.PUBLIC_URL + '/photos/products/parts/harting.svg' },
  { name: 'Wöhner', logo: process.env.PUBLIC_URL + '/photos/products/parts/wohner.svg' },
  { name: 'Icotek', logo: process.env.PUBLIC_URL + '/photos/products/parts/icotek.svg' },
  { name: 'Puls', logo: process.env.PUBLIC_URL + '/photos/products/parts/puls.jpeg' },
  { name: 'Pepperl+Fuchs', logo: process.env.PUBLIC_URL + '/photos/products/parts/pf.svg' }
];

const ProductsLines = () => {
  const { t } = useTranslation('products');
  const theme = useTheme();
  const firstLogoRef = useRef(null);
  const [bannerTop, setBannerTop] = useState(400);

  useEffect(() => {
    const updateBannerPosition = () => {
      if (firstLogoRef.current) {
        const rect = firstLogoRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || window.pageYOffset;
        const topPosition = rect.top + scrollTop;
        setBannerTop(topPosition + 50);
      }
    };
  
    // Run after render + layout
    const raf = requestAnimationFrame(updateBannerPosition);
  
    // Update on resize
    window.addEventListener('resize', updateBannerPosition);
  
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', updateBannerPosition);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (firstLogoRef.current) {
        const rect = firstLogoRef.current.getBoundingClientRect();
        const scrollTop = window.scrollY || window.pageYOffset;
        const topPosition = rect.top + scrollTop;
        setBannerTop(topPosition + 50);
      }
    }, 100); // 100ms delay to allow layout
  
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box sx={{ position: 'relative' }}>
      <BackgroundBanner image="photos/lobby.jpg" height={350} top={bannerTop} />

      <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom sx={{ mt: 6, color: theme.palette.text.secondary }}>
          {t('products_lines_section_title')}
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 800, mx: 'auto' }}>
          {t('products_lines_section_description')}
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mb: 6, color: theme.palette.text.blue }}>
          {t(`brands_warning_min_order`)}
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {manufacturers.map((item, index) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              lg={2}
              key={index}
              textAlign="center"
              ref={index === 0 ? firstLogoRef : null}
            >
              <MotionBox
                component="img"
                src={item.logo}
                alt={item.name}
                title={item.name}
                sx={{
                  width: 100,
                  height: 100,
                  objectFit: 'contain',
                  backgroundColor: theme.palette.background.white,
                  borderRadius: 2,
                  p: 1,
                  mx: 'auto',
                  transition: 'all 0.3s ease-in-out',
                  transform: 'scale(1)',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 0 15px rgba(255,255,255,0.6)',
                  },
                }}
              />
              <Typography variant="subtitle1" sx={{ mt: 1, color: theme.palette.text.primary }}>
                {item.name}
              </Typography>
            </Grid>
          ))}
        </Grid>

        <Typography
          variant="caption"
          sx={{
            mt: 6,
            fontStyle: 'italic',
            fontSize: '1.2rem',
            color: theme.palette.text.blue,
            maxWidth: 800,
            mx: 'auto',
            display: 'block',
            textAlign: 'center',
          }}
        >
          {t('brands_trademark_note')}
        </Typography>
      </Container>
    </Box>
  );
};

export default ProductsLines;
