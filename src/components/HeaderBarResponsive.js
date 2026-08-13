import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';

const HeaderBarResponsive = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const navStyle = {
    color: 'black',
    textShadow: 'none',
  };

  return <>
    <AppBar position="fixed" elevation={0} sx={{ backgroundColor: 'transparent' }}>
      <Toolbar>
        <Box component="a" href="https://www.electrotech.ca" sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, textDecoration: 'none' }}>
          <img src={`${process.env.PUBLIC_URL}/logos/electron.svg`} alt="Logo Electrotech" style={{ width: 72, height: 72, marginRight: 8 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <Typography variant="h5" sx={{ color: navStyle.color, fontWeight: 'bold', textShadow: navStyle.textShadow }}>
              ELECTROTECH
            </Typography>
            <Typography variant="caption" sx={{ color: navStyle.color, fontSize: '0.7rem', textShadow: navStyle.textShadow }}>
              AUTOMATISATION INDUSTRIELLE INC.
            </Typography>
          </Box>
        </Box>
        {isSmallScreen && <IconButton edge="end" onClick={() => setDrawerOpen(true)} sx={navStyle}><MenuIcon /></IconButton>}
      </Toolbar>
    </AppBar>
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ width: 260 }} role="presentation" />
    </Drawer>
  </>;
};

export default HeaderBarResponsive;
