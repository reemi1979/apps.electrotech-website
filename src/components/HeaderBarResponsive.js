import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Select, MenuItem, FormControl } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import i18n from '../i18n';
import { useLocation } from 'react-router-dom';

const HeaderBarResponsive = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:1300px)');
  const location = useLocation();

  const isHome = location.pathname === '/' || location.pathname === '/home';
  const { t } = useTranslation();

  const electrotechTextColor = isHome
    ? theme.palette.text.primary
    : theme.palette.mode === 'dark'
      ? theme.palette.text.primary
      : theme.palette.custom.electrotechBlue;

  const navControlsColors = () => {
    const isDark = theme.palette.mode === 'dark';
  
    return {
      color: isHome
        ? 'white'
        : isDark
          ? 'white'
          : 'black',
  
      textShadow: isHome
        ? `-1px -1px 0 black,
            1px -1px 0 black,
          -1px 1px 0 black,
            1px 1px 0 black`
        : 'none'
    };
  };

      
  const navGroups = {
    main: [
      { label: t('home'), link: '/' },
      { label: t('news'), link: '/news' },
      { label: t('certifications'), link: '/certifications' },
      { label: t('quote'), link: '/quote' },
    ],
    products: [
      { label: t('products_panels'), link: '/products-control-panels' },
      { label: t('products_cables'), link: '/products-cables' },
      { label: t('products_markers'), link: '/products-markers' },
      { label: t('products_lines'), link: '/products-lines' },
    ],
    services: [
      { label: t('services_design'), link: '/services-design' },
      { label: t('services_programming'), link: '/services-programming' },
      { label: t('services_assembly'), link: '/services-assembly' },
      { label: t('services_cutout'), link: '/services-cutout' },
    ],
    about: [
      { label: t('about_us_contact'), link: '/contact-us' },
      { label: t('about_us_team'), link: '/our-team' },
      { label: t('about_us_join_us'), link: '/join-us' },
    ],
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const renderNavGroup = (groupName, groupItems) => {
    const navStyle = navControlsColors(); // ✅ même logique que pour les boutons
  
    return (
      <FormControl
        variant="standard"
        sx={{
          minWidth: 120,
          ml: 2,
          minHeight: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          '&:hover': {
            color: theme.palette.custom.electrotechYellow
          }
        }}
      >

      <Select
        displayEmpty
        variant="standard"
        disableUnderline
        MenuProps={{ disableScrollLock: true }}
        sx={{
          fontSize: '20px',
          minHeight: 60,
          ...navStyle, // ✅ couleur + textShadow
          '&:hover': {
            color: theme.palette.custom.electrotechYellow
          },
          '&.Mui-focused': {
            color: theme.palette.custom.electrotechYellow
          },    
          '& .MuiSelect-icon': {
            color: navStyle.color // ✅ flèche visible en light + dark
          }
        }}
        renderValue={() => t(groupName)}
      >

        {groupItems.map((item) => (
          <MenuItem
            key={item.link}
            component={Link}
            to={item.link}
            sx={{
              '&:hover': { color: theme.palette.custom.electrotechYellow }, // Mouse-over effect
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
  }

  const navStyle = navControlsColors();

  return (
    <>
      <AppBar position="absolute" elevation={0} sx={{ backgroundColor: 'transparent' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img
              src={`${process.env.PUBLIC_URL}/logos/electron.svg`}
              alt="Logo Electrotech"
              style={{ width: 72, height: 72, marginRight: 8 }}
            />
          <Typography
            variant="h5"
            sx={{
              color: electrotechTextColor,
              fontWeight: 'bold'
            }}
          >
            ELECTROTECH
          </Typography>
          </Box>

          {isMobile ? (
            <IconButton
              edge="end"
              onClick={toggleDrawer}
              sx={{
                color: navControlsColors().color, // 🔥 applique la bonne couleur
                '&:hover': {
                  color: theme.palette.custom.electrotechYellow
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <>
            <ThemeToggleButton />
              {navGroups.main.map((item) => {
                const navStyle = navControlsColors(); // ← APPEL ICI

                return (
                  <Button
                    key={item.link}
                    component={Link}
                    to={item.link}
                    color="inherit"
                    sx={{
                      textTransform: 'none',
                      fontSize: '20px',
                      minHeight: 60,
                      transition: 'none',
                      ...navStyle, // ← APPLICATION ICI
                      '&:hover': {
                        color: theme.palette.custom.electrotechYellow,
                        backgroundColor: 'transparent'
                      }
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
              {renderNavGroup('products', navGroups.products)}
              {renderNavGroup('services', navGroups.services)}
              {renderNavGroup('about', navGroups.about)}
            </>
          )}
          
          <FormControl
            variant="standard"
            sx={{
              minWidth: 80,
              ml: 2,
              '&:hover': { color: theme.palette.custom.electrotechYellow, fontWeight: 'bold' }, // Mouse-over effect
            }}
          >
            <Select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              variant="standard"
              disableUnderline
              MenuProps={{ disableScrollLock: true }}
              sx={{
                fontSize: '20px',
                ...navStyle,
                '&:hover': { color: theme.palette.custom.electrotechYellow },
                '& .MuiSelect-icon': {
                  color: navStyle.color
                }
              }}
              renderValue={(value) => {
                const flag = value.startsWith('fr') ? 'fr' : 'us';
                return (
                  <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/logos/flags/${flag}.svg`}
                      alt={flag}
                      width={20}
                      style={{ marginRight: 6 }}
                    />
                    {value.toUpperCase()}
                  </Box>
                );
              }}
            >
              <MenuItem value="fr">Français</MenuItem>
              <MenuItem value="en">English</MenuItem>
            </Select>

          </FormControl>
          
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            {Object.values(navGroups).flat().map((item) => (
              <ListItem key={item.link} disablePadding>
                <ListItemButton component={Link} to={item.link}>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      
    </>
  );
};

export default HeaderBarResponsive;
