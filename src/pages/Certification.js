// src/pages/Certification.js
import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, Container, Fade } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import csaLogo from '../assets/csa_light-gray.svg';
import ceLogo from '../assets/ce_light-gray.svg';
import ulLogo from '../assets/ul_light-gray.svg';
import QualityPhotos from '../components/QualityPhotos';
import { useTheme } from '@mui/material/styles';
import ScrollToNextSectionButton from '../components/ScrollToNextSectionButton';

const MotionBox = motion(Box);

const Certification = () => {

    const theme = useTheme();
    const { t } = useTranslation('quality');
    const availableCerts = ['csa', 'ce'];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    const isDark = theme.palette.mode === 'dark';
    const [selected, setSelected] = useState(null);

    const messages = [
        { src: process.env.PUBLIC_URL + '/photos/certifications/a.jpg', titleKey: 'quality_photos_1_title', descriptionKey: 'quality_photos_1_description' },
        { src: process.env.PUBLIC_URL + '/photos/certifications/b.jpg', titleKey: 'quality_photos_2_title', descriptionKey: 'quality_photos_2_description' },
        { src: process.env.PUBLIC_URL + '/photos/certifications/c.jpg', titleKey: 'quality_photos_3_title', descriptionKey: 'quality_photos_3_description' }
    ];

    const certifications = {
        csa: {
            name: 'c CSA, c CSA us, CSA us',
            organization: t('certification_csa_org'),
            description: t('certification_csa_description'),
            logo: csaLogo,
            trademark: t('certification_csa_trademark')
        },
        ce: {
            name: 'CE',
            organization: t('certification_ce_org'),
            description: t('certification_ce_description'),
            logo: ceLogo,
            trademark: t('certification_ce_trademark')
        },
        ul: {
            name: 'UL',
            organization: t('certification_ul_org'),
            description: t('certification_ul_description'),
            logo: ulLogo,
            trademark: t('certification_ul_trademark')
        }
    };

    const [selectedIndex, setSelectedIndex] = useState(0);
    const intervalRef = useRef(null);
    const timeoutRef = useRef(null);

    const startInterval = () => {
        intervalRef.current = setInterval(() => {
          setSelectedIndex(prev => (prev + 1) % messages.length);
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
        clearInterval(intervalRef.current);
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          startInterval();
        }, 10000);
      };

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % availableCerts.length);
            setFadeIn(true);
            }, 500);
        }, 5000);
        return () => clearInterval(interval);
    }, [availableCerts.length]);

    const currentKey = availableCerts[currentIndex];
    const currentCert = certifications[currentKey];

    return (
    <Container sx={{ py: 8, color: 'white', textAlign: 'center' }}>

        <Box id="section1" sx={{ minHeight: '100vh', position: 'relative', px: 2, py: 10, textAlign: 'center', mx: 'auto', }}>

            <Typography variant="h3" gutterBottom sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                {t('certification_title')}
            </Typography>
            <Typography variant="h6" sx={{ mb: 1, maxWidth: 800, mx: 'auto', color: theme.palette.text.primary }}>
                {t('certification_title_description')}
            </Typography>

            <Fade in={fadeIn} timeout={500}>
                <Box
                    component="img"
                    src={currentCert.logo}
                    alt={`${currentKey.toUpperCase()} Certification Logo`}
                    sx={{
                    width: 150,
                    height: 150,
                    mb: 2,
                    animation: 'pulse 2s ease-in-out infinite',
                    filter: isDark ? 'none' : 'invert(1)',
                    }}
                />
            </Fade>

            <Typography variant="h4" sx={{  mt: 2 , color: theme.palette.text.secondary }}>
                <strong>{currentCert.name}</strong><br />
            </Typography>
            <Typography variant="h6" sx={{ mt: 2 , color: theme.palette.text.primary }}>
                {t('certification_issuing_org')}: {currentCert.organization}<br />
            </Typography>

            <Typography 
                variant="body2" 
                sx={{ 
                    fontStyle: 'italic',
                    fontWeight: 'bold',
                    m: 0 ,
                    color: theme.palette.text.blue
                }}>
                {currentCert.trademark}
            </Typography>

        </Box>

        <Box id="section2" sx={{ minHeight: '100vh', position: 'relative', px: 2, py:2, textAlign: 'center', mx: 'auto', }}>

            <Typography variant="h4" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
                {t('certification_help_title')}
            </Typography>

            <Typography variant="h6" sx={{ mt: 2, maxWidth: 800, mx: 'auto', color: theme.palette.text.primary }}>
                {t('certification_help_text')}
            </Typography>

            <Box component="ul" sx={{ textAlign: 'left', mt: 0, maxWidth: 800, mx: 'auto' }}>
                <QualityPhotos />
            </Box>

        </Box>

        <Box id="section3" sx={{ minHeight: '80vh', position: 'relative', px: 2, py: 10, textAlign: 'center', mx: 'auto', }}>

            <Typography variant="h4" sx={{ color: theme.palette.text.secondary, mt: 1, mb:2 }}>
                {t('certification_why_matter')}
            </Typography>

            <Grid container spacing={4} justifyContent="center" sx={{ mb:2, minHeight: { xs: 400, sm: 'auto' } }}>
                {messages.map((item, index) => (
                    <Grid item xs={6} sm={4} md={3} lg={2} key={index} textAlign="center">
                    <MotionBox
                        component="img"
                        src={item.src}
                        alt={t(item.titleKey)}
                        onClick={() => handleUserAction(index)}
                        onMouseOver={() => handleUserAction(index)}
                        sx={{
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        mx: 'auto',
                        transition: 'all 0.3s ease-in-out',
                            transform: selectedIndex === index ? 'scale(1.05)' : 'scale(1)',
                            boxShadow: selectedIndex === index
                            ? `0 0 15px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.8)'}`
                            : 'none',
                            cursor: 'pointer',
                            '&:hover': { transform: 'scale(1.05)' },
                        }}
                    />
                    </Grid>
                ))}
            </Grid>

            <Box
                sx={{
                height: 'auto',
                minHeight: 200,
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
                {t(messages[selectedIndex].titleKey)}
                </Typography>
                <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
                {t(messages[selectedIndex].descriptionKey)}
                </Typography>
            </Box>

        </Box>

        <ScrollToNextSectionButton sectionIds={['section1', 'section2', 'section3']} />

        <style>
            {`
                @keyframes pulse {
                0% { transform: scale(1) rotate(0deg); opacity: 1; }
                50% { transform: scale(1.1) rotate(5deg); opacity: 0.85; }
                100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
            `}
        </style>

    </Container>

    
    );
};

export default Certification;
