// src/pages/Layout.js

import React, { useState } from 'react';
import HeaderBarResponsive from '../components/HeaderBarResponsive';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const Layout = () => {

  const [backgroundEnabled, setBackgroundEnabled] = useState(true);

  const toggleBackground = () => {
    setBackgroundEnabled(prev => !prev);
  };

  return (

    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundImage: backgroundEnabled ? `url(${process.env.PUBLIC_URL}/logos/electron-bg.svg)` : 'none',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <HeaderBarResponsive />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>

      <ScrollToTopButton />

      <Footer 
        toggleBackground={toggleBackground} 
        backgroundEnabled={backgroundEnabled}
      />

    </Box>
  );
};

export default Layout;