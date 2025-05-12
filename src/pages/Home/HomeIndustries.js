// src/Home/HomeIndustries.js

import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import BackgroundBanner from '../../components/BackgroundBanner';

const industries = [
    { src: process.env.PUBLIC_URL + '/photos/industries/a.jpg', titleKey: 'home_industrie_airport_title', descriptionKey: 'home_industrie_airport_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/b.jpg', titleKey: 'home_industrie_distribution_title', descriptionKey: 'home_industrie_distribution_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/c.jpg', titleKey: 'home_industrie_manufacturing_title', descriptionKey: 'home_industrie_manufacturing_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/d.jpg', titleKey: 'home_industrie_oem_title', descriptionKey: 'home_industrie_oem_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/e.jpg', titleKey: 'home_industrie_foodpharma_title', descriptionKey: 'home_industrie_foodpharma_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/f.jpg', titleKey: 'home_industrie_energy_title', descriptionKey: 'home_industrie_energy_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/g.jpg', titleKey: 'home_industrie_mining_title', descriptionKey: 'home_industrie_mining_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/h.jpg', titleKey: 'home_industrie_engineer_title', descriptionKey: 'home_industrie_engineer_description' },
    { src: process.env.PUBLIC_URL + '/photos/industries/i.jpg', titleKey: 'home_industrie_transport_title', descriptionKey: 'home_industrie_transport_description' }
];

const MotionBox = motion.create(Box);

const HomeIndustries = () => {
    
    const [selectedIndex, setSelectedIndex] = useState(0);
    const theme = useTheme();
    const { t } = useTranslation();
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const startInterval = () => {
        intervalRef.current = setInterval(() => {
            setSelectedIndex(prev => (prev + 1) % industries.length);
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
    
        timeoutRef.current = setTimeout(() => {
            startInterval(); // redémarre après 10s
        }, 10000);
    };

    const selected = industries[selectedIndex];

    return (
    
        <Box sx={{ position: 'relative' }}>
        
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
                        sx={{ mb: 2, color: theme.palette.text.white }}
                    >
                        {t('home_industrie_default_title')}
                    </Typography>

                    <Typography
                        variant="h4"
                        sx={{ maxWidth: 1400, mx: 'auto', color: theme.palette.text.white }}
                    >
                        {t('home_industrie_default_description')}
                    </Typography>

                </Box>

                {/* IMAGES EN CERCLES */}

                    <Grid
                        container
                        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
                        spacing={2}
                        justifyContent="center"
                        sx={{ mb: 2, minHeight: { xs: 400, sm: 'auto' } }}
                    >
                        <BackgroundBanner image="photos/lobby.jpg" height={250} top={0} />

                        {industries.map((item, index) => (
                            <Grid
                            key={`${index}-${item.titleKey}`}
                            gridColumn={{
                                xs: 'span 4', // 12 / 4 = 3 items per row
                                sm: 'span 4',
                                md: 'span 3', // 12 / 3 = 4 items per row
                                lg: 'span 2', // 12 / 2 = 6 items per row
                            }}
                            textAlign="center"
                            >
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
                                borderRadius: '10%',
                                objectFit: 'cover',
                                mx: 'auto',
                                transition: 'all 0.3s ease-in-out',
                                transform: selectedIndex === index ? 'scale(1.05)' : 'scale(1)',
                                boxShadow: selectedIndex === index
                                    ? `0 0 15px ${
                                        theme.palette.mode === 'dark'
                                        ? 'rgba(255,255,255,0.6)'
                                        : 'rgba(0,0,0,0.8)'
                                    }`
                                    : 'none',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                                }}
                            />
                            </Grid>
                        ))}
                    </Grid>


                <Box 
                    sx={{
                    height: 'auto',
                    minHeight: 140,
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

                    <Typography variant="h4" sx={{ mb: 1, color: theme.palette.text.secondary }}>
                        {t(industries[selectedIndex].titleKey)}
                    </Typography>

                    <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                        {t(industries[selectedIndex].descriptionKey)}
                    </Typography>

                </Box>
            </Box>
        </Box>
    );
};

export default HomeIndustries;

