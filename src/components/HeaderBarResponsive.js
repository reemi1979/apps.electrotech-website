import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const HeaderBarResponsive = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const { t } = useTranslation();
  const navStyle = {
    color: 'black',
    textShadow: 'none',
  };
  const navItems = [
    { label: t('track'), link: '/tracking' },
  ];
  const buildPath = (link) => `/en${link}`;

  const navButtons = navItems.map((item) => (
    <Button key={item.link || item.href} component={item.href ? 'a' : Link} href={item.href} to={item.href ? undefined : buildPath(item.link)} color="inherit" sx={{ textTransform: 'none', fontSize: '20px', minHeight: 60, ...navStyle, '&:hover': { color: theme.palette.custom.electrotechYellow, backgroundColor: 'transparent' } }}>
      {item.label}
    </Button>
  ));

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
        {isSmallScreen ? <IconButton edge="end" onClick={() => setDrawerOpen(true)} sx={navStyle}><MenuIcon /></IconButton> : <>
          {navButtons}
        </>}
      </Toolbar>
    </AppBar>
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ width: 260 }} role="presentation"><List>
        {navItems.map((item) => <ListItem key={item.link || item.href} disablePadding><ListItemButton component={item.href ? 'a' : Link} href={item.href} to={item.href ? undefined : buildPath(item.link)} onClick={() => setDrawerOpen(false)}><ListItemText primary={item.label} /></ListItemButton></ListItem>)}
      </List></Box>
    </Drawer>
  </>;
};

export default HeaderBarResponsive;
