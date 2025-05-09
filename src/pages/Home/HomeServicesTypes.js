// src/pages/Services/ServicesTypes.js

import React, { useEffect, useRef } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import BackgroundBanner from '../../components/BackgroundBanner';

const services = [
{ src: process.env.PUBLIC_URL + '/photos/services/a.jpg', titleKey: 'home_service_assy_title', descriptionKey: 'home_service_assy_description' },
{ src: process.env.PUBLIC_URL + '/photos/services/b.jpg', titleKey: 'home_service_design_title', descriptionKey: 'home_service_design_description' },
{ src: process.env.PUBLIC_URL + '/photos/services/c.jpg', titleKey: 'home_service_machine_title', descriptionKey: 'home_service_machine_description' },
{ src: process.env.PUBLIC_URL + '/photos/services/d.jpg', titleKey: 'home_service_prog_title', descriptionKey: 'home_service_prog_description' },
{ src: process.env.PUBLIC_URL + '/photos/services/e.jpg', titleKey: 'home_service_cnc_title', descriptionKey: 'home_service_cnc_description' },
];

const MotionBox = motion(Box);
const selectedTypeMap = ['assy', 'design', 'machine', 'prog', 'cnc'];

const HomeServicesTypes = ({ selectedIndex, setSelectedIndex, setSelected }) => {
    
    const theme = useTheme();
    const { t } = useTranslation();
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const startInterval = () => {
        intervalRef.current = setInterval(() => {
            setSelectedIndex(prev => {
                const newIndex = (prev + 1) % services.length;
                setSelected(selectedTypeMap[newIndex]); // ✅ Update selected type for photos
                return newIndex;
            });
        }, 2000);
    };

    useEffect(() => {
        startInterval();
        return () => {
            clearInterval(intervalRef.current);
            clearTimeout(timeoutRef.current);
        };
    }, []);
    
    const handleUserAction = (index) => {
        setSelectedIndex(index);
        clearInterval(intervalRef.current); // stop auto-switch
        clearTimeout(timeoutRef.current);   // clear timeout si déjà lancé
        setSelected(selectedTypeMap[index]);

        timeoutRef.current = setTimeout(() => {
            startInterval(); // redémarre après 10s
        }, 10000);
    };

    const selected = services[selectedIndex];

    return (

        <Box sx={{ position: 'relative' }}>
              
            <BackgroundBanner image="photos/yellow.jpg" height={300} top={150} />
        
            <Box sx={{ px: 2, maxWidth: 1400, mx: 'auto' }}>
            
                {/* TITRE FIXE EN HAUT */}
                <Box
                    sx={{
                    textAlign: 'center',
                    mb: 6,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    }}
                >
                    <Typography
                    variant="h3"
                    sx={{ mb: 2, color: theme.palette.text.secondary }}
                    >
                    {t('home_service_default_title')}
                    </Typography>
                    <Typography
                    variant="h4"
                    sx={{ maxWidth: 1400, mx: 'auto', color: theme.palette.text.blue }}
                    >
                    {t('home_service_default_description')}
                    </Typography>
                </Box>

                {/* IMAGES EN CERCLES */}
                <Grid container spacing={2} justifyContent="center" sx={{ mb:2, minHeight: { xs: 270, sm: 'auto' } }}>
                    {services.map((item, index) => (
                    <Grid item xs={4} sm={4} md={3} lg={2} key={index} textAlign="center">
                        <MotionBox
                        component="img"
                        src={item.src}
                        alt={t(item.titleKey)}
                        onClick={() => handleUserAction(index)}
                        onMouseOver={() => handleUserAction(index)}
                        sx={{
                            willChange: 'transform',
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            mx: 'auto',
                            transition: 'all 0.3s ease-in-out',
                            transform: selected === item ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: selectedIndex === index
                                ? `0 0 15px ${
                                    theme.palette.mode === 'dark'
                                        ? 'rgba(255,255,255,0.6)'
                                        : 'rgba(0,0,0,0.8)'
                                    }`
                                : 'none',
                                '&:hover': {
                                transform: 'scale(1.05)', // juste le scale
                            },

                        }}
                        />
                    </Grid>
                    ))}
                </Grid>


                <Box
                    sx={{
                    height: 'auto',
                    minHeight: 160, 
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    px: 3,
                    py: 2,
                    mx: 'auto',
                    maxWidth: 600,
                    border: `2px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'}`,
                    borderRadius: 4,
                    boxShadow: theme.palette.mode === 'dark'
                        ? '0 4px 20px rgba(0,0,0,0.7)'
                        : '0 4px 20px rgba(0,0,0,0.1)',
                    background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))'
                        : 'linear-gradient(180deg, rgba(0,0,0,0.03), rgba(0,0,0,0.01))',
                    }}
                >
                    {selected && (
                    <>
                        <Typography variant="h4" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                        {t(selected.titleKey)}
                        </Typography>
                        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                        {t(selected.descriptionKey)}
                        </Typography>
                    </>
                    )}
                </Box>

            </Box>

        </Box>
    );
};

export default HomeServicesTypes;

