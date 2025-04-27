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

import i18n from '../i18n';

const HeaderBarResponsive = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:1300px)');


  const { t } = useTranslation();

  const navGroups = {
    main: [
      { label: t('accueil'), link: '/' },
      { label: t('news'), link: '/news' },
      { label: t('certifications'), link: '/certifications' },
      { label: t('quote'), link: '/quote' },
    ],
    products: [
      { label: t('products_panels'), link: '/products_panels' },
      { label: t('products_cables'), link: '/products_cables' },
      { label: t('products_labels'), link: '/products_labels' },
      { label: t('products_parts'), link: '/products_parts' },
    ],
    services: [
      { label: t('services_design'), link: '/services_design' },
      { label: t('services_programming'), link: '/services_programming' },
      { label: t('services_assembly'), link: '/services_assembly' },
      { label: t('services_cutout'), link: '/services_cutout' },
    ],
    about: [
      { label: t('about_us_contact'), link: '/contact_us' },
      { label: t('about_us_team'), link: '/our_team' },
      { label: t('about_us_join_us'), link: '/join_us' },
    ],
  };

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const renderNavGroup = (groupName, groupItems) => (
    <FormControl
      variant="standard"
      sx={{
        minWidth: 120,
        ml: 2,
        minHeight: 64, // Ensures the box has enough height to handle text changes
        display: 'flex',
        alignItems: 'center', // Keeps the arrow and text vertically aligned
        justifyContent: 'flex-end', // Fixes the bottom center point
        '&:hover': { color: theme.palette.text.secondary }, // Mouse-over effect
      }}
    >
      <Select
        displayEmpty
        variant="standard"
        disableUnderline
        MenuProps={{ disableScrollLock: true }}
        sx={{
            fontSize: '20px',
            color: 'white',
            minHeight: 60,
            textShadow: `
                    -1px -1px 0 black, /* Top left */
                    1px -1px 0 black, /* Top right */
                    -1px 1px 0 black, /* Bottom left */
                    1px 1px 0 black   /* Bottom right */
                    `,
            '&:hover': { color: theme.palette.text.secondary }, // Mouse-over effect
            '&.Mui-focused': { color: theme.palette.text.secondary }, // When <Select> is focused
        }}
        renderValue={() => t(groupName)}
      >
        {groupItems.map((item) => (
          <MenuItem
            key={item.link}
            component={Link}
            to={item.link}
            sx={{
              '&:hover': { color: theme.palette.text.secondary }, // Mouse-over effect
            }}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <>
      <AppBar position="absolute" elevation={0} sx={{ backgroundColor: 'transparent' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <img
              src={`${process.env.PUBLIC_URL}/electron.svg`}
              alt="Logo Electrotech"
              style={{ width: 72, height: 72, marginRight: 8 }}
            />
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              ELECTROTECH
            </Typography>
          </Box>

          {isMobile ? (
            <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          ) : (
            <>
              {navGroups.main.map((item) => (
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
                    // textShadow: `
                    // -0px -0px 0 black, /* Top left */
                    // 0px -0px 0 black, /* Top right */
                    // -0px 0px 0 black, /* Bottom left */
                    // 0px 0px 0 black   /* Bottom right */
                    // `,
                    '&:hover': { color: theme.palette.text.secondary, backgroundColor: 'transparent' }, // Mouse-over effect
                  }}
                >
                  {item.label}
                </Button>
              ))}
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
              '&:hover': { color: theme.palette.text.secondary, fontWeight: 'bold' }, // Mouse-over effect
            }}
          >
            <Select
              value={i18n.language}
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              variant="standard"
              disableUnderline
              MenuProps={{ disableScrollLock: true }}
              sx={{
                color: 'white',
                '&:hover': { color: theme.palette.text.secondary }, // Mouse-over effect
                '& .MuiSelect-icon': { color: 'white' },
              }}
              renderValue={(value) => {
                const flag = value.startsWith('fr') ? 'fr' : 'us';
                return (
                  <Box sx={{ display: 'flex', alignItems: 'center', fontSize: '20px', }}>
                    <img
                      src={`${process.env.PUBLIC_URL}/flags/${flag}.svg`}
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
