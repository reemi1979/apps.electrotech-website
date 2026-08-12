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
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import i18n from '../i18n';

const HeaderBarResponsive = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery('(max-width:900px)');
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const isHome = location.pathname === '/' || location.pathname === '/en';
  const navStyle = {
    color: isHome || theme.palette.mode === 'dark' ? 'white' : 'black',
    textShadow: isHome ? '-1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black' : 'none',
  };
  const navItems = [
    { label: t('track'), link: '/tracking' },
    { label: t('quote'), link: '/quote' },
    { label: t('about_us_contact'), link: '/contact-us' },
    { label: i18n.language === 'fr' ? 'Site principal' : 'Main site', href: 'https://www.electrotech.ca' },
  ];
  const buildPath = (link) => (i18n.language === 'fr' ? link : `/en${link}`);
  const changeLanguage = (language) => {
    const path = location.pathname.replace(/^\/en(?=\/|$)/, '') || '/';
    i18n.changeLanguage(language);
    navigate(language === 'en' ? `/en${path === '/' ? '' : path}` : path);
  };

  const navButtons = navItems.map((item) => (
    <Button key={item.link || item.href} component={item.href ? 'a' : Link} href={item.href} to={item.href ? undefined : buildPath(item.link)} color="inherit" sx={{ textTransform: 'none', fontSize: '20px', minHeight: 60, ...navStyle, '&:hover': { color: theme.palette.custom.electrotechYellow, backgroundColor: 'transparent' } }}>
      {item.label}
    </Button>
  ));

  return <>
    <AppBar position="absolute" elevation={0} sx={{ backgroundColor: 'transparent' }}>
      <Toolbar>
        <Box component={Link} to={i18n.language === 'fr' ? '/' : '/en'} sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img src="/logos/logo.svg" alt="Électrotech Logo" style={{ width: 210, maxWidth: '45vw', height: 'auto' }} />
        </Box>
        {isSmallScreen ? <IconButton edge="end" onClick={() => setDrawerOpen(true)} sx={navStyle}><MenuIcon /></IconButton> : <>
          <ThemeToggleButton />
          {navButtons}
          <FormControl variant="standard" sx={{ minWidth: 80, ml: 2 }}>
            <Select value={i18n.language} onChange={(event) => changeLanguage(event.target.value)} variant="standard" disableUnderline sx={{ fontSize: '20px', ...navStyle, '& .MuiSelect-icon': { color: navStyle.color } }}>
              <MenuItem value="fr">Français</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>
          </FormControl>
        </>}
      </Toolbar>
    </AppBar>
    <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      <Box sx={{ width: 260 }} role="presentation"><List>
        {navItems.map((item) => <ListItem key={item.link || item.href} disablePadding><ListItemButton component={item.href ? 'a' : Link} href={item.href} to={item.href ? undefined : buildPath(item.link)} onClick={() => setDrawerOpen(false)}><ListItemText primary={item.label} /></ListItemButton></ListItem>)}
        <ThemeToggleButton variant="text" />
        <ListItem disablePadding><ListItemButton onClick={() => { changeLanguage('fr'); setDrawerOpen(false); }}><ListItemText primary="FRANÇAIS" /></ListItemButton></ListItem>
        <ListItem disablePadding><ListItemButton onClick={() => { changeLanguage('en'); setDrawerOpen(false); }}><ListItemText primary="ENGLISH" /></ListItemButton></ListItem>
      </List></Box>
    </Drawer>
  </>;
};

export default HeaderBarResponsive;
