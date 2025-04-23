// src/components/HeaderBarResponsive.js

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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const { t } = useTranslation();

  const navItems = [
    { label: t('accueil'), link: '/' },
    { label: t('services'), link: '/services' },
    { label: t('projets'), link: '/projets' },
    { label: t('contact'), link: '/contact' },
  ];

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <AppBar position="absolute" elevation={0} sx={{ backgroundColor: 'transparent' }}>
        <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img
            src={process.env.PUBLIC_URL + '/electron.png'}
            alt="Logo Electrotech"
            style={{ width: 48, height: 48, marginRight: 8 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            ELECTROTECH
          </Typography>
        </Box>

          {isMobile ? (
            <IconButton color="inherit" edge="end" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          ) : (
            navItems.map((item) => (
              <Button
                key={item.link}
                component={Link}
                to={item.link}
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                {item.label}
              </Button>
            ))
          )}

        <FormControl variant="standard" sx={{ minWidth: 80, ml: 2 }}>
        <Select
          value={i18n.language}
          onChange={(e) => i18n.changeLanguage(e.target.value)}
          variant="standard"
          disableUnderline
          sx={{
            color: 'white',
            minWidth: 60,
            ml: 2,
            '& .MuiSelect-icon': { color: 'white' },
          }}
          renderValue={(value) => {
            const flag = value.startsWith('fr') ? 'fr' : 'us';
            return (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={process.env.PUBLIC_URL + `/flags/${flag}.svg`}
                  alt={flag}
                  width={20}
                  style={{ marginRight: 6 }}
                />
                {value.toUpperCase()}
              </Box>
            );
          }}          
        >
          <MenuItem value="fr">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={process.env.PUBLIC_URL + '/flags/fr.svg'} alt="FR" width={20} style={{ marginRight: 8 }} />
              Français
            </Box>
          </MenuItem>
          <MenuItem value="en">
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={process.env.PUBLIC_URL + '/flags/us.svg'} alt="EN" width={20} style={{ marginRight: 8 }} />
              English
            </Box>
          </MenuItem>
        </Select>
        </FormControl>

        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
          <List>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item} />
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

