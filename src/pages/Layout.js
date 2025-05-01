// src/pages/Layout.js

import React, { useState } from 'react';
import HeaderBarResponsive from '../components/HeaderBarResponsive';
import Footer from '../components/Footer';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Layout = () => {

  const [backgroundEnabled, setBackgroundEnabled] = useState(true);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const toggleBackground = () => {
    setBackgroundEnabled(prev => !prev);
  };

  return (
<Box
  sx={{
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    overflow: 'hidden', // important pour que le ::before reste contenu
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: backgroundEnabled
        ? isDark
          ? `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${process.env.PUBLIC_URL}/logos/electron-bg.svg)`
          : `url(${process.env.PUBLIC_URL}/logos/electron-bg-white.svg)`
        : 'none',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      animation: backgroundEnabled ? 'fadeBg 25s infinite' : 'none',
      zIndex: 0,
      pointerEvents: 'none',
    },
    '@keyframes fadeBg': {
      '0%': { opacity: 0 },
      '10%': { opacity: 1 },
      '15%': { opacity: 1 },
      '20%': { opacity: 0 },
      '100%': { opacity: 0 },
    },
  }}
>
  <Box sx={{ position: 'relative', zIndex: 1 }}>
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
</Box>
    // <Box
    //   sx={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     minHeight: '100vh',
    //     backgroundImage: backgroundEnabled
    //     ? isDark
    //       ? `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${process.env.PUBLIC_URL}/logos/electron-bg.svg)`
    //       : `url(${process.env.PUBLIC_URL}/logos/electron-bg-white.svg)`
    //     : 'none',      
    //     backgroundRepeat: 'no-repeat',
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //     backgroundAttachment: 'fixed',
    //   }}
    // >
    //   <HeaderBarResponsive />
    //   <Box sx={{ flex: 1 }}>
    //     <Outlet />
    //   </Box>

    //   <ScrollToTopButton />

    //   <Footer 
    //     toggleBackground={toggleBackground} 
    //     backgroundEnabled={backgroundEnabled}
    //   />

    // </Box>
  );
};

export default Layout;


// backgroundImage: backgroundEnabled
// ? isDark
//   ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${process.env.PUBLIC_URL}/logos/electron-bg.svg)`
//   : `url(${process.env.PUBLIC_URL}/logos/electron-bg.svg)`
// : 'none',

