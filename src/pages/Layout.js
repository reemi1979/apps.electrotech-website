import { useState } from 'react';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import HeaderBarResponsive from '../components/HeaderBarResponsive';
import LanguageSync from '../components/LanguageSync';

const Layout = () => {
  const [langReady, setLangReady] = useState(false);

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        '&::before': {
          content: '""', position: 'absolute', inset: 0,
          backgroundImage: `url(${process.env.PUBLIC_URL}/logos/electron-bg-white.svg)`,
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
          backgroundAttachment: 'scroll', opacity: 0.38, zIndex: 0, pointerEvents: 'none',
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <LanguageSync onReady={() => setLangReady(true)} />
        {langReady && <><HeaderBarResponsive /><Outlet /></>}
      </Box>
    </Box>
  );
};

export default Layout;
