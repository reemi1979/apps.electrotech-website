// src/components/HeaderBarResponsive.js

import React, { useState } from 'react';
import {
    AppBar, Toolbar, Button, IconButton, Drawer,
    List, ListItem, ListItemButton, ListItemText, 
    Typography, Box, Select, MenuItem, FormControl,
    useMediaQuery, Collapse
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggleButton';
import i18n from '../i18n';

const HeaderBarResponsive = () => {

    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isSmallScreen  = useMediaQuery('(max-width:1400px)');
    const location = useLocation();
    const [openProducts, setOpenProducts] = useState(false);
    const [openServices, setOpenServices] = useState(false);
    const isHome = location.pathname === '/' || location.pathname === '/home';
    const { t } = useTranslation();

    const electrotechTextColor = isHome
        ? theme.palette.text.primary
        : theme.palette.mode === 'dark'
        ? theme.palette.text.primary
        : theme.palette.text.blue;

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
            { label: t('quality'), link: '/quality' },
            { label: t('quote'), link: '/quote' },
            { label: t('track'), link: '/tracking' },
        ],
        products: [
            { label: t('products_panels'), link: '/products-control-panels' },
            { label: t('products_cables'), link: '/products-cables' },
            { label: t('products_markers'), link: '/products-markers' },
            { label: t('products_lines'), link: '/products-lines' },
        ],
        services: [
            { label: t('services_assembly'), link: '/services/0' },
            { label: t('services_design'), link: '/services/1' },
            { label: t('services_machine'), link: '/services/2' },
            { label: t('services_programming'), link: '/services/3' },
            { label: t('services_cutout'), link: '/services/4' },
        ],
        about: [
            { label: t('news'), link: '/news' },
            { label: t('achievements'), link: '/achievements' },  
            { label: t('about_us_contact'), link: '/contact-us' },
            { label: t('about_us_team'), link: '/our-team' },
            { label: t('about_us_join_us'), link: '/jobs' },
        ],
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
        if (!drawerOpen) {
        setOpenProducts(false);
        setOpenServices(false);
        }
    };

    const renderCombinedProductsServices = () => {
        const combinedItems = [...navGroups.products, ...navGroups.services];
        return renderNavGroup('products_and_services', combinedItems);
    };
      
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

            <Box 
                component={Link}
                to="/"
                sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, textDecoration: 'none' }}
                >
                <img
                    src={`${process.env.PUBLIC_URL}/logos/electron.svg`}
                    alt="Logo Electrotech"
                    style={{ width: 72, height: 72, marginRight: 8 }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                    <Typography variant="h5" sx={{ color: electrotechTextColor, fontWeight: 'bold' }}>
                    ELECTROTECH
                    </Typography>
                    <Typography variant="caption" sx={{ color: electrotechTextColor, fontSize: '0.7rem' }}>
                    AUTOMATISATION INDUSTRIELLE INC.
                    </Typography>
                </Box>
                </Box>


            {isSmallScreen  ? (

                <IconButton
                    edge="end"
                    onClick={toggleDrawer}
                    sx={{ color: navControlsColors().color, '&:hover': { color: theme.palette.custom.electrotechYellow } }}
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
                

                {renderCombinedProductsServices()}
                {renderNavGroup('about', navGroups.about)}

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

                </>
            )}
            
            </Toolbar>
        </AppBar>

        <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
            <Box sx={{ width: 250 }} role="presentation" >
            <List>

                {/* MAIN - Always visible */}
                {navGroups.main.map((item) => (
                <ListItem key={item.link} disablePadding>
                    <ListItemButton component={Link} to={item.link} onClick={toggleDrawer}>
                    <ListItemText primary={item.label} />
                    </ListItemButton>
                </ListItem>
                ))}

                {/* PRODUCTS - Collapsible */}
                <ListItemButton onClick={() => setOpenProducts(!openProducts)}>
                <ListItemText primary={t('products')} />
                {openProducts ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openProducts} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {navGroups.products.map((item) => (
                    <ListItem key={item.link} disablePadding sx={{ pl: 4 }}>
                        <ListItemButton component={Link} to={item.link} onClick={toggleDrawer}>
                        <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
                </Collapse>

                {/* SERVICES - Collapsible */}
                <ListItemButton onClick={() => setOpenServices(!openServices)}>
                <ListItemText primary={t('services')} />
                {openServices ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openServices} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {navGroups.services.map((item) => (
                    <ListItem key={item.link} disablePadding sx={{ pl: 4 }}>
                        <ListItemButton component={Link} to={item.link} onClick={toggleDrawer}>
                        <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                    ))}
                </List>
                </Collapse>

                {/* ABOUT - Always visible */}
                {navGroups.about.map((item) => (
                <ListItem key={item.link} disablePadding>
                    <ListItemButton component={Link} to={item.link} onClick={toggleDrawer}>
                    <ListItemText primary={item.label} />
                    </ListItemButton>
                </ListItem>
                ))}

                {/* Dark mode toggle */}
                <ThemeToggleButton variant="text"/>

                {/* Languages */}
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                        i18n.changeLanguage('fr');
                        toggleDrawer();
                        }}
                        component="button"
                    >
                        <ListItemText primary="FRANÇAIS" />
                        <img
                        src={`${process.env.PUBLIC_URL}/logos/flags/fr.svg`}
                        alt="Français"
                        width={24}
                        style={{ marginLeft: 8 }}
                        />
                    </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                        i18n.changeLanguage('en');
                        toggleDrawer();
                        }}
                        component="button"
                    >
                        <ListItemText primary="ENGLISH" />
                        <img
                        src={`${process.env.PUBLIC_URL}/logos/flags/us.svg`}
                        alt="English"
                        width={24}
                        style={{ marginLeft: 8 }}
                        />
                    </ListItemButton>

                </ListItem>

            </List>
            </Box>
        </Drawer>

        </>
    );
};

export default HeaderBarResponsive;
