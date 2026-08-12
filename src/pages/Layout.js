import { useState } from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import HeaderBarResponsive from '../components/HeaderBarResponsive';
import LanguageSync from '../components/LanguageSync';

const Layout = () => {
  const [langReady, setLangReady] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        '&::before': {
          content: '""', position: 'absolute', inset: 0,
          backgroundImage: isDark
            ? `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${process.env.PUBLIC_URL}/logos/electron-bg.svg)`
            : `url(${process.env.PUBLIC_URL}/logos/electron-bg-white.svg)`,
          backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center',
          backgroundAttachment: 'fixed', zIndex: 0, pointerEvents: 'none',
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
