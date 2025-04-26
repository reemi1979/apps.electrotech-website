// src/pages/Layout.js

import React from 'react';
import HeaderBarResponsive from '../components/HeaderBarResponsive';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <HeaderBarResponsive />
      <Box sx={{ flex: 1 }}>
        <Outlet />
      </Box>

      <ScrollToTopButton />

      <Footer />
    </Box>
  );
};

export default Layout;